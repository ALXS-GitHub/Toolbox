---
origin: installed
category: dev
url: https://www.mongodb.com/products/compass
description: GUI for exploring and managing MongoDB databases
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/mongodb_compass.png
---

# MongoDB Compass

**[MongoDB Compass](https://www.mongodb.com/products/compass)** is a free GUI for MongoDB that turns your database from an opaque blob of documents into something you can actually understand at a glance. For the server and CLI shell, see the [MongoDB](/docs/dev/tools/mongodb) page.

The standout feature is **schema analysis**. Open any collection, switch to the Schema tab, and Compass samples documents to build a live visualization of your data shape -- field names, types, value distributions, and outliers all laid out graphically. On a schema-less database, this is enormously useful. You can spot inconsistencies (a `price` field that is sometimes a string, sometimes a number) without writing a single query.

## Querying and aggregating

The query bar supports full MongoDB syntax with autocomplete and operator suggestions, so you do not need to remember the exact shape of `$elemMatch` or `$regex`. There is also an AI-powered assistant that translates plain English descriptions into queries -- useful when you know what you want but not the syntax to express it.

For more involved data transformations, the **Aggregation Pipeline Builder** lets you construct pipelines stage by stage. Each stage shows a live preview of its output, so you can see exactly how your data flows through `$match`, `$group`, `$lookup`, and the rest. This is far more ergonomic than debugging a 50-line pipeline in the shell.

## Performance tools

The **Explain Plan** tab visualizes how MongoDB executes a query -- which index it picked (or didn't), how many documents it scanned, and where time was spent. The index management panel shows all indexes on a collection with usage statistics, making it easy to spot redundant or missing indexes.

Compass connects to local instances and MongoDB Atlas alike. Download it from [mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass).
