---
origin: installed
category: dev
url: https://neo4j.com/
location: 
description: Graph database management system
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/neo4j.png
---

# Neo4j

[Neo4j](https://neo4j.com/) is a native graph database where data is stored as nodes (entities) and relationships (typed, directed edges) rather than rows or documents. This model fits naturally when your primary questions traverse connections: recommendations, social graphs, knowledge graphs, network/IT topology, fraud rings, supply chains, permissions, etc. Instead of joining tables at query time, relationships are first‑class and pre‑connected, making multi‑hop traversals fast and intuitive.

## Why use it

Relational schemas can become complex for highly connected data (join tables exploding, deep join chains). Neo4j’s property graph model lets you attach arbitrary key/value properties to both nodes and relationships, simplifying queries that walk a graph. The Cypher query language expresses patterns (MATCH (a)-[:REL]->(b)) in a visual ASCII‑art style, making traversal logic concise. Performance benefits come from pointer‑based traversal rather than scanning + joining large tables. It shines when path length, pattern discovery, or relationship density are core to the domain.

## Installation (Windows - Neo4j Desktop)

Download Neo4j Desktop from: https://neo4j.com/download/ (choose the Desktop option). The Desktop app manages multiple local databases (DBMS instances) and connections to remote Aura (Neo4j’s hosted offering). Install with defaults; when first opened you can create a new local DBMS (choose version, set an admin password) and start it with one click.

## Exploration & querying in Desktop

Neo4j Desktop provides:
- Explorer (graph visualization): visually browse nodes & relationships, expand neighbors, inspect properties, style by label or relationship type.
- Query tab: run Cypher queries, view tabular results, graph result visualization, and execution plans. This is where you’ll write most logic.

For less technical interaction or quick pattern discovery, the Neo4j Bloom plugin offers a search‑/phrase‑driven exploration interface and configurable perspectives, making querying “super easy” for non‑Cypher users.

## Simple Cypher examples

Create two nodes and a relationship:
```cypher
CREATE (a:Person {name: 'Alice', age: 30})
CREATE (b:Person {name: 'Bob', age: 28})
CREATE (a)-[:KNOWS {since: 2022}]->(b);
```

Match a pattern and return data:
```cypher
MATCH (p:Person)-[r:KNOWS]->(friend:Person)
RETURN p.name AS person, friend.name AS friend, r.since AS since;
```

Filter nodes:
```cypher
MATCH (p:Person)
WHERE p.age > 25
RETURN p.name, p.age
ORDER BY p.age DESC;
```

Add more connected data in one statement:
```cypher
CREATE (c:City {name: 'Paris'})
WITH c
MATCH (p:Person {name: 'Alice'})
CREATE (p)-[:LIVES_IN]->(c);
```

Find people living in a city:
```cypher
MATCH (p:Person)-[:LIVES_IN]->(c:City {name: 'Paris'})
RETURN p.name;
```

Shortest path example (between two people):
```cypher
MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'}),
      p = shortestPath( (a)-[*..5]-(b) )
RETURN p;
```

Delete everything created (use carefully):
```cypher
MATCH (n) DETACH DELETE n;
```

## Summary

Neo4j models and queries connected data naturally. Install Desktop for an all‑in‑one local environment, explore visually in the Explorer, write precise logic in the Query tab, and leverage Bloom for guided, low‑friction discovery. Cypher’s pattern syntax keeps traversals readable while remaining powerful for analytics and pathfinding.