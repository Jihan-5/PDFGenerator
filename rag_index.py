import os
import pickle
import numpy as np
import logging
from sentence_transformers import SentenceTransformer
from uuid import uuid4

# Optionally load from .env if you want (uncomment below if using a .env file)
# from dotenv import load_dotenv
# load_dotenv()

os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

logger.info("Loading Nomic model...")
model = SentenceTransformer("nomic-ai/nomic-embed-text-v1.5", trust_remote_code=True, device="cpu")
logger.info("Nomic model loaded")

# --- Pinecone Secure Setup ---
from pinecone import Pinecone, ServerlessSpec

api_key = os.environ.get("PINECONE_API_KEY")
if not api_key:
    raise ValueError("PINECONE_API_KEY not set in environment! Set it in your terminal or .env file.")

logger.info("Initializing Pinecone...")
pc = Pinecone(api_key="pcsk_42A368_TQFCoBDdBpwZJbAKMty3zQxGCDkyrTkFVq1FHurHyt7cG3DVpygKRjmm9roQDJ")

index_name = "rag-index"
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=768,  # for nomic-ai/nomic-embed-text-v1.5
        metric='cosine',
        spec=ServerlessSpec(cloud='aws', region='us-east-1')
    )

index = pc.Index(index_name)
logger.info("Pinecone initialized")

def embed_batch(texts: list[str], batch_size: int = 32) -> list[list[float]]:
    try:
        logger.info(f"Embedding {len(texts)} texts in batches...")
        embeddings = model.encode(texts, batch_size=batch_size, normalize_embeddings=True, show_progress_bar=False)
        return embeddings.tolist()
    except Exception as e:
        logger.error(f"Error embedding texts: {e}")
        raise

def batch_upsert(index, vectors, batch_size=200):  # <<-- BATCH SIZE SET TO 20
    for i in range(0, len(vectors), batch_size):
        batch = vectors[i:i+batch_size]
        index.upsert(vectors=batch)

def build_index(sections: list[dict], meta="rag.meta"):
    logger.info(f"Processing {len(sections)} sections")
    docs, meta_out, vectors = [], [], []

    for s in sections:
        purpose_lines = s.get("purpose", [])
        purpose_text = "\n".join(f"- {p}" for p in purpose_lines)
        table_doc = (
            f"TABLE: {s['name']} · {s.get('description', '')[:160]}\n"
            f"PURPOSE:\n{purpose_text}\n"
            f"FIELDS: {', '.join(f['field_name'] for f in s.get('key_fields', []))}"
        )
        docs.append(table_doc)
        meta_out.append({
            "name": s["name"],
            "description": s.get("description", ""),
            "purpose": purpose_lines,
            "fields": [f['field_name'] for f in s.get('key_fields', [])],
            "primary_key": s.get('key_fields', [{}])[0].get("field_name", "<pk>"),
            "doc": table_doc,
            "type": "table"
        })

        for field in s.get("key_fields", []):
            field_doc = (
                f"TABLE: {s['name']} FIELD: {field['field_name']}\n"
                f"TYPE: {field.get('field_type', '')}\n"
                f"DESCRIPTION: {field.get('description', '')}\n"
                f"CONTEXT: Part of {s['name']} table, {s.get('description', '')[:100]}"
            )
            docs.append(field_doc)
            meta_out.append({
                "name": s["name"],
                "field_name": field["field_name"],
                "field_type": field.get("field_type", ""),
                "description": field.get("description", ""),
                "doc": field_doc,
                "type": "field"
            })

    logger.info(f"Generated {len(docs)} documents for embedding (tables: {len(sections)}, fields: {len(docs) - len(sections)})")
    vecs = embed_batch(docs)
    logger.info(f"Generated {len(vecs)} embeddings with dimension {len(vecs[0])}")

    try:
        # Prepare vectors for Pinecone upsert
        vectors = [
            {
                "id": str(uuid4()),
                "values": vec,
                "metadata": meta_item
            }
            for vec, meta_item in zip(vecs, meta_out)
        ]
        batch_upsert(index, vectors, batch_size=200)   # <<-- USE BATCHING!
    except Exception as e:
        logger.error(f"Error upserting to Pinecone: {e}")
        raise

    with open(meta, "wb") as f:
        pickle.dump(meta_out, f)

    logger.info(f"✅ Indexed {len(meta_out)} items (tables: {len(sections)}, fields: {len(meta_out) - len(sections)}) → Pinecone index: {index_name}, {meta}")

if __name__ == "__main__":
    import argparse
    import pathlib
    import sys
    from docs_to_sections import parse_docx

    p = argparse.ArgumentParser()
    p.add_argument("--docx", help="DOCX summary to extract sections from", required=True)
    args = p.parse_args()

    docx_path = pathlib.Path(args.docx)
    if not docx_path.exists():
        sys.exit(f"❌ DOCX not found: {docx_path}")
    sections = parse_docx(docx_path)
    build_index(sections)
