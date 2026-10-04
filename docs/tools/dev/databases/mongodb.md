---
description: "The document database behind my Node web projects."
url: "https://www.mongodb.com/"
status: active
kind: service
platforms: [windows, macos, linux]
image: mongodb.png
sidebar_position: 1
---

# MongoDB

MongoDB stores JSON documents rather than rows in tables: each record can have its own shape, which is fast when the data
model evolves along with the project. It is the database of my web projects with a Node backend, such as
[Spotify Manager](/projects/spotify-manager) and [K-Games](/projects/k-games).

I install the server, the `mongosh` shell and the backup tools (`mongodump`, `mongorestore`) with
[Scoop](/tools/dev/terminal/scoop), to develop locally. To look at the data, I use
[Compass](/tools/dev/databases/mongodb-compass) or VS Code's MongoDB extension.

For more recent projects I picked other databases depending on the need: PostgreSQL with
[Supabase](/tools/dev/cloud/supabase) when several devices must stay in sync, and SQLite for fully local apps such as
[PayLedger](/projects/payledger).
