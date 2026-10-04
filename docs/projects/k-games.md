---
sidebar_position: 7
description: Multiplayer K-pop music games to play with friends — song duels and blind tests.
status: paused
kind: project
platforms: [windows]
stack: [Tauri 2, React, Rust, Node.js, MongoDB]
image: k_games.png
---

# K-Games

K-Games was born to play K-pop music games with friends, in real time, on a database of songs and artists I built
myself. Over the versions, a progression layer was added as a nod to K-pop culture: experience, a currency and
photocards to collect.

The repository is private, and the app is only shared among friends.

## The games

- **Save One, Drop One**: two music videos face off, and each player votes for the one they keep. A variant pits two
  teams of two against each other.
- **Guess the Song**: a blind test, multiple choice in easy mode, or typing the answer in hard mode. Typos are
  tolerated and artist nicknames accepted: the answer is normalised (accents, punctuation, brackets) then compared with
  an edit distance.
- **Game filters**: artists, period, agency, boy or girl groups, and rules that require, for instance, both videos of
  a duel to come from the same agency or album.

Around the games: a game history, experience and levels, a currency, daily rewards, a photocard pack shop with a
collection sorted by rarity, and a customisable theme.

## How it is built

<Diagram
  name="k-games-architecture"
  alt="Each player runs the desktop app, which talks to the Rust API and to the game server over WebSocket, both on the host's machine with MongoDB; clips come from the embedded YouTube player, and an admin tool imports Spotify playlists."
/>

The game engine is a **WebSocket server** in Node.js: it handles players, rounds, votes and teams, checks answers and
hands out experience. A **REST API in Rust** takes care of the rest: accounts, the song and artist database, cards and
the shop. Both write to **MongoDB**, on the machine of whoever hosts; friends connect to it through a virtual private
network. On the players' side, it is a [Tauri](/tools/dev/web-desktop/tauri) desktop app in
[React](/tools/dev/web-desktop/react).

Two choices come from problems met along the way:

- **YouTube rather than Spotify for music.** Spotify's player requires a Premium subscription for every player and
  cannot share audio. Spotify is therefore only used to fill the database, from a small admin tool that imports whole
  playlists.
- **A desktop app rather than a website.** Served from the host's machine, the web page could not start YouTube videos
  on the other players' side. A desktop app solves it.

## Where it stands

K-Games is at version 0.7. It has been on hold since May 2025; a few ideas remain on the list, such as four-player
modes or a tournament mode.
