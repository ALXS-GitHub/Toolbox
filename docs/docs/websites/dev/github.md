---
origin: web
category: web
url: https://github.com/
description: Code hosting platform for version control and collaboration
use_state: active
sidebar_custom_props:
    image: /images/github_website.png
---

# GitHub (Website)

**[GitHub](https://github.com/)** is the largest code hosting platform in the world, built on top of the Git version control system. It is where most open-source projects live, and it provides the collaboration layer -- pull requests, issues, code reviews, CI/CD, and more -- that turns Git repositories into team workflows. This page covers the platform and its web features. For CLI usage, see the [GitHub CLI](/docs/dev/tools/github) documentation.

## Core platform features

### Repositories

A repository is the fundamental unit on GitHub. It holds your code, commit history, branches, tags, and configuration. Repositories can be public (visible to everyone, forkable) or private (restricted access). Each repo includes a README rendered on the landing page, a license file, and optionally contributing guidelines and issue templates.

### Pull Requests

Pull requests (PRs) are how changes get reviewed and merged. You push a branch, open a PR against a base branch, and collaborators can leave inline comments, request changes, or approve. PRs integrate with status checks so you can require that tests pass before merging. Merge strategies include merge commit, squash, and rebase.

### Issues and Discussions

Issues track bugs, feature requests, and tasks. They support labels, milestones, assignees, and project boards for organization. Discussions (available per-repo) provide a forum-style space for open-ended conversations, Q&A, and announcements -- less structured than issues, more persistent than chat.

### GitHub Actions

Actions is GitHub's built-in CI/CD platform. Workflows are defined in YAML files under `.github/workflows/` and trigger on events like pushes, pull requests, schedules, or manual dispatch. The marketplace offers thousands of pre-built actions for common tasks (checkout, setup Node/Python/Rust, deploy to cloud providers, publish packages). You get 2,000 free minutes/month on the free plan.

### GitHub Packages

A package registry integrated directly into repositories. Supports npm, Maven, Docker, NuGet, and RubyGems. Useful for publishing private packages within an organization or distributing Docker images alongside the source code that builds them.

### Codespaces

Cloud-based development environments that spin up a full VS Code instance (or JetBrains IDE) connected to a container configured by your repository's `devcontainer.json`. Eliminates "works on my machine" problems and lets you contribute to a project without any local setup. Free-tier users get 120 core-hours/month.

### GitHub Copilot

AI-powered code assistant integrated into editors and the GitHub web interface. Copilot suggests code completions, explains code, generates tests, and helps with PR reviews. Available as part of paid plans or free for verified students and open-source maintainers.

## GitHub Pages

GitHub Pages lets you host static websites directly from a repository, for free. Point it at a branch (or a `/docs` folder), and your site is live at `username.github.io/repo-name`. It supports custom domains and HTTPS. Common uses include project documentation (many Docusaurus/MkDocs sites are hosted this way), personal portfolios, and blogs built with Jekyll or other static site generators.

## Profile README

You can create a special repository named after your username (e.g., `username/username`) and its `README.md` will display on your GitHub profile page. People use this to showcase skills, pinned projects, contribution stats, and social links. A well-crafted profile README acts as a developer portfolio landing page.

## GitHub Student Developer Pack

Students with a verified `.edu` email get free access to a bundle of tools and services: GitHub Pro (unlimited private repos, advanced features), free domain names, cloud credits (Azure, DigitalOcean, Heroku), JetBrains IDEs, and dozens of other offers. It is one of the best deals in tech education and worth signing up for if you are eligible. Apply at [education.github.com](https://education.github.com/).

## Useful shortcuts

GitHub has keyboard shortcuts throughout the web interface. Press `?` on any page to see the available shortcuts for that context. A few broadly useful ones:

| Shortcut | Action                          |
| -------- | ------------------------------- |
| `.`      | Open repo in github.dev editor  |
| `t`      | Activate file finder in a repo  |
| `s` / `/`| Focus the search bar            |
| `g n`    | Go to notifications             |
| `g d`    | Go to dashboard                 |

## See also

- [GitHub CLI](/docs/dev/tools/github) -- command-line interface for managing PRs, issues, repos, and Actions from the terminal.
- [Git](/docs/dev/tools/cmd/git) -- the underlying version control system that GitHub is built on.
