---
origin: web
category: dev
url: https://supabase.com/
description: Open-source Firebase alternative with Postgres
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/supabase.png
---

# Supabase

**[Supabase](https://supabase.com/)** is an open-source backend-as-a-service built on PostgreSQL. It provides a Firebase-like developer experience—authentication, database, storage, realtime subscriptions, edge functions—while keeping everything backed by Postgres and open standards.

## What Supabase provides

| Service | Description |
|---------|-------------|
| **Database** | Managed Postgres with Table Editor UI |
| **Auth** | User authentication with 20+ providers |
| **Storage** | S3-compatible object storage |
| **Realtime** | Live database change subscriptions |
| **Edge Functions** | Serverless Deno functions |
| **Vector** | pgvector for AI embeddings |

## Why Postgres matters

Unlike Firebase's NoSQL approach, Supabase uses PostgreSQL:
- Full SQL power: joins, transactions, constraints, views
- Mature ecosystem: extensions, tools, knowledge
- Data portability: standard dumps, no vendor lock-in
- Row Level Security: granular access control in the database

## Getting started

### Create a project
1. Sign up at [supabase.com](https://supabase.com/)
2. Create new project (choose region, set database password)
3. Access dashboard with connection details

### Install the client
```powershell
npm install @supabase/supabase-js
```

### Initialize
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)
```

## Database operations

```typescript
// Select with filters
const { data } = await supabase
  .from('posts')
  .select('id, title, author(name)')
  .eq('published', true)
  .order('created_at', { ascending: false })

// Insert
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'Hello', content: 'World' })
  .select()

// Update
const { data } = await supabase
  .from('posts')
  .update({ title: 'Updated' })
  .eq('id', 1)

// Delete
await supabase.from('posts').delete().eq('id', 1)
```

## Authentication

```typescript
// Email/password signup
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// OAuth providers
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github'
})

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})
```

## Realtime subscriptions

```typescript
const channel = supabase
  .channel('posts-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe()
```

## Row Level Security

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users read own posts
CREATE POLICY "Users read own posts" ON posts
  FOR SELECT USING (auth.uid() = user_id);
```

## Local development

```powershell
npm install -g supabase
supabase init
supabase start    # Requires Docker
supabase db push  # Apply migrations
```

## Advanced features

- **OAuth Server**: Turn your project into an identity provider ("Sign in With Your App")
- **Analytics Buckets**: Columnar storage for analytical workloads (Apache Iceberg)
- **Vector Buckets**: Cold storage for AI embeddings at scale
- **Change Data Capture**: Replicate data to external destinations

## When to use Supabase

**Great for:**
- Apps needing auth + database + storage in one platform
- Teams comfortable with SQL and Postgres
- Projects valuing open-source and portability
- Realtime features (chat, live updates)
- AI applications needing vector storage

**Consider alternatives if:**
- You need complex backend logic (traditional backend might be better)
- Your team prefers NoSQL

## Summary

Supabase provides a complete backend—Postgres database, authentication, storage, realtime, and edge functions. It's Firebase for SQL developers with open-source foundations and Postgres power.
