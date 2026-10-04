---
description: "Lightweight desktop apps: a web interface, a Rust core."
url: "https://tauri.app/"
status: active
kind: library
platforms: [windows, macos, linux]
image: tauri.png
sidebar_position: 1
---

# Tauri

Tauri builds desktop apps with a web interface (in my case, [React](/tools/dev/web-desktop/react)) and a
[Rust](/tools/dev/languages/rust) core. Unlike Electron, it does not ship a whole browser: it uses the system's (WebView2
on Windows). Installers weigh a few megabytes and the app starts instantly.

## Where I use it

All my desktop apps are on Tauri 2: [CortX](/projects/cortx), [PayLedger](/projects/payledger), [Zorg](/projects/zorg),
[Souvenirs](/projects/souvenirs), the [Rocket League mod](/projects/alxs-rl-mod).

The layout is always the same: the logic in a Rust library, the interface calling it through Tauri commands, and often a
CLI reusing the same library — which is what lets agents do everything from the command line. Automatic updates go
through the signed *updater* plugin, served from GitHub releases (see [Tauri app updates](/setup/tauri-updates)).

```bash
cargo tauri dev        # the app in development, with reload
cargo tauri build      # the signed installer
```
