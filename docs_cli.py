import argparse
import json
from transformers import pipeline
from rag_search import top_k, table_names, meta

GEN_MODEL = "google/gemma-2b-it"
gen_pipeline = pipeline("text-generation", model=GEN_MODEL)


def normalize(text):
    return text.lower().replace("-", "_").replace(" ", "_").strip()


def determine_k(query: str, max_k: int = 5, min_k: int = 1) -> int:
    """
    Dynamically determine the number of search results (k) based on the query.
    Args:
        query: The user query.
        max_k: Maximum number of results to retrieve.
        min_k: Minimum number of results to retrieve.
    Returns:
        An integer k representing the number of search results to retrieve.
    """
    normalized_query = normalize(query)

    # Check if query matches a field or table name exactly
    field_like = any(
        normalized_query == normalize(field)
        for m in meta if "fields" in m
        for field in m.get("fields", [])
    )
    table_like = normalized_query in [normalize(t) for t in table_names]

    if field_like or table_like:
        return min_k  # Small k for precise queries

    # Check if it's a field lookup query (e.g., "which tables contain the field net profit")
    if is_field_lookup_query(query):
        return min_k * 2  # Slightly larger k to ensure relevant fields are captured

    # For natural language or broad queries, estimate k based on query complexity
    query_words = len(query.split())
    base_k = 20  # Default for general queries
    k = base_k + (query_words * 5)  # Scale k with query length
    return max(min_k, min(k, max_k))


def retrieve_context(query: str, type_filter: str = None) -> dict:
    """
    Smart context retrieval:
      - For queries asking for all fields of a table (e.g., 'fields under company_master'), returns all fields for that table.
      - For specific field/table queries (e.g., 'fincode'), returns ALL matching tables/fields.
      - For broad queries (e.g., 'stock price'), dynamically determines k based on query.
      - Groups by table and deduplicates.
    """
    normalized_query = normalize(query)
    context_by_table = {}

    # Check if query asks for all fields of a specific table (e.g., "fields under company_master")
    specific_table_query = any(
        phrase in query.lower() for phrase in ["fields under", "fields in", "fields of", "all fields"]
    ) and any(normalize(t) in normalized_query for t in table_names)

    if specific_table_query:
        # Extract the target table from the query
        target_table = next((t for t in table_names if normalize(t) in normalized_query), None)
        if target_table:
            for m in meta:
                if m["name"] == target_table and "fields" in m:
                    context_by_table.setdefault(target_table, [])
                    for field in m.get("fields", []):
                        # Find the detailed description for this field
                        for sub in meta:
                            if sub["type"] == "field" and sub["field_name"] == field and sub["name"] == target_table:
                                entry = f"{field}: {sub.get('description', 'No description')}"
                                if entry not in context_by_table[target_table]:
                                    context_by_table[target_table].append(entry)
                    # Add table description
                    entry = f"Table Description: {m.get('description', 'No description')}"
                    if entry not in context_by_table[target_table]:
                        context_by_table[target_table].append(entry)
    else:
        # Check if the query is a direct field or table name
        field_like = any(
            normalized_query == normalize(field)
            for m in meta if "fields" in m
            for field in m.get("fields", [])
        )
        table_like = normalized_query in [normalize(t) for t in table_names]

        if field_like or table_like:
            # Return all relevant entries for exact matches
            for m in meta:
                table = m["name"]
                context_by_table.setdefault(table, [])
                if "fields" in m:
                    for field in m["fields"]:
                        if normalized_query == normalize(field):
                            for sub in meta:
                                if sub["type"] == "field" and normalize(sub["field_name"]) == normalized_query and sub[
                                    "name"] == table:
                                    entry = f"{field}: {sub.get('description', 'No description')}"
                                    if entry not in context_by_table[table]:
                                        context_by_table[table].append(entry)
                if normalized_query == normalize(m["name"]):
                    entry = f"Table Description: {m.get('description', 'No description')}"
                    if entry not in context_by_table[table]:
                        context_by_table[table].append(entry)
        else:
            # General question: dynamically determine k
            search_k = determine_k(query)
            hits = top_k(query, search_k, type_filter)
            seen = set()
            for hit in hits:
                doc = hit["doc"]
                table = doc.get("name", "Unknown")
                context_by_table.setdefault(table, [])
                if doc["type"] == "field":
                    entry = f"{doc['field_name']}: {doc.get('description', 'No description')}"
                else:
                    entry = f"Table Description: {doc.get('description', 'No description')}"
                if entry not in seen:
                    context_by_table[table].append(entry)
                    seen.add(entry)

    # Remove tables with no content
    context_by_table = {k: v for k, v in context_by_table.items() if v}
    return context_by_table


def extract_exact_field_tables(context, target_field):
    """
    Return a list of tables from context that have an EXACT field match to target_field.
    """
    normalized_target = normalize(target_field)
    tables_with_field = []
    for tbl, fields in context.items():
        for f in fields:
            field_name = f.split(":")[0].strip()
            if normalize(field_name) == normalized_target:
                tables_with_field.append(tbl)
    return list(set(tables_with_field))


def is_field_lookup_query(query):
    # Checks if the query is asking which table/tables contain a field
    triggers = [
        "what table contains the field",
        "which table contains the field",
        "which tables contain the field",
        "what tables contain the field"
    ]
    query_l = query.lower()
    return any(t in query_l for t in triggers)


def extract_field_from_query(query):
    # Extract the field name after 'field'
    parts = query.lower().split("field")
    if len(parts) < 2:
        return None
    field = parts[-1]
    for ch in ['"', "'", "?", ".", ","]:
        field = field.replace(ch, "")
    return field.strip()


def main():
    parser = argparse.ArgumentParser(description="Smart QA CLI for dataset")
    parser.add_argument("--query", "-q", type=str, help="Your question (e.g. 'company_master')")
    parser.add_argument("--type", choices=["table", "field"], help="Search type")
    args = parser.parse_args()

    while True:
        query = args.query or input("\nQuery (blank to quit): ").strip()
        if not query:
            break

        context = retrieve_context(query, args.type)
        if not context:
            result = {
                "query": query,
                "context": {},
                "answer": None,
                "status": "No results found"
            }
            print(json.dumps(result, indent=2))
            if args.query:
                break
            continue

        answer = None
        # Check if query asks for all fields of a specific table
        specific_table_query = any(
            phrase in query.lower() for phrase in ["fields under", "fields in", "fields of", "all fields"]
        ) and any(normalize(t) in normalize(query) for t in table_names)

        if specific_table_query:
            target_table = next((t for t in table_names if normalize(t) in normalize(query)), None)
            if target_table and target_table in context:
                # Extract only field names (exclude non-field entries)
                fields = [
                    f.split(":")[0].strip() for f in context[target_table]
                    if ":" in f and not f.startswith("Table Description")
                ]
                if fields:
                    answer = f"The following are all the fields under the {target_table} dataset:\n\n" + "\n".join(
                        f"- {f}" for f in sorted(fields))
                    # Warn if field count is less than expected for company_master
                    if target_table == "company_master" and len(fields) < 30:
                        answer += f"\n\nWarning: Only {len(fields)} fields found; expected 30. Some fields may be missing from the metadata."
                else:
                    answer = f"No fields found for {target_table}."
            else:
                answer = f"No data found for table {target_table}."
        elif is_field_lookup_query(query):
            target_field = extract_field_from_query(query)
            if target_field:
                tables = extract_exact_field_tables(context, target_field)
                if tables:
                    answer = f"The following tables contain the field '{target_field}': " + ", ".join(
                        sorted(set(tables)))
                else:
                    answer = f"No table contains the field '{target_field}' exactly as named. Try rephrasing or checking related fields."
        else:
            # Fall back to LLM for other queries
            context_str = ""
            for tbl, fields in context.items():
                context_str += f"\n{tbl}:\n" + "\n".join(f"- {f}" for f in fields)
            prompt = f"Context:\n{context_str}\n\nQuestion: {query}\nAnswer:"
            generated = gen_pipeline(prompt, max_new_tokens=128)[0]["generated_text"]
            answer = generated[len(prompt):].strip()

        result = {
            "query": query,
            "context": context,
            "answer": answer,
            "status": "Success"
        }
        print(json.dumps(result, indent=2))
        if args.query:
            break


if __name__ == "__main__":
    main()