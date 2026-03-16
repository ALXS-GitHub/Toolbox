---
origin: installed
category: dev
url: https://antigravity.google/
description: AI-powered agentic IDE by Google built on VS Code
use_state: active
rating: 4
os: Windows
sidebar_custom_props:
    image: /images/antigravity.png
---

# Antigravity

**[Antigravity](https://antigravity.google/)** is Google's AI-powered agentic IDE, announced alongside Gemini 3. Built on top of VS Code, it's redesigned around an agent-first architecture where AI agents can autonomously plan, execute, validate, and iterate on engineering tasks.

## Key concepts

### Dual interface

| Surface | Purpose |
|---------|---------|
| **Editor View** | Traditional IDE with agent sidebar (like Cursor/Copilot) |
| **Manager Surface** | Spawn, orchestrate, and observe multiple agents working in parallel |

### Agent-first architecture

Unlike traditional AI assistants that suggest code, Antigravity agents are autonomous actors:
- **Plan** what to build from high-level instructions
- **Create and edit** files across the codebase
- **Run** terminal commands, builds, and tests
- **Launch a browser** to visually test output
- **Iterate** until the task is complete

### Multi-agent orchestration

The Open Agent Manager lets you run multiple agents in parallel across different workspaces and tasks. Each agent produces **artifacts**: implementation plans, task lists, screenshots, and browser recordings.

## Supported models

- **Google Gemini 3.1 Pro** / **Gemini 3 Flash** (primary)
- **Anthropic Claude Sonnet 4.6** / **Claude Opus 4.6**
- **GPT-OSS-120B** (open-source)

## Browser automation

Ships with a dedicated Chrome extension allowing agents to:
- Launch browser windows
- Navigate, scroll, click, type
- Inspect console logs and network requests
- Take screenshots and record sessions

## Comparison with other AI coding tools

| Aspect | Antigravity | [Claude Code](/docs/ai/coding/claude_code) | [GitHub Copilot](/docs/ai/coding/github_copilot) |
|--------|-------------|-------------|----------------|
| Mode | Agentic IDE | Agentic CLI | Assistive |
| Interface | Full IDE (VS Code fork) | Terminal + VS Code ext | IDE integration |
| Multi-agent | Yes (Manager Surface) | Background agents | No |
| Browser | Built-in Chrome extension | Chrome ext (beta) | No |
| Models | Gemini, Claude, GPT-OSS | Claude only | GPT, Claude |
| Best for | Full IDE replacement with AI | Terminal-first workflows | Line-by-line completion |

## Installation

Download from [antigravity.google/download](https://antigravity.google/download). Available for Windows (x64/ARM64), macOS, and Linux.

Currently in **public preview at no cost** for personal Gmail accounts.

## Local info

- **Executable**: `C:\Users\alxsm\AppData\Local\Programs\Antigravity\Antigravity.exe`
- **CLI**: `antigravity` (added to PATH at install)
