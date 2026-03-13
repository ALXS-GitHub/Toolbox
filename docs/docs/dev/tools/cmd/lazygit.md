---
origin: installed
category: dev
url: https://github.com/jesseduffield/lazygit
description: Terminal UI for git commands
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/lazygit.png
---

# lazygit

## Git without the headache

If you have ever found yourself staring at a terminal trying to remember whether it is `git rebase -i HEAD~3` or `git rebase -i HEAD~4`, or fumbled through a merge conflict wondering which side is "ours," lazygit exists to make all of that disappear. It wraps the full power of Git in a terminal interface you can actually navigate, and once you get used to it, going back to raw Git commands feels like writing assembly.

Install it with Scoop and launch it from any repository:

```powershell
scoop install lazygit
lazygit
```

## The layout

When lazygit opens, your terminal splits into a set of panels arranged side by side. On the left you get a vertical stack: **Status** at the top showing your current branch and sync state, then **Files** listing everything that has changed, then **Branches**, **Commits**, and **Stash** below that. The right side is a live preview pane that updates as you move through items -- select a file and you see its diff, select a commit and you see what it changed.

You move between panels with `Tab` (or the number keys `1` through `5` for direct access) and scroll within a panel using `j`/`k` or the arrow keys. Press `?` inside any panel to see every shortcut available in that context. That last one is worth remembering -- it is the only shortcut you truly need to memorize because it teaches you the rest.

## Staging and committing

The workflow you will use most often starts in the Files panel. Each changed file is listed with its status, and you press `Space` to toggle a file between staged and unstaged. If you want to stage everything at once, `a` does the job. Once your staging area looks right, press `c` to open a commit message editor right inside the TUI. Type your message, hit `Enter`, and the commit is done.

What makes this better than the command line is the preview pane. As you move through files, you see exactly what changed before you decide to stage it. No more `git diff`, then `git add`, then `git diff --cached` to double-check -- it is all visible in one glance.

After committing, `P` pushes to your remote and `p` pulls. Capital letter pushes, lowercase pulls -- an easy mnemonic.

## Interactive rebasing

This is where lazygit truly shines. Navigate to the **Commits** panel and you see your full commit history. Press `e` on any commit to begin an interactive rebase from that point. The commits below it become editable, and now you can:

- Press `s` on a commit to **squash** it into the one above.
- Press `r` to **reword** a commit message.
- Press `d` to **drop** a commit entirely.
- Drag commits up and down to **reorder** them.

When you are satisfied, press `m` to continue the rebase. The entire operation that normally requires careful text editing in `git rebase -i` becomes a visual, reversible process. And if something goes wrong, `z` undoes the last action -- including rebases and commits. That undo capability alone is worth the install.

## Resolving merge conflicts

When a merge or rebase produces conflicts, the conflicted files show up in the Files panel with a clear marker. Press `Enter` on a conflicted file to open the built-in merge editor, which displays both sides of the conflict. Use the arrow keys to pick the left or right version for each hunk, or drop into manual editing if neither side is exactly what you want.

This replaces the usual dance of opening files, searching for `<<<<<<<` markers, manually editing, then running `git add` -- lazygit handles marking the file as resolved once you have made your choices.

## Making it yours

lazygit reads its configuration from `~/.config/lazygit/config.yml`, where you can customize keybindings, colors, and behavior. It also integrates with editors through plugins -- there are first-class integrations for Neovim, VS Code, and others, so you can pop open lazygit without leaving your editing session.

One last thing: lazygit is fast. It does not shell out to Git for every operation the way you might expect; it keeps things responsive even in large repositories. For the small investment of learning a few keybindings, you get a Git workflow that is faster, safer (thanks to `z` undo), and far less error-prone than the command line alone.
