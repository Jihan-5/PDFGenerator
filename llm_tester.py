# -*- coding: utf-8 -*-
# Step 1: Imports
import os
import getpass
import json

import openai
from neo4j import GraphDatabase

# Step 2: Load your text
text = """Sarah is an employee at prismaticAI, a leading technology company based in Westside Valley. ..."""

# Step 3: Simple text-chunking (200 chars, 20-char overlap)
def chunk_text(text, size=200, overlap=20):
    chunks, start = [], 0
    while start < len(text):
        end = min(len(text), start + size)
        chunks.append(text[start:end])
        start += size - overlap
    return chunks

chunks = chunk_text(text)

# Step 4: Configure OpenAI
openai.api_key = getpass.getpass("Enter your OpenAI API key: ")

# Step 5: Extract (subject, relation, object) triples from each chunk
def extract_triples(chunk: str) -> list[dict]:
    prompt = f"""Extract all subject–predicate–object triples from the following text.
Respond ONLY with a JSON list of objects in the form:  
[{{"subject":"…", "relation":"…", "object":"…"}}, …]

Text:
\"\"\"{chunk}\"\"\"
"""
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":prompt}],
        temperature=0,
    )
    return json.loads(resp.choices[0].message.content)

all_triples = []
for c in chunks:
    try:
        all_triples.extend(extract_triples(c))
    except Exception:
        pass  # skip any chunk that fails JSON parsing

# Step 6: Connect to Neo4j and store triples
neo4j_url = "bolt://your_neo4j_host:7687"
neo4j_user = "neo4j"
neo4j_pass = getpass.getpass("hzzjd9CSLOkjQmxZwrBBVk_3aItqqgwV-QV_ts0RBgk")

driver = GraphDatabase.driver(neo4j_url, auth=(neo4j_user, neo4j_pass))

def store_triples(triples: list[dict]):
    with driver.session() as session:
        for t in triples:
            session.run(
                """
                MERGE (s:Entity {name:$subject})
                MERGE (o:Entity {name:$object})
                MERGE (s)-[r:RELATION {type:$relation}]->(o)
                """,
                subject=t["subject"], relation=t["relation"], object=t["object"]
            )

store_triples(all_triples)

# Step 7: Simple graph retrieval on a query
def query_graph(q: str) -> list[dict]:
    cypher = """
    MATCH (s)-[r:RELATION]->(o)
    WHERE toLower(s.name) CONTAINS toLower($q)
       OR toLower(o.name) CONTAINS toLower($q)
    RETURN s.name AS subject, r.type AS relation, o.name AS object
    """
    with driver.session() as session:
        results = session.run(cypher, q=q)
        return [record.data() for record in results]

# Step 8: Synthesize an answer using OpenAI
def synthesize_answer(q: str, facts: list[dict]) -> str:
    context = "\n".join(f"{f['subject']} {f['relation']} {f['object']}" for f in facts)
    prompt = f"""Use the following knowledge-graph facts to answer the question.

Facts:
{context}

Question: {q}
Answer:"""
    resp = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":prompt}],
        temperature=0,
    )
    return resp.choices[0].message.content.strip()

# Example usage:
if __name__ == "__main__":
    question = "Where does Sarah work?"
    facts = query_graph(question)
    answer = synthesize_answer(question, facts)
    print(f"Q: {question}\nA: {answer}")
