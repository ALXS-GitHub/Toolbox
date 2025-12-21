---
origin: installed
category: dev
url: https://tauri.app/
description: Build lightweight desktop and mobile apps with web technologies
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/tauri.png
---

# Tauri

**[Tauri](https://tauri.app/)** is a framework for building desktop and mobile applications using web technologies for the frontend and Rust for the backend. Unlike Electron, Tauri uses the operating system's native WebView instead of bundling Chromium, resulting in dramatically smaller binaries (2-3 MB vs 80-120 MB) and lower memory usage.

## Why Tauri

| Aspect | Tauri | Electron |
|--------|-------|----------|
| Binary size | ~2-3 MB | ~80-120 MB |
| Memory usage | Lower | Higher |
| Startup time | Under 500ms | 1-2 seconds |
| Backend | Rust | Node.js |
| Renderer | System WebView | Bundled Chromium |

Tauri gives you the convenience of web development with the performance and security benefits of native applications.

## How it works

- **Frontend**: Any web framework (React, Vue, Svelte, vanilla JS)
- **Backend**: Rust code that can access the filesystem, run commands, and interact with the OS
- **Bridge**: Commands and events pass between frontend and backend
- **Rendering**: WRY library provides a unified interface to system WebViews (WKWebView on macOS, WebView2 on Windows, WebKitGTK on Linux)

## Installation (Windows)

### Prerequisites

1. **Microsoft C++ Build Tools**

   Download from [Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools/). During installation, select "Desktop development with C++".

2. **WebView2 Runtime**

   Already included on Windows 10 (1803+) and Windows 11. For older systems, download from [Microsoft](https://developer.microsoft.com/microsoft-edge/webview2/).

3. **Rust**

   Download and run [rustup-init.exe](https://rustup.rs/). Select the MSVC toolchain (default on Windows).

4. **Node.js** (if using JS frameworks)

   Install via [Scoop](/docs/dev/code/frameworks/node) or the official installer.

### Create a new project

```powershell
npm create tauri-app@latest
```

Follow the prompts to select your frontend framework. Then:

```powershell
cd my-app
npm install
npm run tauri dev
```

## Project structure

```
my-app/
├── src/                    # Frontend code
├── src-tauri/
│   ├── src/
│   │   └── main.rs         # Rust entry point
│   ├── Cargo.toml          # Rust dependencies
│   ├── tauri.conf.json     # Tauri configuration
│   └── capabilities/       # Security permissions
├── package.json
```

## Commands: calling Rust from JavaScript

Define a command in Rust:

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error running app");
}
```

Call it from JavaScript:

```javascript
import { invoke } from '@tauri-apps/api/core';

const greeting = await invoke('greet', { name: 'World' });
```

## Common operations

### File system access

```javascript
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

const contents = await readTextFile('path/to/file.txt');
await writeTextFile('path/to/file.txt', 'new contents');
```

### System dialogs

```javascript
import { open, save } from '@tauri-apps/plugin-dialog';

const filePath = await open({ multiple: false, directory: false });
const savePath = await save({ defaultPath: 'document.txt' });
```

### Running shell commands

```javascript
import { Command } from '@tauri-apps/plugin-shell';

const output = await Command.create('git', ['status']).execute();
console.log(output.stdout);
```

## Tauri 2.0 features

Tauri 2.0 (October 2024) brought major improvements:

- **Mobile support**: Build for Android and iOS from the same codebase
- **Plugin system**: Modular architecture with official and community plugins
- **Access Control Lists**: Fine-grained security permissions replacing the allowlist
- **Mobile plugins**: NFC, barcode scanner, biometric, haptics, geolocation

## Building for distribution

```powershell
npm run tauri build
```

This produces platform-specific installers in `src-tauri/target/release/bundle/`:
- Windows: `.msi` and `.exe` installers
- macOS: `.dmg` and `.app`
- Linux: `.deb`, `.AppImage`, `.rpm`

## Security model

Tauri takes security seriously:
- **Capability-based permissions**: Explicitly grant access to APIs
- **Content Security Policy**: Control what resources can load
- **No network during build**: Internet disabled during compilation
- **Regular security audits**: Major releases undergo third-party audits

## When to use Tauri

**Good fit:**
- Desktop apps where bundle size matters
- Apps requiring native OS integration
- Projects where you want Rust's safety guarantees
- Cross-platform apps (including mobile with 2.0)

**Consider alternatives when:**
- You need advanced browser features not in system WebViews
- Your team has no interest in learning Rust basics
- You need maximum compatibility with older Windows versions

## Summary

Tauri combines web frontend development with a Rust backend, producing small, fast, secure desktop and mobile applications. Install the prerequisites (C++ build tools, WebView2, Rust), scaffold with `npm create tauri-app`, and use commands to bridge JavaScript and Rust. The 2.0 release adds mobile support and a robust plugin ecosystem.
