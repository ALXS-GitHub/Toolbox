---
sidebar_position: 2
description: PowerShell 7, an almost empty profile, and CortX generating the rest — prompt, aliases, integrations.
---

# The terminal on Windows

My terminal environment fits in very few files. The PowerShell profile does almost nothing itself: it hands over to
[CortX](/projects/cortx), which generates at start-up everything that shapes the shell — the prompt, the aliases, the
tool integrations. The same set of aliases thus exists for PowerShell, bash, zsh and fish, and I only change it in one
place.

<Diagram
  name="windows-shell"
  alt="$PROFILE loads user_profile.ps1, which runs cortx init powershell; the generated script sets up the prompt, aliases and functions, zoxide and the CortX terminal integration."
/>

## PowerShell 7

I use **PowerShell 7**, installed with [Scoop](/tools/dev/terminal/scoop), and no longer Windows PowerShell 5.1, which
does not even have a profile. Version 7 is cross-platform, faster, and it is what my scripts target — Claude Code's
[status line](/setup/claude-code/statusline) included.

## The profile chain

The file PowerShell loads (`$PROFILE`, in `Documents\PowerShell`) contains a single line: it loads
`~\.config\powershell\user_profile.ps1` if it exists. That second file lives in a small private config repository,
with my prompt themes and scripts. It sets what is specific to PowerShell, then hands over to CortX:

```powershell
# ~\.config\powershell\user_profile.ps1 (excerpts)
[Console]::OutputEncoding = [Text.Encoding]::UTF8
Set-PSReadLineOption -EditMode Emacs -BellStyle None
Set-PSReadLineOption -PredictionSource History -PredictionViewStyle ListView   # if the console supports it
Set-PSReadLineKeyHandler -Key Ctrl+h -ScriptBlock { Switch-HistoryMode }      # list ↔ inline suggestion

& cortx init powershell | Out-String | Invoke-Expression
```

PSReadLine prediction suggests commands from history while typing. It is only turned on when the console can display
it: in a script, or when an agent starts PowerShell, it would cause errors.

## What CortX generates

`cortx init powershell` produces, every time a terminal opens, a complete script from the configuration I manage in
CortX:

- **the prompt**: posh-git, then [Oh My Posh](/tools/dev/terminal/oh-my-posh) with my theme and its colour palette;
- **[zoxide](/tools/dev/cli/zoxide)**, for the `z` and `zi` commands;
- **aliases and functions** (table below);
- **the CortX terminal integration**: when the shell runs in that terminal, it reports the current folder and the
  start and end of each command, which lets the terminal show commands as blocks and notify when long ones finish. It
  only turns on in that terminal.

| Alias | Role |
|---|---|
| `ls`, `ll`, `la`, `lt` | [eza](/tools/dev/cli/eza): icons, folders first; long listing, hidden files, tree |
| `y` | [yazi](/tools/dev/cli/yazi), then move to the last folder visited |
| `lg` | [lazygit](/tools/dev/cli/lazygit) |
| `gs`, `gp`, `gl` | `git status`, `git push`, `git log --oneline -20` |
| `vim` | [Neovim](/setup/neovim) |
| `c` | open the folder in VS Code |
| `cc` | [Claude Code](/setup/claude-code) without confirmation prompts |
| `dc`, `py` | `docker compose`, `python` |
| `which`, `touch`, `less` | their Unix equivalents |
| `omp-theme`, `omp-color` | switch prompt theme, or only the palette |

### Themes and palettes

My prompt theme separates layout from colours: segments (folder, git branch, Node version, time, exit code) refer to
colour names, and a **palette** gives them their values. I have about twenty (Dracula, Nord, Rosé Pine, Tokyo
Night…). `omp-theme` picks a theme from a filterable list, `omp-color` only changes the palette, and the choice is
remembered for the next terminals.

### Scripts available everywhere

My small scripts — converting an image, removing a background, printing a tree, zipping a folder with exclusions — are
declared in CortX as global scripts. Written in Python, they run with [uv](/tools/dev/runtimes/uv), with no
environment to prepare, and start with `cortx <script>` from any folder. `cortx my_help` prints the cheat sheet of my
commands and shortcuts.

## The terminal

My terminal is **the one in [CortX](/projects/cortx)**, which I wrote to replace [Warp](/archive/dev/warp): tabs in a
sidebar, commands shown as blocks, suggestions from history, a notification when a long command finishes, and sessions
that come back as I left them, each tab in its folder. It uses the Hack Nerd Font and a dark theme matching my prompt's
palette. [Windows Terminal](/tools/dev/terminal/windows-terminal) stays configured as a fallback (PowerShell 7 by
default, same font).

## On a new machine

1. Install Scoop, then PowerShell 7, Git, CortX and the command-line tools.
2. Clone the config repository into `~\.config\powershell`.
3. Write the line that loads `user_profile.ps1` into `$PROFILE`.
4. Restore CortX's data (its git backup): aliases and scripts come back with it.

The inventory of tools to reinstall is kept by CortX itself, with each one's install method.
