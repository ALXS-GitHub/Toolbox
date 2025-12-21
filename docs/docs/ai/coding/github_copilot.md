---
origin: installed
category: ai-coding
url: https://github.com/features/copilot
description: AI pair programmer integrated in your IDE
use_state: active
rating: 4
sidebar_custom_props:
    image: /images/github-copilot.png
---

# GitHub Copilot

**[GitHub Copilot](https://github.com/features/copilot)** is an AI pair programmer that integrates directly into your code editor. It provides real-time code suggestions as you type, understands context from your current file and project, and can generate entire functions from comments or partial code.

## How it works

Copilot runs as an extension in your IDE (VS Code, JetBrains, Neovim, Visual Studio). As you type, it:
1. Analyzes your current file, open tabs, and context
2. Predicts what you're trying to write
3. Shows ghost text suggestions inline
4. You accept (Tab), reject (Esc), or cycle through alternatives

## Installation (VS Code)

1. Install **GitHub Copilot** extension from VS Code marketplace
2. Sign in with your GitHub account
3. Authorize the extension
4. Start typing—suggestions appear automatically

## Core features

### Inline completions
The primary mode—type a function signature, start a loop, or write a comment describing what you want:
- Function implementations from signatures
- Boilerplate code (getters, setters, constructors)
- Pattern matching from your existing code
- Test generation from implementations

### Copilot Chat
Chat panel within your IDE:
- Explain selected code
- Suggest refactors
- Answer codebase questions
- Generate code from natural language
- Debug assistance

### Agent Mode
Copilot can operate as an autonomous agent:
- Determines which files to change
- Offers code changes and terminal commands
- Iterates to fix issues until the task is complete
- Automatically finds context and sets working file sets

### Agent Skills
Teach Copilot specialized tasks with repeatable patterns:
- Create skills by adding `.github/skills/[skill-name]/SKILLS.md` to your repository
- Skills work across Copilot coding agent, CLI, and VS Code agent mode
- Compatible with Claude Code skills (`.claude/skills/`)

## Practical usage patterns

### From comment to code
```javascript
// function that validates email format and returns boolean
```
Tab to accept the generated implementation.

### Complete the pattern
```python
def get_user(id): return db.users.get(id)
def get_post(id): # Copilot completes
```

### Agent mode for complex tasks
"Refactor all API calls to use the new error handling pattern"
Copilot agent finds affected files, makes changes, and runs tests.

### Create custom skills
```markdown
<!-- .github/skills/api-endpoint/SKILLS.md -->
# API Endpoint Skill
When creating new API endpoints:
1. Use the established route pattern in /src/routes
2. Add validation using zod schemas
3. Include error handling with our custom ApiError class
```

## Supported languages

**Excellent**: Python, JavaScript, TypeScript, Go, Ruby, Java, C#, C++, PHP, Rust

**Good**: Swift, Kotlin, Scala, SQL, Shell, and most mainstream languages

## Limitations

- Suggestions aren't always correct—review carefully
- Can reinforce patterns from your codebase (including bad ones)
- Agent mode still requires supervision for critical changes
- Context limits for very large files

## Comparison with Claude Code

| Aspect | GitHub Copilot | Claude Code |
|--------|----------------|-------------|
| Integration | IDE native | Terminal CLI + VS Code |
| Primary mode | Inline suggestions | Autonomous agent |
| Speed | Real-time (ms) | Deliberate (seconds-minutes) |
| Best for | Fast coding flow | Complex multi-step tasks |

Both tools now support agent mode and share skill compatibility, making them complementary.

## Summary

GitHub Copilot accelerates coding with real-time inline suggestions and now includes agent mode for complex multi-file tasks. Agent Skills let you teach repeatable patterns. Best used alongside agentic tools like [Claude Code](/docs/ai/coding/claude_code) for comprehensive AI-assisted development.
