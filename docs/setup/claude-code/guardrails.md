---
sidebar_position: 4
description: How nothing personal leaves the machine, even by mistake.
---

# Guardrails

Claude Code's folder holds things that must never leave it: sign-in credentials, conversation history, transcripts,
memory. Versioning the configuration in that same folder is only reasonable if a slip cannot take them along. Three
barriers take care of it, each one catching what the previous one would have let through.

<Diagram
  name="harness-commit"
  alt="Changed files go through the allow-list on git add, the pre-commit hook on commit, then are signed and pushed over SSH to the private repository; the hook blocks the commit when there is a problem."
/>

## 1. An allow-list rather than a deny-list

The `.gitignore` starts by ignoring everything (`/*`), then allows the repository's files one by one: the settings,
the global `CLAUDE.md`, the status line, the scripts, the skills folder. A new file created by Claude Code, a
transcript, a cache or a credentials file is therefore ignored by default: it would have to be added to the list on
purpose to get in.

Below that, a few defensive patterns apply even inside allowed folders: any file whose name contains `token`,
`secret`, `password` or `credential`, `.env` files, keys and `*.local.*` files. That is why the variables file of the
[common design](/setup/claude-code/design) is called `variables.json` and not `tokens.json`.

## 2. A hook before every commit

The `pre-commit` hook reads every staged file and blocks the commit at the slightest doubt. It runs four checks:

| Check | What is blocked |
|---|---|
| Names and folders | credential or MCP config files, `.env` files, keys, and anything from a state folder (projects, sessions, caches, plugins…) |
| Secret patterns | known API keys (Anthropic, OpenAI, GitHub, Slack, AWS, Google), JWTs, private keys, webhooks, connection strings with a password, `token = …` |
| E-mail addresses | any address other than mine and technical ones (`noreply`, `example.com`) |
| Settings | `settings.json` keys meant to carry secrets (`env`, `apiKeyHelper`, `mcpServers`…) |

When it blocks, it prints the file, the line and the reason. It does not scan its own content (it contains the
patterns it looks for), and for binary files only the name is checked. Bypassing it with `--no-verify` is still
possible, but only after reading the diff by hand.

The hook is versioned with the rest, and the setup script enables it with `git config core.hooksPath .githooks`. On
a new machine, it is therefore in place before the first commit.

## 3. Signed commits, pushed over SSH

Every commit is signed with an SSH key that lives in my password manager, never on disk. Git uses it through the
password manager's SSH agent (`gpg.format = ssh`, `commit.gpgsign = true`), which asks for my approval before using
the key; pushing goes through the same agent. Without the password manager unlocked, no commit can be signed or
pushed, and [GitHub](/tools/dev/version-control/github) shows every commit as verified.
The exact wiring is described in [Git and GitHub](/setup/git).

## Why three barriers

Each covers a blind spot of the others. The allow-list stops files from getting in unnoticed, but not a secret pasted
into an allowed file: that is the hook's job. The hook catches what it recognises, but a commit made by mistake is
still a commit: since signing and pushing go through the password manager, nothing leaves without me. The same idea protects this
public site: a build check rejects any e-mail address, personal path or link to a private repository.
