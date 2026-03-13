---
origin: installed
category: dev
url: https://github.com/badmotorfinger/z
description: Directory jumper based on frecency
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/z.png
---

# z

`z` lets you jump to any directory you have visited before by typing a few characters instead of a full path.

```powershell
Install-Module -Name z -AllowClobber
```

Add `Import-Module z` to your `$PROFILE` and you are done. There is nothing else to configure -- just use `cd` normally for a while and `z` builds its database in the background.

Once it has learned a few paths, you can jump around like this: `z projects` takes you to whichever directory matching "projects" you visit most, `z desk prog` narrows it down to something like `Desktop/Programmes` by matching both terms, and `z -l projects` lists all matches ranked by score if you want to see what it would pick. Partial matches work fine too -- `z down` will land you in `Downloads` without typing the rest.

The ranking algorithm combines how often and how recently you visit a directory (a portmanteau the authors call "frecency"). Paths you use every day stay at the top; paths you have not touched in weeks quietly fade. The result is that `z` almost always guesses right on the first try, and the more you use it the better it gets. It is the PowerShell equivalent of the original Bash `z.sh` and pairs well with [fzf](/docs/dev/tools/cmd/fzf) if you want interactive selection on top.
