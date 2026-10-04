---
description: A modern terminal with command blocks — my everyday terminal until I built my own.
url: "https://www.warp.dev/"
status: archived
replaced_by: CortX
kind: app
platforms: [windows, macos, linux]
image: warp.png
---

# Warp

[Warp](https://www.warp.dev/) is a terminal that rethinks the command line: each command and its output form a
**block** you can select, copy or share, editing works like in a text editor, a command palette gives access to
everything, and an AI assistant is built in. It was my everyday terminal for a long time.

## Why I stopped

I replaced it with the terminal built into [CortX](/projects/cortx), my own app. What I liked in Warp is there —
command blocks, Warp-like shortcuts, splits, notifications when a long command finishes — with what Warp could not give
me: the terminals sit next to my projects and their services, sessions are restored as I left them, and the shell
integration comes from the same `cortx init` that sets up my prompt and aliases (see
[The terminal on Windows](/setup/windows)).

## What carries over: themes

CortX reads Warp's YAML theme format, so the whole Warp theme library, and my own themes, import as they are. A Warp
theme is a small YAML file with the background, foreground and accent colours, the 16 terminal colours and an optional
background image. My old habit still applies: keep your own themes in a subfolder of the themes folder, and give the
image path relative to that subfolder.
