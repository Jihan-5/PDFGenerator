import os
import faiss
import pickle
import argparse
import logging
import warnings
import re
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Suppress transformers warnings
warnings.filterwarnings("ignore", category=UserWarning, module="transformers")

# Set environment variables for optimization
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

logger.info("Loading Nomic model...")
hf_token = os.getenv("HF_TOKEN")
if not hf_token:
    logger.warning("HF_TOKEN not set. Attempting to use cached credentials.")
model = SentenceTransformer(
    "nomic-ai/nomic-embed-text-v1.5",
    trust_remote_code=True,
    device="cpu",
    token=hf_token
)
logger.info("Model loaded. Loading FAISS index...")
index = faiss.read_index("rag.index")
with open("rag.meta", "rb") as f:
    meta = pickle.load(f)

# Get table names for matching
table_names = {m["name"].lower(): m["name"] for m in meta if m["type"] == "table"}

def top_k(query: str, k: int = 5, type_filter: str = None):
    q_vec = model.encode([query], batch_size=1, normalize_embeddings=True, show_progress_bar=False)
    logger.debug(f"Query vector shape: {q_vec.shape}")
    distances, indices = index.search(q_vec, k)
    hits = [{"doc": meta[idx], "score": float(dist)} for dist, idx in zip(distances[0], indices[0]) if idx != -1]
    if type_filter:
        hits = [h for h in hits if h["doc"]["type"] == type_filter][:k]
    return hits

def truncate_to_lines(text: str, max_lines: int) -> str:
    lines = text.split("\n")
    return "\n".join(lines[:max_lines]).strip()

def search(query: str, k: int = 5, type_filter: str = None):
    original_query = query
    # Normalize query for table name matching
    normalized_query = re.sub(r"\s+", "_", query.lower().strip())

    # Handle table name queries directly from metadata unless type_filter is field
    if not type_filter and normalized_query in table_names:
        logger.info(f"Fetching metadata for table: {table_names[normalized_query]}")
        table_name = table_names[normalized_query]
        table_meta = next((m for m in meta if m["type"] == "table" and m["name"] == table_name), None)
        if table_meta:
            print(f"\n→ {table_meta['name']} (TABLE)")
            desc = table_meta.get("description", "No description available")
            print("  Description:", truncate_to_lines(desc, 2))
            if table_meta.get("purpose"):
                print("  Purpose:")
                for bullet in table_meta["purpose"]:
                    print("   •", bullet)
            if table_meta.get("fields"):
                print("  Fields:", ", ".join(table_meta["fields"][:6]), "…")
            return
        else:
            print(f"No metadata found for table: {original_query}")
            return

    # Handle field searches or forced type filters
    if type_filter == "field":
        query = f"FIELD: {query}"
    elif type_filter == "table":
        query = f"TABLE: {query}"

    logger.info(f"Searching for: {query}")
    hits = top_k(query, k, type_filter)
    if not hits:
        print(f"No results found for: {original_query}")
        return

    for hit in hits:
        info = hit["doc"]
        score = hit["score"]
        logger.info(f"Hit: {info['name']} ({info['type']}, score={score:.2f})")
        print(f"\n→ {info['name']} ({info['type'].upper()})   (score={score:.2f})")
        if info["type"] == "table":
            desc = info.get("description", "No description available")
            print("  Description:", truncate_to_lines(desc, 2))
            if info.get("purpose"):
                print("  Purpose:")
                for bullet in info["purpose"]:
                    print("   •", bullet)
            if info.get("fields"):
                print("  Fields:", ", ".join(info["fields"][:6]), "…")
        else:  # field
            print("  Field:", info["field_name"])
            print("  Type:", info.get("field_type", "Unknown"))
            print("  Definition:", info.get("description", "No description available"))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", "-q", type=str, required=True, help="Query string")
    parser.add_argument("--k", "-k", type=int, default=5, help="Number of results to return")
    parser.add_argument("--type", choices=["table", "field"], help="Filter by type (table or field)")
    args = parser.parse_args()
    search(args.query, args.k, args.type)