---
origin: installed
category: dev
url: https://nodejs.org/
location: ~/scoop/apps/nodejs-lts/current
description: Node.js and npm package manager
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/node.png
---

# Node

**[Node.js](https://nodejs.org/)** is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript outside the browser. It includes a standard library for I/O, networking, and file system access, and ships with npm (the Node package manager) to install and manage packages. Together they power servers, CLIs, build tools, and development workflows across modern web and backend stacks.

## What it is used for

Node is commonly used to build HTTP APIs, real‑time services (WebSockets), CLI tools, build pipelines (bundlers, linters, test runners), desktop apps (Electron), and scripts that automate development tasks. npm (and alternative registries like yarn or pnpm) provides access to a huge ecosystem of libraries, enabling rapid composition of functionality.

## Installation (Windows)

Official downloads and platform‑specific package instructions are on the Node site: https://nodejs.org/en/download. For package manager driven installs see: https://nodejs.org/en/download/package-manager/all. Common Windows options include the official MSI installer, `winget`, `chocolatey`, or Scoop.

I install Node via Scoop for easy upgrades and predictable installs:
```powershell
scoop install nodejs-lts
```
After install verify:
```powershell
node --version
npm --version
```

## Common commands

Initialize a new project (creates package.json):
```powershell
npm init -y
```

Install a dependency locally (added to package.json):
```powershell
npm install express
```

Install a developer dependency:
```powershell
npm install -D eslint jest
```

Install globally (for CLI tools):
```powershell
npm install -g npm-check-updates
```

Run scripts from package.json:
```powershell
npm run build
npm run test
```

Update packages (basic):
```powershell
npm update
npx npm-check-updates -u   # requires npx; updates package.json versions
```

Uninstall a package:
```powershell
npm uninstall express
```

Using npx to run a package binary once without installing globally:
```powershell
npx create-react-app myapp
```

Lockfile & install reproducibility:
```powershell
npm ci    # clean install from package-lock.json (CI-friendly)
```

## Notes

Consider alternatives like `pnpm` for faster, disk-saving installs (content-addressable storage) or `nvm-windows` when you need multiple Node versions. For most day‑to‑day work Scoop + `nodejs-lts` provides a stable experience.

## Summary

Node.js + npm form the backbone of modern JavaScript tooling: runtime, package ecosystem, and convenient CLI workflows. Install via the official downloads or a package manager (I use Scoop), and use npm scripts and `npx` for composing development tasks.

