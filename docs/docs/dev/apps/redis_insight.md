---
origin: installed
category: dev
url: https://redis.io/insight/
description: GUI for Redis database management and visualization
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/redis_insight.png
---

# Redis Insight

**[Redis Insight](https://redis.io/insight/)** is the official free GUI for Redis, and it goes well beyond letting you browse keys. The app is organized around three main views, each serving a different purpose.

## Browser

The browser is where you explore your data. It supports every Redis data type -- strings, hashes, lists, sets, sorted sets, streams, and JSON -- with inline editing, batch operations, and pattern-based search. What makes it particularly useful is the range of **data formatters**: you can view values as JSON, Protobuf, MessagePack, HEX, ASCII, or Unicode, which saves you from manually decoding binary payloads or compressed formats.

## Workbench

Think of this as a Redis CLI with the comfort of a real editor. Built on the Monaco Editor (the same engine as VS Code), the Workbench gives you syntax highlighting, autocompletion, and persistent command history. You can write multi-line scripts, run them, and see results inline. There is also an AI-powered **Redis Copilot** that can help build commands from natural language or explain unfamiliar Redis concepts.

## Analyzer

The database analyzer inspects your keyspace to show data type distribution, memory allocation per key pattern, and actionable optimization recommendations. When your Redis instance feels sluggish or memory usage climbs unexpectedly, this is where you start.

Beyond these three pillars, Redis Insight offers real-time visualization of **Streams** and consumer groups, as well as **Pub/Sub** channel monitoring -- two areas where a CLI-only workflow gets tedious fast.

## Lightweight alternative

If you do not need the full desktop app, the **Redis for Visual Studio Code** extension provides a similar experience directly inside your editor. It covers browsing, editing, and running commands without switching windows.

Redis Insight is 100% free and works with Redis Community Edition, Redis Cloud, AWS ElastiCache, Azure Managed Redis, and GCP Redis. Available as a desktop download or Docker image from [redis.io/insight](https://redis.io/insight/).
