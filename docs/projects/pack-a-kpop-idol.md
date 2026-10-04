---
sidebar_position: 6
description: A Roblox game about collecting K-pop photocards, built almost entirely with Claude Code.
url: "https://www.roblox.com/games/81917869584715"
status: active
kind: game
platforms: [windows, macos, android, ios]
stack: [Roblox, Luau, Rojo, Claude Code]
image: pack-a-kpop-idol.png
---

# Pack a K-Pop Idol

Pack a K-Pop Idol is a multiplayer Roblox game: you open packs to collect photocards of K-pop idols, show them off in
your base, trade them with other players and level them up. It is also a development experiment: the game is written
almost entirely **by talking with [Claude Code](/tools/ai/coding/claude-code)**, and that is mostly what this page is
about.

The game is [playable on Roblox](https://www.roblox.com/games/81917869584715); its code is private.

## The game

You collect cards in twelve rarities, with variants, and display them on several floors of your base. Duplicates can
be fused to add stars to a card, you can trade with other players (every trade is checked by the server), and you
progress through rebirths. The content changes almost every week: new groups, "comeback" packs, limited events, music.
Two interface styles coexist, and each player picks one in the settings.

## Building it with Claude Code

<Diagram
  name="kpop-idol-workflow"
  alt="A ticket goes from the ticket manager to Claude Code, which edits the Luau code; Rojo syncs it into Roblox Studio, where the game is tested in a dev universe before being published. A local dashboard reads the published game's data through Open Cloud."
/>

At first, the agent edited the game directly inside Roblox Studio, through an MCP server. It worked, but the code only
existed inside the game file: no readable history, no quality tools. The project therefore moved to a **files-first**
workflow: all the code lives as Luau files in a git repository, and **Rojo** syncs them into Studio. The Studio MCP
server is now only used for what is not code: 3D and assets.

A few rules make it hold at scale, with almost a thousand commits:

- **One feature, one file.** Each feature has its service on the server and its controller on the client. An agent's
  changes stay local, easy to review, and two agents rarely get in each other's way.
- **One ticket at a time, in my [ticket manager](/projects/zorg).** Each ticket is a commit carrying its reference;
  several Claude Code sessions can work in parallel, with strict rules about what each one may add to its commit.
- **Project skills**: create a service, a controller, an interface, add a group, review the code, publish. The agent
  thus applies the same conventions every time.
- **The server is the authority.** The client decides nothing: the server validates every action, and a single layer
  handles all player saves.
- **Two universes.** The game is tested in a development universe, with its own data, before being published.

The interface is written with React Lua, a port of [React](/tools/dev/web-desktop/react) to Luau. The code goes through
Selene and StyLua (linting and formatting), and a local React dashboard, which reads the published game's data
through Roblox's Open Cloud API, is used to tune the balance.

## Where it stands

The game came out in February 2026 and is past its thirtieth update. It is one of my most active projects.
