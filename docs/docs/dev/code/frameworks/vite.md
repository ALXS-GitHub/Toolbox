---
origin: installed
category: dev
url: https://vite.dev/
description: Next generation frontend tooling
use_state: active
sidebar_custom_props:
    image: /images/vite.png
---

# Vite

**[Vite](https://vite.dev/)** is a next‑generation frontend build tool and development server that optimizes the dev feedback loop by serving source files over native ES modules in development and producing highly optimized bundles for production. It provides an extremely fast dev server with instant hot module replacement (HMR), on‑demand file transformation, and a simple plugin API built on Rollup for production builds.

## Why use it
Vite is designed to make frontend development fast and pleasant. During development it avoids heavyweight bundling and instead serves ES modules directly to the browser, transforming files only when requested. That means near‑instant server start and immediate updates on file changes. For production Vite uses Rollup under the hood to produce efficient, tree‑shaken bundles. It supports React, Vue, Svelte, Preact, and more through templates and official plugins.

## Setting up a new project

Vite requires [Node.js](/docs/dev/code/frameworks/node)

Here is an example using npm to create a new Vite project:

```powershell
npx create-vite@latest my-app
# OR (newer recommended shorthand)
npm create vite@latest my-app
```

Choose a framework preset (vanilla, vue, react, svelte, etc.) when prompted. Enter the project folder and install dependencies with your package manager of choice (npm, pnpm, or yarn):

```powershell
cd my-app
npm install
```

Start the development server:

```powershell
npm run dev
```

Build for production and preview the output locally:

```powershell
npm run build
npm run preview
```

You can use other tools than npm to setup your project, for example with [Deno](/docs/dev/code/frameworks/deno), but for this refer to https://vite.dev/guide/.

## Common commands and notes

The generated `package.json` will include scripts that invoke the Vite CLI (`vite` for dev, `vite build` for production, `vite preview` to serve the build). Vite supports TypeScript, JSX, CSS modules, PostCSS, and many integrations through plugins. For quick reference and advanced flags see the CLI docs: https://vite.dev/guide/cli.

## Summary

Vite improves iteration speed by serving native ES modules in development and leveraging Rollup for production builds. Install with `npm create vite@latest`, pick a template, install dependencies, then use `npm run dev` to start developing. It’s especially recommended when you value fast feedback and modern JS features.