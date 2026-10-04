---
description: "Microsoft's terminal, which I keep configured as a fallback."
url: "https://github.com/microsoft/terminal"
status: occasional
kind: app
platforms: [windows]
image: windows_terminal.png
sidebar_position: 2
---

# Windows Terminal

Windows Terminal is Microsoft's modern terminal: tabs, panes, per-shell profiles, fast rendering and themes. It was my
main terminal for a long time. Today [CortX's terminal](/projects/cortx) holds that role, and Windows Terminal stays
installed and configured **as a fallback**: when CortX is not at hand, or to quickly open an admin shell.

## My configuration

- **Default profile**: PowerShell 7, starting in the home folder.
- **Font**: Hack Nerd Font, the same everywhere, for the prompt's and [eza](/tools/dev/cli/eza)'s icons.
- **Look**: a slightly tweaked "One Half Dark" colour scheme, the acrylic effect and a half-transparent background
  image.

Everything is set in the interface (`Ctrl+,`), which writes a `settings.json` file you can also edit by hand or back up.

## Useful shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Shift+T` | new tab |
| `Alt+Shift+D` | duplicate the pane by splitting it |
| `Alt+arrows` | move between panes |
| `Ctrl+Shift+P` | command palette |
