---
description: "Server functions, a SQLite database and file storage, close to users."
url: "https://www.cloudflare.com/developer-platform/"
status: active
kind: service
platforms: [web]
image: cloudflare.svg
sidebar_position: 2
---

# Cloudflare

Beyond its network, Cloudflare offers a developer platform: **Workers** (server code running in their data centres
around the world), **D1** (a hosted SQLite database) and **R2** (file storage with no egress fees). Everything deploys
with the `wrangler` CLI, with a generous free tier.

## Where I use it

It hosts [Souvenirs](/projects/souvenirs): the API runs in a Worker, the data in D1 and the photos in R2. Another Worker
relays updates for the desktop app, whose repository is private (see [Tauri app updates](/setup/tauri-updates)).
