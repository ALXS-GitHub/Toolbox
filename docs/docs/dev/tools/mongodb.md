---
origin: installed
category: dev
url: https://www.mongodb.com/
location: 
description: NoSQL document database
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/mongodb.png
---

# MongoDB

**[MongoDB](https://www.mongodb.com/)** is a document-oriented NoSQL database that stores data as flexible JSON‑like BSON documents instead of rigid rows in tables. This schema flexibility lets you evolve your data model quickly while still indexing and querying efficiently. It excels for rapidly changing application domains, hierarchical or nested data, event logs, and scenarios where horizontal scaling and high availability are important.

## Why it is useful

MongoDB reduces friction when requirements change: you can add new fields to documents without a migration step for every row. Rich secondary indexes (single field, compound, text, geospatial, TTL) plus an expressive aggregation pipeline enable powerful server‑side transformations and analytics without moving data elsewhere. Replica sets provide automatic failover; sharding distributes large datasets across multiple servers as you scale. The core developer ergonomics (JSON style docs, native drivers, aggregation pipeline) make iteration fast.

## Installation (Windows via Compass)

For local inspection and light development I use MongoDB Compass (GUI) which bundles a convenient interface for creating databases/collections, browsing documents, building queries, and visualizing schema. Download it from: https://www.mongodb.com/try/download/compass. Install with default options; after launching you can connect to a local server (if you have a standalone mongod running) or to a remote connection string (e.g. Atlas).

If you also need a local server you can install the Community Server separately, but for many quick tasks (especially when working only with remote Atlas clusters) Compass alone is enough as a client.

## What you can do in the GUI (Compass)

Compass allows you to connect using a standard MongoDB URI, list databases and their collections, browse documents with automatic pagination, run ad‑hoc find queries or full aggregation pipelines, inspect and visualize schema distributions (field presence, types), create/edit indexes, import/export collections (JSON/CSV), and view performance / explain plans for queries. It’s ideal for quick exploration, manual edits during development, or verifying that an aggregation pipeline returns what you expect before baking it into application code.

## MongoDB Atlas (hosted)

Atlas is the managed cloud offering: you provision clusters (shared or dedicated) in major cloud providers, and Atlas handles replication, backups, metrics, scaling, encryption at rest, and managed upgrades. To get started you create a free tier cluster, add a database user, whitelist your IP (or use peering/VPC), then connect using the provided connection string (mongodb+srv://...). For most application development tasks you connect directly from your app or use Compass with that URI. Atlas also adds features like serverless instances, triggers, functions, and integrated full‑text search (Atlas Search) without operating servers manually.

## MongoDB Database Tools

Standalone command-line tools: https://www.mongodb.com/try/download/database-tools. After installing (ensure the bin directory is on PATH) you gain utilities such as `mongodump`, `mongorestore`, `mongoexport`, `mongoimport`, `bsondump`. These enable backup, restore, and migration workflows outside the GUI.

### Common examples (PowerShell)

By default these tools connect to `localhost:27017` (and use the `test` database only when a database isn't specified). So for local development you can omit any URI/host flags.

Dump an entire database to a directory (BSON + metadata):
```powershell
mongodump --db mydb --out C:/backups/mydb_2025-09-02
```

Restore that dump (into the same database name unless overridden):
```powershell
mongorestore --db mydb C:/backups/mydb_2025-09-02
```

Dump only a single collection:
```powershell
mongodump --db mydb --collection users --out C:/backups/users_only
```

Restore a single collection (will merge by _id, may fail on duplicates unless you drop first):
```powershell
mongorestore --nsInclude mydb.users C:/backups/users_only
```

Export a collection as JSON (one document per line) for inspection or lightweight sharing:
```powershell
mongoexport --db mydb --collection users --out C:/exports/users.json
```

Import JSON back (expects newline-delimited JSON unless using --jsonArray):
```powershell
mongoimport --db mydb --collection users --file C:/exports/users.json --jsonArray:$false
```

If you need to target a remote/hosted deployment (e.g. Atlas) specify a full URI:
```powershell
mongodump --uri "mongodb+srv://user:pass@cluster0.x123.mongodb.net/mydb" --out C:/backups/mydb_remote_2025-09-02
```

Notes:
`mongodump`/`mongorestore` operate on BSON for fidelity (indexes, types). `mongoexport`/`mongoimport` are better for partial data interchange, not full backups. Always test restores to validate backup integrity.

## Quick aggregation example (Compass or shell)

The aggregation pipeline processes documents through staged transformations. A simple example counting signups per day:
```javascript
db.users.aggregate([
    { $match: { createdAt: { $gte: ISODate('2025-01-01') } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: 1 } } },
    { $sort: { _id: 1 } }
])
```

Compass has an Aggregations tab where you can paste and iterate on this interactively.

## Summary

MongoDB provides a flexible document data model, powerful indexing and aggregations, and straightforward horizontal scaling. Compass offers an approachable GUI for exploration; Atlas removes operational overhead for production deployments; database tools cover backup and migration. Together they give a fast iteration loop from local prototyping to managed cloud production.