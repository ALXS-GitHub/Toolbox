---
description: Directory jumper based on frecency
url: "https://github.com/badmotorfinger/z"
status: archived
replaced_by: zoxide
kind: cli
platforms: [windows]
image: z.png
---

:::warning Replaced
This tool has been replaced by [zoxide](../../tools/dev/cli/zoxide.md), which is faster, cross-shell, and actively maintained. The content below is kept for reference.
:::

# z

`z` lets you jump to any directory you have visited before by typing a few characters instead of a full path.

```powershell
Install-Module -Name z -AllowClobber
```

Add `Import-Module z` to your `$PROFILE` and you are done. There is nothing else to configure -- just use `cd` normally for a while and `z` builds its database in the background.

Once it has learned a few paths, you can jump around like this: `z projects` takes you to whichever directory matching "projects" you visit most, `z desk prog` narrows it down to something like `Desktop/Programmes` by matching both terms, and `z -l projects` lists all matches ranked by score if you want to see what it would pick. Partial matches work fine too -- `z down` will land you in `Downloads` without typing the rest.

The ranking algorithm combines how often and how recently you visit a directory (a portmanteau the authors call "frecency"). Paths you use every day stay at the top; paths you have not touched in weeks quietly fade. The result is that `z` almost always guesses right on the first try, and the more you use it the better it gets. It is the PowerShell equivalent of the original Bash `z.sh` and pairs well with [fzf](../../tools/dev/cli/fzf.md) if you want interactive selection on top.
