---
sidebar_position: 3
description: Two lines under the prompt to know where I am and what the session uses.
image: icons/panel-bottom.svg
---

# Status line

The status line is the bar Claude Code shows under the prompt. By default it is almost empty; mine answers two
questions at a glance: *where am I, and with what?* on the first line, *how much is it using?* on the second.

![The status line on a sample project: folder, branch, model, effort, context and cost, then quotas, duration, changed lines and cache.](/images/setup/statusline.png)

## What it shows

The first line places the session: the current folder, the git branch with the number of changed files and how far
ahead or behind the remote it is, the worktree and the pull request if any, the model, the effort level (one colour
per level) and the agent's name when a subagent is working. It ends with the context usage, as a bar and in tokens,
and the session cost.

The second line is about consumption: the 5-hour and 7-day quotas with their reset time, the session duration, the
lines added and removed, and the prompt cache state (warm or cold, with its hit ratio).

Colours follow simple thresholds: green under 50%, yellow up to 75%, orange up to 90%, red beyond. When the context
turns orange, it is time to finish the current task or start again from a clean session.

## How it works

Claude Code runs the command declared in `statusLine` and sends it the session state as JSON on standard input:
folder, model, effort, cost, context window, quotas, pull request, cache. The script only has to read that JSON and
print two coloured lines. It is written in [PowerShell 7](/setup/windows); in the real setting, `pwsh` and the script are given by their
full path so as not to depend on the current shell (paths are shortened here):

```json
"statusLine": {
  "type": "command",
  "command": "pwsh -NoProfile -File ~/.claude/statusline.ps1",
  "padding": 0
}
```

Only the git branch needs real work: the script runs `git status` once and caches the result for five seconds per
folder, so the bar stays instant even when Claude Code redraws it often. Reset dates are printed in French, hence the
"jeu." (Thursday) in the screenshot.
