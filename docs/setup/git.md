---
sidebar_position: 3
description: Always-signed commits, an SSH key that never leaves 1Password, and the conventions of my repositories.
image: git.png
---

# Git and GitHub

Two principles drive my [Git](/tools/dev/version-control/git) setup: **every commit is signed**, and **the key lives
nowhere on disk**. Both rely on the same piece, my password manager's SSH agent. This guide shows how it is wired on
Windows, which has a trap or two, then the tools and conventions around it.

<Diagram
  name="git-signing"
  alt="git commit signs with op-ssh-sign and git push goes through Windows OpenSSH; both talk to the 1Password SSH agent, which keeps the key, and the GitHub repository receives verified commits."
/>

## A single key, in 1Password

The same SSH key serves two purposes: authenticating to GitHub to push, and signing commits. It is stored in
1Password, and its SSH agent provides it to programs that ask for it, after an approval (fingerprint, Windows Hello or
password). On a new machine there is therefore no key to copy: install 1Password and turn on its SSH agent.

On Windows, the 1Password agent shows up as a named *pipe*, the same one Windows' own SSH agent uses. You therefore have
to **disable Windows' `ssh-agent` service**, otherwise it takes its place.

## Git configuration

Here is the core of my `~/.gitconfig` (the address and public key are everyone's own):

```ini
[user]
    name = ALXS-GitHub
    email = <address>
    signingkey = <public SSH key>
[gpg]
    format = ssh
[gpg "ssh"]
    program = <path to op-ssh-sign.exe>
[commit]
    gpgsign = true
[core]
    sshCommand = C:/Windows/System32/OpenSSH/ssh.exe
```

**Signing.** `gpg.format = ssh` tells Git to sign with an SSH key rather than GPG, and `commit.gpgsign` makes signing
systematic. Git delegates the operation to `op-ssh-sign`, the small program shipped with 1Password, which asks the
agent for the signature: the private key never goes through Git. With 1Password installed from the Microsoft Store,
that program is an execution alias in `%LOCALAPPDATA%\Microsoft\WindowsApps`.

**Pushing.** Git for Windows ships its own `ssh`, which cannot talk to a Windows named pipe: with it, 1Password's keys
are invisible and pushing fails. `core.sshCommand` forces the OpenSSH that comes with Windows, which does go through
the agent. That is the main trap of this setup.

**On GitHub,** the same public key is declared twice in the account settings: as an authentication key and as a
signing key. GitHub then shows every commit as "verified".

## Verifying a signature locally

Without further settings, `git log --show-signature` complains that `allowedSignersFile` is not configured: Git can sign
with SSH, but to verify it needs a list of trusted keys. Create it once:

```bash
echo "<address> <public SSH key>" > ~/.ssh/allowed_signers
git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
git log --show-signature -1
```

## GitHub CLI and lazygit

For anything GitHub-related without the browser (repositories, pull requests, releases, API), I use
[`gh`](/tools/dev/version-control/github), with no extensions. Agents use it a lot too: it is how Claude Code reads a
pull request or checks a release.

Day to day, most of git goes through [lazygit](/tools/dev/cli/lazygit), started with the `lg` alias or from
[Neovim](/setup/neovim). It keeps its default configuration.

## Commit conventions

Almost all my repositories follow *conventional commits* (`feat(scope): …`, `fix: …`, `docs: …`), in French or English
depending on the project. When the work comes from a ticket, the message carries its reference, which ties the git
history to the tickets in [Zorg](/projects/zorg). Each project's rule is written in its `CLAUDE.md` so that agents
follow it too: some projects ask to commit and push straight to `main` once the build passes, others to always ask.

## Hooks

Shared hooks live in the repository, in a `.githooks` folder, and are turned on once per clone:

```bash
git config core.hooksPath .githooks
```

Two of my repositories have one: my [Claude Code config](/setup/claude-code/guardrails), which blocks any secret leak,
and this website, which checks page metadata and rejects any personal information before publishing.
