---
description: "The language of all my interfaces and web tools."
url: "https://www.typescriptlang.org/"
status: active
kind: language
image: typescript.png
sidebar_position: 1
---

# TypeScript

TypeScript adds types to JavaScript, and it is the language I write all my interfaces in: the [React](/tools/dev/web-desktop/react)
front ends of [CortX](/projects/cortx), [Zorg](/projects/zorg), [PayLedger](/projects/payledger) or
[Spotify Manager](/projects/spotify-manager), and full tools such as Zorg's CLI and MCP server.

Types pay off twice: they catch errors before running, and they guide agents. When
[Claude Code](/tools/ai/coding/claude-code) changes a typed project, `tsc` tells it right away what it broke; that is
why type checking is part of how my projects are validated before each commit.

I run it with [Bun](/tools/dev/runtimes/bun), [Node](/tools/dev/runtimes/node) or [Deno](/tools/dev/runtimes/deno)
depending on the project, and build it with [Vite](/tools/dev/web-desktop/vite) on the interface side.
