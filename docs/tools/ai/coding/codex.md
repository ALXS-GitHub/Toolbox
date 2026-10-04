---
description: "OpenAI's coding agent, which I use on the command line next to Claude Code."
url: "https://openai.com/codex/"
status: active
kind: cli
platforms: [windows, macos, linux, web]
image: openai.png
sidebar_position: 2
---

# Codex

Codex is OpenAI's coding agent: like [Claude Code](/tools/ai/coding/claude-code), it works inside a project, reads and
changes code, runs commands. I mostly use it on the command line (the `codex` CLI), included in my
[ChatGPT](/tools/ai/assistants/chatgpt) subscription.

## How I use it

Codex is my second agent. I use it when a different view helps — reviewing a change made with Claude Code, unblocking a
problem the other one keeps circling around — and for what it does well on top, such as generating images from a
detailed brief, for instance thumbnails for my game [Pack a K-Pop Idol](/projects/pack-a-kpop-idol).

It runs with a medium reasoning level by default and, on Windows, in a sandbox that limits what it can change outside
the project. Each folder has to be marked as "trusted" before it works there freely. Its sessions show up in
[CortX](/projects/cortx), next to Claude Code's.

## Installing it

```powershell
scoop install codex      # or: npm install -g @openai/codex
codex                    # in a project, then sign in with your ChatGPT account
```
