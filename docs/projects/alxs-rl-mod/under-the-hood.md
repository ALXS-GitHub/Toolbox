---
sidebar_position: 1
sidebar_label: Under the hood
description: How ALXS-RL-Mod rewrites the game's packages, and why everything goes through a single writer layer.
---

# Under the hood

Customising a game without injecting code means doing everything with its files: understanding their format,
rebuilding them without mistakes, and being able to go back at any time. This page explains how ALXS-RL-Mod does it.
The reference documentation (detailed architecture, reverse engineering of the formats, releasing) is in
[the repository](https://github.com/ALXS-GitHub/ALXS-RL-Mod).

<Diagram
  name="alxs-rl-mod-architecture"
  alt="The interface calls the features over IPC; all of them go through the writer layer, the only one that rewrites the game's packages and keeps the backup manifest. Stats come from the game's local API, packs are downloaded on demand from an allow-list."
/>

## A Tauri app

The interface is in [React](/tools/dev/web-desktop/react) 19 and the core in Rust, in a
[Tauri](/tools/dev/web-desktop/tauri) 2 app. Each feature has its module on the Rust side (catalogue, swaps, decals,
ball, palette, maps, stats…) and its folder in the interface; they talk through typed commands whose responses are
validated on arrival. The match overlay is a second window of the same app. Everything stays on the machine: settings
and presets are JSON files, with no account and no server.

## Rewriting the game's packages

The game's objects are stored in Unreal packages (`.upk`), compressed and encrypted. To change an item's look, the app
rebuilds the package concerned: same size, same structure, different content. When it has to borrow an object from
another package, it renames it without changing the name's length, then re-encrypts it with the target's key, since
the game picks the key from the package name. Decal and ball textures go into a texture cache of the app's own, so the
game's are left alone.

Decryption keys are not shipped with the app. A button downloads the list maintained by the community, and the app
only keeps the keys that actually decrypt the matching package.

## A single writer layer

No feature writes straight into the game: all of them go through the same layer, which keeps a manifest. For every file
touched, it records the SHA-256 hash before and after, and keeps a copy of the original. That is what makes everything
reversible: restoring puts the originals back, but refuses to overwrite a file changed in the meantime by something
else. Writes are refused while the game is running, except for maps.

## Surviving game updates

A game update replaces its files, and the changes with them. At start-up, the app compares the installed version's
fingerprint with the one it knows. If it has changed, it rebuilds every customisation from the *current* original
files, never from its old backups, which belong to another version of the game.

## Network: the bare minimum

The app only connects to an allow-list of sources, and only when asked: the map and pack libraries, the key list. The
match tracker uses the stats API the game itself exposes locally. Nothing is sent anywhere.

## Releasing

A version tag triggers GitHub Actions: the Windows installer and a signed update go into a draft release. Once the
release is published, installed apps update themselves (see [Tauri app updates](/setup/tauri-updates)). The website is built by a small home-made generator that
produces the English and French versions, published on GitHub Pages.
