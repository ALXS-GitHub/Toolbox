---
origin: installed
category: dev
url: https://bun.sh/
location: ~/.bun/bin/bun.exe
description: Fast all-in-one JavaScript runtime and toolkit
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/bun.png
---

# Bun

**[Bun](https://bun.sh/)** is a fast all-in-one JavaScript runtime designed as a drop-in replacement for Node.js. Written in Zig and built on JavaScriptCore (Safari's JS engine), it bundles runtime, package manager, bundler, and test runner into a single executable that prioritizes speed at every level.

## Why Bun exists

Node.js accumulated complexity over 15 years: slow npm installs, separate tools for bundling/testing/transpiling, cold start latency. Bun addresses these by:
- Rewriting from scratch in a systems language (Zig)
- Bundling tools that Node requires as separate packages
- Native TypeScript/JSX support without transpilation config
- Drop-in Node compatibility for existing projects

## Installation (Windows)

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Or using npm:
```powershell
npm install -g bun
```

Verify:
```powershell
bun --version
```

## Core components

### Runtime
Execute JavaScript/TypeScript directly:

```powershell
bun run index.ts      # Run TypeScript, no config needed
bun run index.jsx     # JSX works too
bun run ./server.js   # Or plain JavaScript
```

### Package manager
Dramatically faster than npm/yarn/pnpm:

```powershell
bun install           # Install dependencies
bun add react         # Add a package
bun add -d typescript # Add dev dependency
bun remove lodash     # Remove a package
```

Uses global cache and hardlinks—installs are near-instant for cached packages.

### Bundler
Built-in bundler for production:

```powershell
bun build ./src/index.ts --outdir ./dist
bun build ./src/index.ts --minify --target=browser --outdir ./dist
```

### Test runner
Jest-compatible:

```powershell
bun test              # Run all tests
bun test --watch      # Watch mode
```

```typescript
import { expect, test } from "bun:test";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});
```

## Bun-specific APIs

```typescript
// Fast HTTP server
Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello!");
  },
});

// File I/O
const file = Bun.file("./data.json");
const content = await file.json();

// Write files
await Bun.write("output.txt", "Hello World");
```

## Node.js compatibility

Bun implements Node.js APIs:
- `fs`, `path`, `http`, `https`, `crypto`, `buffer`, `stream`
- `process`, `__dirname`, `__filename`, `require()`
- Aims for 100% Node.js compatibility
- Most npm packages work without modification

## Speed comparisons

| Operation | Bun vs Node |
|-----------|-------------|
| Package install | 10-100x faster |
| Cold start | 4x faster |
| HTTP requests/sec | 2-3x higher |
| TypeScript execution | No transpile step |
| Test execution | 2-5x faster |

## Common workflows

```powershell
bun init             # Start new project
bun run dev          # Run scripts from package.json
bunx create-next-app # Execute remote scripts (like npx)
bun --watch run server.ts  # Hot reloading
```

## When to use Bun

**Good fit:**
- New projects where you control the stack
- Scripts and tooling where speed matters
- TypeScript-first development

**Consider carefully:**
- Production servers requiring long track record
- Projects with Node-specific native modules

## Notes

Bun is now backed by Anthropic (as of December 2025) while remaining open-source under MIT License. Current version is 1.3 with significant performance improvements.

## Summary

Bun is a fast, modern JavaScript runtime consolidating runtime, package manager, bundler, and test runner. It runs TypeScript natively, installs packages dramatically faster than npm, and maintains strong Node.js compatibility. Ideal for developers who want speed without sacrificing the npm ecosystem.
