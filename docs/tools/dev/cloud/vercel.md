---
description: "Hosting for Zorg's web app and the update relays of my desktop apps."
url: "https://vercel.com/"
status: active
kind: service
platforms: [web]
image: vercel.svg
sidebar_position: 3
---

# Vercel

Vercel hosts sites and server functions from a Git repository: every push triggers a deployment, every branch gets its
preview, and a function is just a file in an `api/` folder. The free tier is more than enough for personal projects.

## Where I use it

- **[Zorg](/projects/zorg)'s web app**: the web version, a [React](/tools/dev/web-desktop/react) +
  [Vite](/tools/dev/web-desktop/vite) PWA, is deployed on Vercel. Its config adds strict security headers (a content
  policy limited to Supabase and the update relay, no framing allowed).
- **The update relays** of Zorg and [PayLedger](/projects/payledger): since their repositories are private, a small
  Vercel function alone holds a read-only token, returns the latest version to the app and serves it the files. The
  token is an environment variable of the Vercel project, and changing it does not require republishing the app (see
  [Tauri app updates](/setup/tauri-updates)).

For [Souvenirs](/projects/souvenirs), the same role is played by a [Cloudflare](/tools/dev/cloud/cloudflare) Worker.
