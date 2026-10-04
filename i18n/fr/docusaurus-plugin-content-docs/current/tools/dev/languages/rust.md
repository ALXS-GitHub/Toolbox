---
description: "Le cœur de mes applications de bureau, et le langage de mes défis de code."
url: "https://www.rust-lang.org/"
status: active
kind: language
image: rust.png
sidebar_position: 3
---

# Rust

Rust est un langage compilé, aussi rapide que le C++, mais dont le compilateur empêche toute une famille de bugs
(mémoire, accès concurrents) avant même l'exécution. C'est le langage du **cœur de mes applications de bureau** :
toutes sont construites avec [Tauri](/tools/dev/web-desktop/tauri), dont la partie système est en Rust.

## Où je l'utilise

- **[CortX](/projects/cortx)**, **[PayLedger](/projects/payledger)**, le [mod Rocket League](/projects/alxs-rl-mod) :
  la logique métier vit dans une bibliothèque Rust, partagée entre l'application et son CLI.
- **[Advent of Code](/projects/challenges)** : mes solutions récentes sont en Rust, une bonne façon de pratiquer le
  langage sur des problèmes variés.

Le compilateur strict est aussi un atout avec les agents : quand [Claude Code](/tools/ai/coding/claude-code) écrit du
Rust, `cargo check` et `cargo clippy` lui signalent précisément ce qui ne va pas, et ce qui compile fonctionne
généralement.

## Mon installation

Rust s'installe avec `rustup` (via [Scoop](/tools/dev/terminal/scoop)), sur la chaîne `stable` et la cible Windows
MSVC. Le seul outil installé globalement avec `cargo install` est le CLI de Tauri.

```powershell
rustup update                 # mettre à jour la chaîne
cargo clippy --all-targets    # les conseils du linter
cargo test -p <crate>         # tester une seule crate d'un espace de travail
```
