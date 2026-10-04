---
description: "Des applications de bureau légères : une interface web, un cœur en Rust."
url: "https://tauri.app/"
status: active
kind: library
platforms: [windows, macos, linux]
image: tauri.png
sidebar_position: 1
---

# Tauri

Tauri construit des applications de bureau avec une interface web (chez moi, [React](/tools/dev/web-desktop/react)) et
un cœur en [Rust](/tools/dev/languages/rust). Contrairement à Electron, il n'embarque pas de navigateur entier : il
utilise celui du système (WebView2 sous Windows). Les installeurs pèsent quelques mégaoctets et l'application démarre
instantanément.

## Où je l'utilise

Toutes mes applications de bureau sont en Tauri 2 : [CortX](/projects/cortx), [PayLedger](/projects/payledger),
[Zorg](/projects/zorg), [Souvenirs](/projects/souvenirs), le [mod Rocket League](/projects/alxs-rl-mod).

L'organisation est toujours la même : la logique dans une bibliothèque Rust, l'interface qui l'appelle par des
commandes Tauri, et souvent un CLI qui réutilise la même bibliothèque — c'est ce qui permet aux agents de tout faire en
ligne de commande. Les mises à jour automatiques passent par le plugin *updater*, signé, servi depuis les releases
GitHub (voir [Mises à jour des apps Tauri](/setup/tauri-updates)).

```bash
cargo tauri dev        # l'application en développement, avec rechargement
cargo tauri build      # l'installeur signé
```
