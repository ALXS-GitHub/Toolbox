---
description: "Le langage de Roblox, écrit dans VS Code et synchronisé dans Studio."
url: "https://luau.org/"
status: active
kind: language
image: luau.svg
sidebar_position: 5
---

# Luau

Luau est le langage des jeux Roblox : un dérivé de Lua, rapide, avec un système de types progressif. C'est le
langage de mon jeu [Pack a K-Pop Idol](/projects/pack-a-kpop-idol).

Je ne l'écris pas dans Roblox Studio mais dans [VS Code](/tools/dev/editors/vscode), comme du code ordinaire, dans un
dépôt git. Une chaîne d'outils fait le lien :

| Outil | Rôle |
|---|---|
| **Rokit** | installe les autres outils, à une version fixée par projet |
| **Rojo** | synchronise les fichiers du disque vers Studio |
| **Wally** | gère les paquets |
| **Selene**, **StyLua** | vérifient et formatent le code |
| **Luau LSP** | complétion et types dans l'éditeur |

Cette organisation permet aussi à [Claude Code](/tools/ai/coding/claude-code) de travailler sur le jeu comme sur
n'importe quel projet. Le détail est dans le guide **[Développer sur Roblox](/setup/roblox)**.
