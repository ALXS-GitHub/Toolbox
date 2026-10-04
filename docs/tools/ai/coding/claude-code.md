---
description: "Anthropic's coding agent, in the terminal: it reads the project, edits code, runs commands and commits."
url: "https://www.anthropic.com/claude-code"
status: active
kind: cli
platforms: [windows, macos, linux]
image: claude.png
sidebar_position: 1
---

# Claude Code

Claude Code is Anthropic's coding agent. It runs in the terminal (and in VS Code), inside a project: it reads files,
searches the code, changes what is needed, runs commands — tests, build, git — and checks the result. You describe what
you want in plain language, and it works until it is done, showing every action. It is the tool I build almost all my
projects with.

## What it can do

- **Work on a real project**: it explores the repository, understands its layout, and follows the conventions written
  in a `CLAUDE.md` file at its root.
- **Act on the machine**: run commands, read their errors, try again. Each action can ask for confirmation, or be
  allowed once and for all.
- **Split the work**: start subagents in parallel, each on part of the task.
- **Be extended**: *skills* (know-how loaded on demand), *hooks* (actions at given moments), MCP servers and plugins,
  a custom status line, a memory per project.
- **Leave the terminal**: drive the browser with the Chrome extension, or work in VS Code with the extension.

## How I use it

I install it with the native installer, which updates itself, and sign in with my Claude account. I open it with the
`cc` alias in any project, and hand it anything from a quick fix to a whole feature or a [Zorg](/projects/zorg) ticket.
It answers me in French, with a high reasoning level by default.

Around it I have built a whole environment: versioned settings and instructions, skills that produce polished
documents and diagrams, leak guardrails, the integration with my ticket manager. It is described in detail in the
**[My Claude Code harness](/setup/claude-code)** section.

## Installing it

```powershell
irm https://claude.ai/install.ps1 | iex     # Windows
claude                                     # in a project, then sign in
```
