---
origin: installed
category: dev
url: https://cursor.com/
description: AI-powered code editor built on VS Code
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/cursor.png
---

# Cursor

**[Cursor](https://cursor.com/)** is a code editor built as a fork of Visual Studio Code, which means everything you already know and use -- extensions, keybindings, settings, themes -- works out of the box. You can import your entire VS Code setup during installation and feel at home immediately. The difference is what sits on top: a deeply integrated AI layer that turns your editor into a collaborative coding partner.

## What Makes It Different from VS Code

The core editing experience is VS Code. The command palette is still `Ctrl+Shift+P`, the file tree still works the same way, and your Prettier config still applies. What Cursor adds is a set of AI interactions woven into the editing workflow rather than bolted on as extensions.

**Tab completion** is the most constant presence. It goes beyond autocomplete snippets -- Cursor predicts multi-line edits based on what you are doing, the file you are in, and how you tend to write code. It feels closer to pair programming than to IntelliSense.

**Inline edits** (`Ctrl+K`) let you highlight a block of code, describe what you want in plain English, and get a targeted rewrite. This works well for refactoring a function signature, fixing a bug you can see but do not want to manually untangle, or converting between patterns. **The chat panel** (`Ctrl+L`) handles longer conversations about your codebase -- asking questions, exploring architecture, or working through a design decision.

**Agents** (`Ctrl+I`) take things further. An agent can autonomously build, test, and iterate on features across multiple files. You describe what you want, and the agent writes the code, runs it, reads errors, and fixes them in a loop. An autonomy slider lets you dial this from conservative (just suggestions) to fully autonomous. This is the mode where Cursor stops being an editor and starts being a developer on your team.

Cursor indexes your entire codebase for semantic search, so the AI understands your project at scale -- not just the open file. It supports multiple frontier models (Claude, GPT, Gemini) and you can switch between them depending on the task. Extensibility comes through **MCP servers** (Model Context Protocol), custom skills, and lifecycle hooks, letting you connect the AI to external tools, databases, or APIs.

## Pricing

| Plan | Price | Highlights |
|------|-------|------------|
| Hobby | Free | Limited agent requests and completions |
| Pro | $20/mo | Extended limits, frontier models, MCP support |
| Pro+ | $60/mo | 3x usage on all models |
| Ultra | $200/mo | 20x usage, priority access to new features |

## Getting Started

Download the installer from [cursor.com](https://cursor.com/) for Windows, macOS, or Linux. During setup, you can import your VS Code profile so the transition is seamless. Most VS Code extensions install and work without modification.

Once installed, start with Tab completions and inline edits to get a feel for the AI. When you are comfortable, try the agent on a small feature or refactor. Connect BugBot to your GitHub repository for automatic PR reviews, and explore MCP servers if you want the AI to interact with external systems.
