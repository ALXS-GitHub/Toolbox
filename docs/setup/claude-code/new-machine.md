---
sidebar_position: 1
description: Setting the whole harness up again on a new computer, without overwriting anything.
---

# Setting up a new machine

The harness is designed to be set up again quickly: the configuration lives in a git repository, a script plugs it
into Claude Code's folder, and all that is left are the connections to services and the secrets, which are never
versioned. This page follows the order in which I do things on a fresh machine.

## Prerequisites

Before fetching the configuration, the tools it depends on must be there. I install them with
[Scoop](/tools/dev/terminal/scoop), and [CortX](/projects/cortx) keeps the list of what to reinstall.

| Tool | Why |
|---|---|
| [Claude Code](/tools/ai/coding/claude-code) | the agent itself, with its native installer |
| [PowerShell 7](/setup/windows) | the status line and maintenance scripts are written for it |
| [Git](/tools/dev/version-control/git) | the configuration repository |
| A password manager with an SSH agent | commit signing and pushing |
| [Python 3](/tools/dev/languages/python) | the skills' scripts (rendering, checks) |
| A Chromium-based browser | rendering PDFs and PNGs in the background: Edge, built into Windows, is enough |
| [Chrome](/tools/web/browsers/chrome) | browsing driven by the agent (Claude extension, debug port) |
| The CLIs driven by skills | the ticket manager, `gh`, the browsing tool |

## Plugging in the repository

Claude Code's folder already exists after the first sign-in, so the repository cannot be cloned straight into it.
The `setup.ps1` script solves that. Fetch it with a clone into a temporary folder, run it, then delete the clone:

```powershell
git clone git@github.com:<account>/<config-repo>.git "$HOME\config-tmp"
& "$HOME\config-tmp\setup.ps1"
Remove-Item -Recurse -Force "$HOME\config-tmp"
```

The script initialises a git repository in Claude Code's folder, links it to the remote and does a *mixed reset*:
the repository becomes the reference, but no local file is replaced. It then enables the leak-detection hook
(`core.hooksPath`) and prints the differences between the machine and the repository. You then pick, file by file,
what to take with `git checkout -- <file>`. The script is safe to run again.

## Adjusting what depends on the machine

Two settings contain absolute paths: the [status line](/setup/claude-code/statusline) command, which calls
PowerShell 7 by its install path, and the path of the script itself. They need fixing if the user name or the
package manager changes. Everything else is portable.

## Signing in, then secrets

What remains are the connections, which cannot be versioned:

1. sign in to your account in Claude Code;
2. install the Claude extension in [Chrome](/tools/web/browsers/chrome) for [browsing](/setup/claude-code/browser);
3. sign in to each CLI driven by a skill (the ticket manager opens the browser for that);
4. put any secrets back in the user's environment variables, never in a file of the repository.

On the first commit, the [hook](/setup/claude-code/guardrails) checks that nothing personal leaves, and signing goes
through the password manager: if its SSH agent is not running, the commit fails, which is intended.
