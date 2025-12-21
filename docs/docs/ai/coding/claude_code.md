---
origin: installed
category: ai-coding
url: https://docs.anthropic.com/en/docs/claude-code
description: Agentic CLI coding assistant by Anthropic
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/claude.png
---

# Claude Code

**[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** is Anthropic's agentic coding tool that brings [Claude](/docs/ai/claude) directly into your terminal and development workflow. Unlike chat-based coding help, Claude Code operates as an autonomous agent: it explores codebases, makes multi-file edits, runs commands, executes tests, and iterates until tasks are complete.

## How it differs from chat

| Chat-based | Claude Code |
|------------|-------------|
| You copy/paste code | Agent reads your files directly |
| You apply suggestions manually | Agent edits files itself |
| One file at a time | Multi-file awareness and changes |
| You run commands | Agent runs and interprets results |
| Static responses | Iterative: tries, fails, fixes, retries |

## Installation

Requires Node.js 18+ and an Anthropic API key.

```powershell
npm install -g @anthropic-ai/claude-code
```

Launch in any project directory:
```powershell
claude
```

## Core capabilities

### Codebase understanding
Searches, reads, and comprehends project structure. Understands how components connect, follows imports, identifies patterns.

### Multi-file editing
Makes coordinated changes across files. Refactors, renames, updates imports, and maintains consistency.

### Command execution
Runs shell commands: builds, tests, lints, installs dependencies. Sandbox mode available on Linux/Mac for security.

### Git integration
Understands git state, creates branches, makes commits, and prepares pull requests with meaningful messages.

### Checkpoints
The checkpoint system automatically saves your code state before each change:
- **Instant rewind**: Tap Esc twice or use `/rewind` to restore previous versions
- **Safe experimentation**: Let Claude try approaches knowing you can always roll back

### Background agents
Run tasks in the background while you continue working:
- `Ctrl+B` to run any Bash command in background
- Great for dev servers, log tailing, long builds

## Practical examples

**"Add a dark mode toggle to the settings page"**
- Finds settings component
- Creates theme context/state
- Adds toggle UI, updates styles

**"Fix the failing tests in the auth module"**
- Runs tests, identifies failures
- Reads test and source files
- Implements fixes, reruns until passing

**"Refactor the API calls to use React Query"**
- Analyzes current patterns
- Installs React Query
- Migrates endpoints, updates components

## Extensions

### VS Code extension
A native VS Code extension brings Claude Code's agentic capabilities into your editor with visual diff views and workspace integration.

### Plugin system
Extend functionality with custom commands, agents, hooks, and MCP servers via `/plugin install`.

### Chrome integration (Beta)
Control your browser directly from Claude Code for testing web applications.

## Tips for effective use

- **Use checkpoints**: Let Claude experiment knowing you can rewind
- **Background long tasks**: Run dev servers with Ctrl+B
- **Be specific about constraints**: "Use the existing Button component"
- **Review changes**: Use git diff to verify modifications

## Comparison with Copilot

| Aspect | Claude Code | GitHub Copilot |
|--------|-------------|----------------|
| Mode | Agentic (autonomous) | Assistive (suggestions) |
| Scope | Full codebase, multi-file | Current file focus |
| Interface | Terminal CLI + VS Code | IDE integration |
| Execution | Runs commands, tests | Suggestions only |
| Best for | Complex tasks, refactoring | Line-by-line completion |

Claude Code and Copilot complement each other: Copilot for moment-to-moment coding flow, Claude Code for larger tasks requiring planning and execution.

## Summary

Claude Code transforms Claude from a chat assistant into an agentic coding partner. It understands entire codebases, makes coordinated changes, runs commands, and iterates autonomously until tasks complete. Checkpoints enable safe experimentation with instant rollback.
