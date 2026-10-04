---
description: "The history of all my projects, with commits always signed."
url: "https://git-scm.com/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: git.png
sidebar_position: 1
---

# Git

Git keeps the history of all my projects, from the smallest script to the monorepo. I mostly use it through
[lazygit](/tools/dev/cli/lazygit), and more and more through agents: [Claude Code](/tools/ai/coding/claude-code) commits
and pushes on its own when a project allows it.

## How I use it

- **Every commit is signed**, with an SSH key kept in 1Password: no key on disk, and GitHub shows each commit as
  "verified".
- **Conventional commit messages** (`feat(scope): …`, `fix: …`), with the [Zorg](/projects/zorg) ticket reference when
  the work comes from one.
- **Versioned hooks** in the repository (`.githooks`), for instance this site's leak check before each commit.

The full wiring on Windows — 1Password's SSH agent, the trap of the `ssh` shipped with Git, verifying signatures — is
described in the **[Git and GitHub](/setup/git)** guide.

## Handy commands

```bash
gs / gp / gl                          # status, push, log --oneline -20 (CortX aliases)
git commit --amend --no-edit          # add to the last commit
git switch -c <branch>                # create a branch and switch to it
git restore --staged <file>           # unstage
git log --show-signature -1           # check the last commit's signature
```
