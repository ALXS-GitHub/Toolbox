---
sidebar_position: 8
description: Ranking my favourite tracks and artists, following how the rankings change, and tidying my Spotify playlists.
status: paused
kind: project
platforms: [windows]
stack: [React, TypeScript, Express, MongoDB]
image: spotify-manager.png
---

# Spotify Manager

Spotify Manager started from a simple wish: keep rankings of my favourite tracks and artists, and see how they change
over time. A second need came next: my listening playlist was getting too big, and I wanted to extract "best of"
sub-playlists from it without risking damage to the main playlists. The app runs locally, connected to my
[Spotify](/tools/web/music/spotify) account.

The repository is private.

## What it does

- **Rankings** of tracks and artists, ordered by drag and drop. Each update is kept as a snapshot: you compare two
  dates, and a timeline shows how ranks evolved.
- **Sub-playlists** synced with Spotify. Only playlists created by the app can be changed: the main playlists are
  protected, server side included.
- **Backups** of playlists, exportable as JSON.
- **Synced lyrics** of the current track, karaoke-style, with Korean romanisation.
- **Artist pages**, recent and upcoming releases, and concerts.
- **A workshop** to match tracks with their official music video, spot duplicates and link the different versions of
  the same recording.

## How it is built

A [React](/tools/dev/web-desktop/react) interface in TypeScript, an Express server on the machine that talks to
Spotify's API, and a local [MongoDB](/tools/dev/databases/mongodb) database. Spotify tokens are encrypted at rest and
refreshed automatically. For enrichment (lyrics, artist pages, news), the app favours sources that need no key.

Two choices avoid matching mistakes: tracks and artists are identified by their Spotify identifier rather than their
name (homonyms are common), and the ISRC — the international identifier of a recording — links the single, album or
regional versions of the same song.

## Where it stands

The project moves in bursts: a rework in December 2025, a new version in spring 2026, and on hold since May.
