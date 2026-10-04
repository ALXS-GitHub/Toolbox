---
description: "OpenAI's agent, which I mostly use to generate images."
url: "https://openai.com/codex/"
status: active
kind: cli
platforms: [windows, macos, linux, web]
image: openai.png
sidebar_position: 2
---

# Codex

Codex is OpenAI's coding agent: like [Claude Code](/tools/ai/coding/claude-code), it works inside a project, reads and
changes code, runs commands. I use it on the command line (the `codex` CLI), included in my
[ChatGPT](/tools/ai/assistants/chatgpt) subscription.

## How I use it

I use it **mostly to create images**: Codex generates and edits visuals from a detailed brief, right in the project
folder, which is handy to produce illustrations, icons or presentation visuals for my projects. As a second coding
agent next to Claude Code, I use it very little.

It runs with a medium reasoning level by default and, on Windows, in a sandbox that limits what it can change outside
the project. Each folder has to be marked as "trusted" before it works there freely. Its sessions show up in
[CortX](/projects/cortx), next to Claude Code's.

## Installing it

```powershell
scoop install codex      # or: npm install -g @openai/codex
codex                    # in a project, then sign in with your ChatGPT account
```
