---
origin: installed
category: dev
url: https://desktop.github.com/
description: GUI client for Git and GitHub
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/github_desktop.png
---

# GitHub Desktop

Git is powerful, but its command-line interface was never designed for clarity. **[GitHub Desktop](https://desktop.github.com/)** fills that gap by turning diffs, branches, and history into something you can actually see and navigate.

## The visual advantage

Where `git diff` gives you raw text, GitHub Desktop shows color-coded diffs with context -- side-by-side or unified, your pick. The branch sidebar gives you a clear picture of where every branch stands relative to the remote. The history view lays out commits as a navigable timeline, and you can cherry-pick between branches by dragging commits from one to another.

This visual layer does not replace Git knowledge; it makes it more accessible. You still need to understand what a rebase does, but you no longer need to memorize the flag to amend a commit message -- right-click, edit, done.

## How a typical session goes

You open the app and it already knows something changed -- it watches your working directory. You glance at the diff to make sure everything looks right, uncheck a file you are not ready to include, type a commit message, and hit commit. If you are working on a feature branch, pushing and opening a pull request is two clicks away. When a merge conflict happens, GitHub Desktop walks you through it with a guided flow or lets you jump to your editor to resolve it by hand.

Set your preferred editor in **File > Options > Integrations** and the app becomes a companion to whatever IDE you already use.

## What it does not cover

GitHub Desktop handles the day-to-day: commits, branches, merges, stashing, cherry-picks, and PR creation. But if you need interactive rebase, bisect, or anything involving reflog surgery, you will need to drop into the terminal. That is a reasonable tradeoff -- the operations it supports cover the vast majority of daily workflows, and it handles them with less friction than the CLI.

Download from [desktop.github.com](https://desktop.github.com/download/).
