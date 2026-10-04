---
description: "Roblox's language, written in VS Code and synced into Studio."
url: "https://luau.org/"
status: active
kind: language
image: luau.svg
sidebar_position: 5
---

# Luau

Luau is the language of Roblox games: a Lua derivative, fast, with a gradual type system. It is the language of my game
[Pack a K-Pop Idol](/projects/pack-a-kpop-idol).

I do not write it in Roblox Studio but in [VS Code](/tools/dev/editors/vscode), like ordinary code, in a git repository.
A toolchain bridges the two:

| Tool | Role |
|---|---|
| **Rokit** | installs the other tools, at a version pinned per project |
| **Rojo** | syncs files from disk into Studio |
| **Wally** | manages packages |
| **Selene**, **StyLua** | lint and format the code |
| **Luau LSP** | completion and types in the editor |

This setup also lets [Claude Code](/tools/ai/coding/claude-code) work on the game like on any project. Details are in
the **[Developing on Roblox](/setup/roblox)** guide.
