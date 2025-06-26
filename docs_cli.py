import argparse
from transformers import pipeline
from rag_search import top_k, table_names, meta

# Choose a deepset QA model (tinyroberta is super light, roberta-base is more accurate)
QA_MODEL = "deepset/tinyroberta-squad2"
qa_pipeline = pipeline("question-answering", model=QA_MODEL)

def retrieve_context(query: str, k: int = 5, type_filter: str = None) -> str:
    normalized_query = query.lower().strip().replace(" ", "_")
    if not type_filter and normalized_query in table_names:
        table_name = table_names[normalized_query]
        table_meta = next((m for m in meta if m["type"] == "table" and m["name"] == table_name), None)
        if table_meta:
            fields = ', '.join(table_meta.get('fields', [])[:6])
            return f"Table: {table_meta['name']}\nDescription: {table_meta.get('description', 'No description')}\nFields: {fields}"
        return ""
    search_query = query
    if type_filter == "field":
        search_query = f"FIELD: {query}"
    elif type_filter == "table":
        search_query = f"TABLE: {query}"
    hits = top_k(search_query, k, type_filter)
    context = []
    for hit in hits:
        doc = hit["doc"]
        if doc["type"] == "field":
            context.append(f"{doc['field_name']} (table: {doc['name']}): {doc.get('description', 'No description')}")
        else:
            context.append(f"Table {doc['name']}: {doc.get('description', 'No description')}")
    return '\n'.join(context)

def main():
    parser = argparse.ArgumentParser(description="Extractive QA CLI for dataset")
    parser.add_argument("--query", "-q", type=str, help="Your question (e.g. 'company_master')")
    parser.add_argument("--k", "-k", type=int, default=5, help="Top-k retrieval")
    parser.add_argument("--type", choices=["table", "field"], help="Search type")
    args = parser.parse_args()

    while True:
        query = args.query or input("\nQuery (blank to quit): ").strip()
        if not query:
            break

        context = retrieve_context(query, args.k, args.type)
        if not context:
            print(f"No relevant context found for: {query}")
        else:
            print(f"Context:\n{context}\n")
            answer = qa_pipeline(question=query, context=context)
            print("Answer:", answer["answer"])
        if args.query:
            break

if __name__ == "__main__":
    main()
