---
description: "PostgreSQL, auth and realtime ready to use: Zorg's backend."
url: "https://supabase.com/"
status: active
kind: service
platforms: [web]
image: supabase.png
sidebar_position: 1
---

# Supabase

Supabase provides a full backend around a real **PostgreSQL** database: authentication, an API generated from the
tables, realtime (being notified when a row changes), file storage and server functions. You write your SQL schema, and
the rest is already there.

## Where I use it

It is [Zorg](/projects/zorg)'s backend: the web app, the desktop app, the CLI and the MCP server talk to the database
directly. Security relies on PostgreSQL rules (*row level security*): each user only sees their own data, whatever the
client. Realtime is limited to the data on screen, so other devices update without wasting traffic.

## The CLI

```bash
supabase migration new <name>         # a versioned SQL migration
supabase db push                      # apply it to the database
supabase functions deploy <name>      # deploy a server function
```

Migrations live in the repository, which lets [Claude Code](/tools/ai/coding/claude-code) write a schema change like
any other change.
