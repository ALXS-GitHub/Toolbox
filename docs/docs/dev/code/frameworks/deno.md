---
origin: installed
category: dev
url: https://deno.land/
location: ~/.deno/bin/deno.exe
description: Secure runtime for JavaScript and TypeScript
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/deno.png
---

# Deno

**[Deno](https://deno.land/)** is a secure runtime for JavaScript and TypeScript built with Rust. It was created by the original Node author to provide a modern, batteries‑included alternative: first‑class TypeScript support, a single executable, a scoped permissions model, and a standard set of audited utilities (formatter, linter, test runner, bundler) out of the box.

## Why use it

Deno simplifies development by removing build toolchain friction: you can run TypeScript files directly without a separate transpilation step, import modules via URLs, and rely on a small standard library that encourages secure defaults. Its architecture leverages Rust for performance and safety, while Tokio (Rust async) and V8 power the async runtime and JS execution. The permission flags (`--allow-read`, `--allow-net`, etc.) make scripts safer by default, which is especially useful for scripting, serverless functions, and secure CLIs.

## Installation (Windows)

Official installation instructions: https://deno.land/manual/getting_started/installation. Common Windows install options:

- PowerShell one‑liner (official):
```powershell
irm https://deno.land/install.ps1 | iex
```

- Package managers: scoop, winget, chocolatey, or cargo.

After install verify:
```powershell
deno --version
```

## Key concepts

- Built‑in TypeScript support: run .ts files directly (`deno run file.ts`).
- Single executable: Deno ships as one binary that includes tooling (fmt, lint, test, bundle).
- Secure by default: network, file system, environment access are blocked unless explicitly allowed.
- URL imports: modules can be imported from URLs, reducing the need for a central package registry.

## Common commands

Run a script with explicit permissions (example allowing network and reading current directory):
```powershell
deno run --allow-net --allow-read script.ts
```

Format code:
```powershell
deno fmt
```

Lint:
```powershell
deno lint
```

Run tests:
```powershell
deno test
```

Bundle into a single JS file:
```powershell
deno bundle mod.ts bundle.js
```

Install a script as a global command (creates a shim):
```powershell
deno install --name mycmd https://deno.land/x/some_tool/mod.ts
```

Run TypeScript directly (no tsconfig needed for simple cases):
```powershell
deno run https://deno.land/std/examples/welcome.ts
```

Update the deno executable:
```powershell
deno upgrade
```

## Permissions model (short)

By default Deno denies network, file, and environment access. Use granular flags to grant only what you need: `--allow-net`, `--allow-read`, `--allow-write`, `--allow-env`, `--allow-run`. For example, `deno run --allow-net app.ts` grants network access but nothing else. This minimizes accidental data exfiltration or harmful side effects.

## Notes & ecosystem

Deno's ecosystem favors URL imports and standard modules (`https://deno.land/std`). There are third‑party registries (deno.land/x) and compatibility layers, but the mental model differs from npm/node. If you need heavy npm ecosystem compatibility, node might be preferable; otherwise Deno offers a compact, secure, and modern developer experience.

## Summary

Deno (written in Rust) provides a modern runtime for JS/TS with secure defaults and built‑in tooling. Install via Scoop, the official script, or a package manager, then use `deno run`, `deno fmt`, `deno lint`, and `deno test` to develop quickly and safely.