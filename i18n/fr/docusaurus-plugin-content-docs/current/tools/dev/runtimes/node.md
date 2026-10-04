---
description: "Le moteur JavaScript de référence, en version LTS."
url: "https://nodejs.org/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: node.png
sidebar_position: 1
---

# Node.js

Node.js exécute du JavaScript hors du navigateur. C'est le moteur de référence, celui avec lequel tout l'écosystème est
compatible : je l'utilise pour les projets qui en dépendent (le backend Express de
[Spotify Manager](/projects/spotify-manager), les sites Docusaurus comme celui-ci) et pour les outils
installés avec `npm`.

J'installe la version **LTS** avec [Scoop](/tools/dev/terminal/scoop), qui la met à jour avec le reste. nvm-windows est
aussi installé, pour le cas où un projet exigerait une version précise, mais je n'en ai presque jamais besoin.

Pour mes nouveaux projets, je préfère souvent [Bun](/tools/dev/runtimes/bun), plus rapide et plus complet.
