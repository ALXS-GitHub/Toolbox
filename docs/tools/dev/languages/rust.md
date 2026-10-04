---
description: "The core of my desktop apps, and the language of my coding challenges."
url: "https://www.rust-lang.org/"
status: active
kind: language
image: rust.png
sidebar_position: 3
---

# Rust

Rust is a compiled language, as fast as C++, whose compiler rules out a whole family of bugs (memory, concurrent
access) before the program even runs. It is the language of **the core of my desktop apps**: they are all built with
[Tauri](/tools/dev/web-desktop/tauri), whose system side is written in Rust.

## Where I use it

- **[CortX](/projects/cortx)**, **[PayLedger](/projects/payledger)**, the [Rocket League mod](/projects/alxs-rl-mod):
  the business logic lives in a Rust library, shared between the app and its CLI.
- **[Advent of Code](/projects/challenges)**: my recent solutions are in Rust, a good way to practise the language on
  varied problems.

The strict compiler is also an asset with agents: when [Claude Code](/tools/ai/coding/claude-code) writes Rust,
`cargo check` and `cargo clippy` tell it exactly what is wrong, and what compiles usually works.

## My setup

Rust is installed with `rustup` (through [Scoop](/tools/dev/terminal/scoop)), on the `stable` toolchain and the
Windows MSVC target. The only tool installed globally with `cargo install` is the Tauri CLI.

```powershell
rustup update                 # update the toolchain
cargo clippy --all-targets    # the linter's advice
cargo test -p <crate>         # test a single crate of a workspace
```
