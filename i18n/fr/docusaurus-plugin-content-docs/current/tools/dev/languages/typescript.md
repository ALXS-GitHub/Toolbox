---
description: "Le langage de toutes mes interfaces et de mes outils web."
url: "https://www.typescriptlang.org/"
status: active
kind: language
image: typescript.png
sidebar_position: 1
---

# TypeScript

TypeScript ajoute des types à JavaScript, et c'est le langage dans lequel j'écris toutes mes interfaces : les fronts
[React](/tools/dev/web-desktop/react) de [CortX](/projects/cortx), [Zorg](/projects/zorg), [PayLedger](/projects/payledger)
ou [Spotify Manager](/projects/spotify-manager), et des outils complets comme le CLI et le serveur MCP de Zorg.

Les types servent deux fois : ils attrapent les erreurs avant l'exécution, et ils guident les agents. Quand
[Claude Code](/tools/ai/coding/claude-code) modifie un projet typé, `tsc` lui dit immédiatement ce qu'il a cassé ;
c'est pour cela que la vérification des types fait partie de la validation de mes projets avant chaque commit.

Je le fais tourner avec [Bun](/tools/dev/runtimes/bun), [Node](/tools/dev/runtimes/node) ou
[Deno](/tools/dev/runtimes/deno) selon le projet, et je le compile avec [Vite](/tools/dev/web-desktop/vite) côté
interface.
