---
description: "The reference JavaScript engine, in its LTS version."
url: "https://nodejs.org/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: node.png
sidebar_position: 1
---

# Node.js

Node.js runs JavaScript outside the browser. It is the reference engine, the one the whole ecosystem is compatible with:
I use it for projects that depend on it ([Spotify Manager](/projects/spotify-manager)'s Express backend, Docusaurus
sites such as this one) and for tools installed with `npm`.

I install the **LTS** version with [Scoop](/tools/dev/terminal/scoop), which updates it with the rest. nvm-windows is
installed too, in case a project requires a specific version, but I almost never need it.

For new projects I often prefer [Bun](/tools/dev/runtimes/bun), faster and more complete.
