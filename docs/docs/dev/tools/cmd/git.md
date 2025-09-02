---
origin: installed
category: dev
url: https://git-scm.com/
location: C:/Program Files/Git
description: Version control system
use_state: active
rating: 5
os: Windows
sidebar_custom_props:
    image: /images/git.png
---

# Git

**[Git](https://git-scm.com/)** is a distributed version control system created by Linus Torvalds. It lets you track changes to source code, collaborate safely, experiment in isolated branches, and maintain a full local history without relying on a central server. While **[Github](/docs/dev/tools/github)** hosts repositories and adds collaboration features (issues, pull requests, CI), Git itself is a local tool you run on your machine. Understanding Git fundamentals makes every higher‑level platform (GitHub, GitLab, etc.) predictable.

## What Git Does

At its core Git snapshots the state of your project (the content of tracked files) and chains those snapshots (commits) into a directed history. Each commit has an immutable hash (SHA‑1 currently), parents (except the first), metadata (author, date, message) and a tree of file contents. Branches are simply movable pointers to commits. Because every clone contains the entire history and objects, you can work offline and only sync (push/pull) when needed.

## Installation (Windows)

Install Git for Windows from https://git-scm.com/downloads. The installer includes Git Bash, a minimal Unix-like environment. You can also use Git from PowerShell (recommended nowadays). Accept defaults unless you have special needs; choosing the option to add Git to PATH makes it available in any terminal. After installation:

```powershell
git --version
```

## First-Time Configuration

Git needs to know who you are so it can embed correct author and committer metadata into each commit. Set these globally once (stored in your user configuration file). On Windows `~/.gitconfig` can be edited manually or via `git config` commands.

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# The following are optional and in most cases the default for git nowadays

# Optional but recommended on Windows to avoid line-ending churn
git config --global core.autocrlf true   # Converts LF->CRLF on checkout, CRLF->LF on commit

# Show colored output
git config --global color.ui auto

# Choose your default branch name for new repos (GitHub defaults to main)
git config --global init.defaultBranch main
```

View your configuration:
```powershell
git config --list --show-origin
```

You can also add an SSH key for authenticating with **[Github](/docs/dev/tools/github)**; see that page for detailed steps.

## Core Concepts Quickly

Working Directory (your files) → Staging Area (index) → Commit (snapshot). You explicitly stage changes you want included, then commit them with a message. Remotes (e.g. `origin`) are other copies of the repository; you push commits to share them and pull/fetch to bring new commits locally.

## Creating or Cloning a Repository

```powershell
# Create a new repository
mkdir <your_repo>; cd <your_repo>
git init # Create empty repo
echo "Hello" > README.md
git add README.md # Stage file
git commit -m "Initial commit"

# Clone existing repository
git clone git@github.com:<owner>/<project>.git
```

## Everyday Workflow Example

```powershell
git pull # Update local main from remote (fast-forward if possible)
...edit files...
git status # See changed / staged files
git add . # Stage all modifications
git commit -m "Add X feature" # Create commit with message
git push -u origin feature/x # Publish branch upstream (first time sets upstream)
```

## Inspecting State

```powershell
git status # What changed, staged vs unstaged, branch ahead/behind info
git diff # Diff unstaged changes
git diff --cached # Diff staged changes
git log --oneline --graph --decorate --all # Visual commit graph
git show <commit> # Inspect a single commit
```

## Amending & Undoing

```powershell
git commit --amend # Change last commit message / add staged changes
git restore <file> # Discard working copy changes (not staged)
git restore --staged <file> # Unstage a file
git reset --hard HEAD~1 # Danger: move branch pointer & working tree to previous commit
git revert <commit> # Create a new commit that reverses target commit
```

## Branching & Merging

Branches enable isolated development. Merging integrates histories.

```powershell
git branch # List branches (current marked with *)
git switch feature/x # Move to existing branch
git switch -c bugfix/y # Create and switch
git merge feature/x # Merge named branch into current
git rebase main # Replay current branch commits atop main (linear history)
```

`git switch` was introduced in version 2.23, and is now the preferred way to create and switch branches. But `git checkout` is still widely used and works for both tasks. Here is an example of using `git checkout`:

```powershell
git checkout feature/x # Move to existing branch
git checkout -b bugfix/y # Create and move to a new branch
```

Prefer merge for shared branches already pushed; use rebase before pushing to keep a clean linear series. If conflicts arise Git marks them inside files; resolve, then `git add` those files and continue (`git merge --continue` or `git rebase --continue`).

## Stashing (Temporary Shelving)

```powershell
git stash push -m "WIP: refactor" # Save current dirty state, clean working dir
git stash list # Show stashes
git stash apply # Reapply most recent (keeps stash)
git stash drop # Remove most recent
```

## Synchronizing with Remotes

```powershell
git fetch # Download new commits/refs, don't merge
git pull # Fetch + merge (or rebase if configured)
git push # Upload local commits to tracking branch
git remote -v # List remote URLs
```

If push is rejected (non fast-forward), pull (maybe with rebase) to integrate upstream changes, then push again.

## Tagging

Tags mark important points (releases):
```powershell
git tag v1.0.0
git push origin v1.0.0 # Push specific tag
git push --tags # Push all tags
```

## Cleaning & Housekeeping

```powershell
git clean -fd # Remove untracked files/dirs (DANGER – irreversible)
git gc # Optimize repository storage
```

## Minimal Cheat Sheet Recap

Status > Add > Commit > Push; Pull before pushing; Branch for features; Merge or Rebase thoughtfully; Use Stash to park changes; Use Log & Diff to inspect; Configure identity in `~/.gitconfig` once.

## Relationship to Github

You interact with GitHub primarily through Git commands: clone, fetch, pull, push, and manage branches. Higher-level collaboration (pull requests, issues, code review) happens in the web UI or via its API/CLI, but the underlying unit of change is a Git commit/branch. See **[Github](/docs/dev/tools/github)** for host‑specific topics like SSH key setup and pull request flow.

Mastering these fundamentals ensures you can work confidently even when graphical tools abstract them away.