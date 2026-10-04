---
sidebar_position: 0
sidebar_label: Overview
description: A free app to customise Rocket League on PC, by changing files only, with no injection.
url: "https://alxs-github.github.io/ALXS-RL-Mod/"
repo: "https://github.com/ALXS-GitHub/ALXS-RL-Mod"
status: active
kind: project
platforms: [windows]
stack: [Tauri 2, Rust, React, TypeScript]
image: alxs-rl-mod.png
---

# ALXS-RL-Mod

At the end of April 2026, Rocket League on PC got an anti-cheat (Easy Anti-Cheat). Overnight, BakkesMod — the tool that
made it possible to customise the game by injecting itself into it — had to stop, and with it AlphaConsole, the plugin
that handled almost all custom decals. ALXS-RL-Mod is my answer: a desktop app that brings back most of those
customisations **by changing game files only**, with no injection and nothing touching the network.

The project is free software (GPL-3.0), free of charge, and has its own website in English and French.

![An Octane with a hybrid decal: the decal keeps its colours, some areas take the team colour.](/images/projects/alxs-rl-mod-hybrid-paint.jpg)

## What it does

- **Swap item looks.** You equip an item you own and the game shows another one: wheels, boosts, decals, toppers,
  antennas, goal explosions… The catalogue is read from the installed game's files: new seasons show up without an app
  update.
- **Custom decals**, in the AlphaConsole pack format: "hybrid" decals, which keep their real colours while letting
  some areas take the team colour, and decals that fit every car.
- **A custom ball**, extended **colour palettes**, and **community maps** loaded in place of a training arena.
- **A library of packs** of decals and balls, and **presets** that apply a full loadout in one click and are shared
  with a code.
- **A match tracker**: session, live match, in-game overlay and stats over time, through the game's official stats
  API.
- **Importing** what you had with BakkesMod: maps, AlphaConsole packs, balls.

Everything can be undone: every file touched is backed up, a button restores the original game, and uninstalling
restores the files. After a game update, the app rebuilds everything automatically. The details are in
[Under the hood](/projects/alxs-rl-mod/under-the-hood).

## What it deliberately does not do

Anything that would require injecting code or intercepting the game's traffic is out: fake ranks, titles, name…
That choice keeps the app compatible with the anti-cheat. Changes are only visible to the player. Modifying the game's
files still goes against its terms of service: use it at your own risk, as the website points out.

## Installing it

The Windows installer is on the [releases page](https://github.com/ALXS-GitHub/ALXS-RL-Mod/releases/latest), and the
app then updates itself. The game must be the Epic Games version on PC.

## Before: RL-Designer

![RL-Designer's "Requirements" page: Rocket League, BakkesMod, the AlphaConsole plugin and a ball patch.](/images/projects/rl-designer-requirements.png)

ALXS-RL-Mod has a predecessor, [RL-Designer](https://github.com/ALXS-GitHub/RL-Designer) (2024-2025). It was a decal
manager: a collection, a community catalogue, a 3D preview of the car and one-click install. But it only installed
files for AlphaConsole, which applied them in the game through BakkesMod. When the anti-cheat arrived, RL-Designer had
no engine left. ALXS-RL-Mod applies decals itself, and RL-Designer's catalogue lives on: it is one of the pack sources
of its library.

## Where it stands

First public release at the end of September 2026, version 0.2.4 since, and the project moves fast: downloading the
decryption keys, exact colours and stats over time are ready for the next release.
