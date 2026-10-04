---
description: "Exécuter, installer, tester et empaqueter du TypeScript avec un seul outil, très rapide."
url: "https://bun.sh/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: bun.png
sidebar_position: 2
---

# Bun

Bun remplace à lui seul Node, npm et une partie de l'outillage : il exécute directement le TypeScript, installe les
dépendances en une fraction du temps de npm, et sait compiler un programme en un exécutable autonome.

## Où je l'utilise

[Zorg](/projects/zorg) est un monorepo géré avec Bun : l'application web, le CLI, le serveur MCP et le code partagé
sont des espaces de travail, et une seule commande cible l'un d'eux.

```bash
bun install                              # toutes les dépendances du monorepo
bun --filter @zorg/web typecheck         # une commande dans un seul espace de travail
bun run build
bun build --compile src/cli.ts           # un exécutable autonome
```

C'est ainsi qu'est produit le CLI `zorg` : un seul fichier, sans Node à installer, livré avec l'application de bureau
et que les agents appellent directement.
