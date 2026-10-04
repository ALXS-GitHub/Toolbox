---
description: "Run, install, test and bundle TypeScript with a single, very fast tool."
url: "https://bun.sh/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: bun.png
sidebar_position: 2
---

# Bun

Bun replaces Node, npm and part of the tooling on its own: it runs TypeScript directly, installs dependencies in a
fraction of npm's time, and can compile a program into a standalone executable.

## Where I use it

[Zorg](/projects/zorg) is a monorepo managed with Bun: the web app, the CLI, the MCP server and the shared code are
workspaces, and a single command targets one of them.

```bash
bun install                              # every dependency of the monorepo
bun --filter @zorg/web typecheck         # a command in a single workspace
bun run build
bun build --compile src/cli.ts           # a standalone executable
```

That is how the `zorg` CLI is produced: a single file, no Node to install, shipped with the desktop app and called
directly by agents.
