---
description: "Where my repositories, releases and deployments live — and the gh CLI to do it all without a browser."
url: "https://github.com/"
status: active
kind: service
platforms: [web, windows, macos, linux]
image: github.png
sidebar_position: 2
---

# GitHub

GitHub hosts all my repositories. Most are **private** — my personal applications, my configurations — and a few are
public: this site, [CortX](/projects/cortx), the [Rocket League mod](/projects/alxs-rl-mod), my
[coding challenges](/projects/challenges).

## What I use there

- **Releases**: my desktop apps publish their installers and updates there. For private repositories, a small relay
  serves updates without exposing the repository (see [Tauri app updates](/setup/tauri-updates)).
- **GitHub Actions**: building releases, and deploying this site to GitHub Pages.
- **GitHub Pages**: hosting this site.

## The `gh` CLI

For anything GitHub-related without opening the browser, I use `gh`: create a repository, open a pull request, follow a
build, publish a release, or query the API.

```bash
gh repo create <name> --private --source . --push
gh pr create --fill                 # pull request from the commits
gh run watch                        # follow the running build
gh release list
gh api repos/{owner}/{repo}/pages   # any API call
```

It is the agents' tool too: [Claude Code](/tools/ai/coding/claude-code) uses `gh` to read a pull request, check a
release or follow a deployment.
