---
origin: web
category: ai-coding
url: https://openai.com/codex
description: OpenAI's agentic coding platform
use_state: active
rating: 4
sidebar_custom_props:
    image: /images/openai.png
---

# Codex

**[Codex](https://openai.com/codex)** is OpenAI's agentic coding platform that runs tasks in isolated cloud sandboxes. Originally the model powering [GitHub Copilot](/docs/ai/coding/github_copilot), Codex has evolved into a full development environment where AI agents write features, fix bugs, and propose pull requests autonomously.

## How Codex works

### Cloud sandbox environment
Each task runs in its own isolated container:
- Pre-configured development tools
- Installed dependencies from your setup script
- Git access to your repository
- **Internet disabled during execution** for security
- Your code stays within the sandbox

### Task workflow
1. **Connect repository**: Link your GitHub repo
2. **Describe task**: "Implement user profile editing with validation"
3. **Sandbox provisioned**: Isolated environment with your code
4. **Autonomous execution**: Reads code, implements changes, runs tests
5. **Results delivered**: Opens PR or reports changes
6. **Iterate**: Respond to feedback, refine implementation

### Seamless environment switching
Move work between local environment and Codex cloud without losing state.

## Capabilities

### Feature implementation
"Add OAuth2 authentication using the existing user model"
- Explores codebase structure
- Implements auth flow
- Adds routes, updates models, creates tests

### Bug investigation
"Debug why the payment webhook fails for international currencies"
- Traces code path
- Identifies root cause
- Proposes and tests fixes

### Large-scale refactoring
"Migrate from REST to GraphQL for user endpoints"
- Multi-file changes across codebase
- Maintains consistency
- Updates all affected imports

### Dependency updates
"Update React from v17 to v18 and fix breaking changes"
- Updates packages
- Identifies deprecations
- Updates component patterns

## Key features

### Context compaction
Works coherently across millions of tokens in a single task—handles entire codebases, not just files.

### Enhanced vision
Interprets screenshots, technical diagrams, and design mocks. Can translate designs into functional prototypes.

### Unified platform
CLI, IDE extension, cloud, and GitHub code review operate as one experience.

## Access

Available through ChatGPT Plus, Pro, Business, Edu, and Enterprise plans. CLI and IDE extension default to GPT-5.2-Codex when signed in.

## Comparison with alternatives

| Aspect | Codex | Claude Code | Copilot |
|--------|-------|-------------|---------|
| Environment | Cloud sandbox | Local + VS Code | IDE extension |
| Context | Millions of tokens | 200K tokens | File-focused |
| Execution | Isolated container | Local terminal | None |
| Security | Internet disabled | Sandbox (Linux/Mac) | N/A |
| Best for | Large async tasks | Interactive dev | Real-time coding |

## Considerations

- **Cloud execution**: Your code runs in OpenAI's infrastructure
- **Task-oriented**: Designed for substantial work, not real-time interaction
- **Review required**: Always review generated PRs before merging

## Summary

Codex is a cloud-based agentic coding platform for substantial development work. It runs tasks in isolated sandboxes with access to your full codebase, proposes changes via pull requests, and excels at large refactors and feature implementations where security and context at scale matter.
