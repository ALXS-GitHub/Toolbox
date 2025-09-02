---
origin: web
category: dev
url: https://www.github.com/
description: Web-based version control platform
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/github.png
---

# GitHub

**[GitHub](https://www.github.com/)** is a web platform built around the Git distributed version control system. It hosts repositories, enables collaboration (issues, pull requests, reviews), provides automation (Actions), and offers an ecosystem of integrations. While Git handles your local history and versioning, GitHub layers discovery, team workflows, permissions, and services on top of that. Day‑to‑day interaction still happens mostly through the [`git`](/docs/dev/tools/cmd/git) command line; GitHub is the remote hub.

## What it is used for

You use [Git](/docs/dev/tools/cmd/git) locally to create commits and branches; you use GitHub to share those commits, collaborate with others, review code changes, discuss issues, manage project boards, publish releases, automate CI/CD, and host documentation or static sites (Pages). A typical flow: clone a repository, create a branch, commit changes, push the branch to GitHub, open a pull request, receive feedback through code review, and merge when approved. All of this relies on the underlying [Git](/docs/dev/tools/cmd/git) operations.

## Relationship with Git

GitHub does not replace Git, it *hosts* Git repositories and augments them. Every push/pull is just Git talking to a remote (named `origin` by default). Concepts like commits, branches, tags, remotes originate from Git; pull requests, issues, Actions workflows originate from GitHub. If you understand Git, GitHub becomes a set of collaboration features exposed via a web UI and an API.

## Basic usage (high level)

1. Create or fork a repository on GitHub.
2. Clone it locally using SSH or HTTPS.
3. Create a feature branch, make and commit changes, then push.
4. Open a Pull Request (PR) on GitHub to propose merging your branch.
5. Discuss, review, address comments, and merge. Optionally delete the branch.

After merge you pull the updated main branch locally. Most of these steps are executed with [Git](/docs/dev/tools/cmd/git), with the browser providing the collaboration UI.

## Windows setup & SSH configuration

Using SSH is preferred over HTTPS because it avoids entering credentials repeatedly and supports strong key‑based authentication.

The official instructions to generate your SSH key can be found in the [GitHub documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### 1. Ensure OpenSSH is available

Recent Windows 10/11 versions include an OpenSSH client. Confirm in PowerShell:
```powershell
ssh -V
```

### 2. Generate an SSH key (Ed25519 recommended)

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Accept the default path (`~/.ssh/id_ed25519`) and optionally add a passphrase (recommended, but not required). This creates a private key (`id_ed25519`) and a public key (`id_ed25519.pub`). Keep the private key secret.

You can still use rsa keys if you prefer, just change the key type in the command (check [GitHub docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)).

### 3. Start the ssh-agent and add the key

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE/.ssh/id_ed25519
```

If you used a passphrase you will be prompted once per session.

### 4. Add the public key to GitHub

Copy the public key contents:
```powershell
Get-Content $env:USERPROFILE/.ssh/id_ed25519.pub | Set-Clipboard
```

In GitHub: Settings > SSH and GPG keys > New SSH key. Paste, save.

### 5. Test the connection

```powershell
ssh -T git@github.com
```
You should see a message greeting your username (the first time you may be asked to trust GitHub's host key).

### 6. Set your Git identity (used in commits pushed to GitHub)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```
These values appear in commit metadata displayed on GitHub. (Full details on configuration live in the [Git](/docs/dev/tools/cmd/git) page.)

### 7. Clone using SSH

```powershell
git clone git@github.com:owner/repo.git
```
Now standard Git commands (`git status`, `git add`, `git commit`, `git push`) interact with the GitHub remote.

## Pull requests, issues, and reviews (brief)

Issues track tasks, bugs, or ideas. Branches isolate changes. A Pull Request compares your branch to a base branch (often `main`), providing a place for conversation, inline comments, automated checks (Actions), and approval. Once merged, the branch history integrates into the base. Tags or releases can then mark versioned milestones, with release assets attached.

## Automation & CI/CD (overview)

GitHub Actions runs workflows defined in `.github/workflows/*.yml`. Workflows trigger on pushes, pull requests, schedules, or manual dispatch. They enable building, testing, linting, packaging, and deploying, all using the repository’s code. While powerful, authoring workflows still depends on understanding Git states (branches, refs, commit SHAs) which is why mastery of [Git](/docs/dev/tools/cmd/git) remains fundamental.

## Security & access

Access is controlled with repository visibility (public/private) and collaborator or organization team permissions. Branch protection rules can require reviews, passing checks, signed commits, or linear history. For local signing you can use GPG or SSH commit signing; keys and preferences are managed in GitHub settings.

## When to leave the browser

For merging complicated conflicts, rewriting history (interactive rebase, squashing, splitting commits), or large refactors, you drop back to the local Git CLI then push updated branches. GitHub reflects whatever DAG (commit graph) you publish.

## Summary

GitHub centralizes collaboration around Git repositories: host code, discuss, review, automate, release. Almost every meaningful action ultimately invokes or depends upon fundamental [Git](/docs/dev/tools/cmd/git) operations, so learning Git deeply multiplies your leverage on the platform. SSH setup ensures secure, frictionless pushes and pulls; once configured you mostly live in your editor + terminal, using the web UI for coordination.