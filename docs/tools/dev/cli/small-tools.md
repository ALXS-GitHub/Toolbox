---
description: "The small commands that make the terminal nicer, on one page."
status: active
kind: cli
platforms: [windows, macos, linux]
image: icons/toolbox.svg
---

# Small tools

Some commands do not deserve a page each, but I would not do without them. They all install with
[Scoop](/tools/dev/terminal/scoop), are mostly written in Rust, and nicely replace an older tool.

| Tool | For | Replaces |
|---|---|---|
| **bat** | show a file with syntax highlighting, line numbers and git status | `cat` |
| **bottom** (`btm`) | watch CPU, memory, disk, network and processes, as graphs | Task Manager, `top` |
| **dust** | see what takes space in a folder, as a tree | `du` |
| **duf** | each disk's free space, in a readable table | `df` |
| **tokei** | count a project's lines of code, per language | `cloc` |
| **tealdeer** (`tldr`) | concrete examples of a command, rather than its man page | `man` |
| **glow** | read a formatted Markdown file in the terminal | — |
| **hyperfine** | measure and compare commands' run time, with statistics | `time` |
| **sd** | search and replace in files, with a simple syntax | `sed` |
| **fastfetch** | the machine summary (system, CPU, memory) when a terminal opens | `neofetch` |
| **yt-dlp** | download a video or extract the audio from a video site | — |

## A few uses

```powershell
bat src/main.rs                    # read a file, highlighted
dust -d 2                          # the biggest folders, two levels deep
tldr tar                           # "how does it go again…"
hyperfine "rg TODO" "grep -r TODO" # compare two commands
sd "old" "new" src/*.ts            # replace across files
yt-dlp -x --audio-format mp3 <url> # keep only the audio
```

**fastfetch** shows up every time a terminal opens, with a home-made ASCII logo; [CortX](/projects/cortx) runs it with
the rest of the shell initialisation. **hyperfine** is how I check that an optimisation really is one, for instance in
my [Advent of Code](/projects/challenges) solutions.
