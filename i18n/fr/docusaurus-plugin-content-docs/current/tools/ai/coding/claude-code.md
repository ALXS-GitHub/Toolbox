---
description: "L'agent de code d'Anthropic, dans le terminal : il lit le projet, modifie le code, lance les commandes et commite."
url: "https://www.anthropic.com/claude-code"
status: active
kind: cli
platforms: [windows, macos, linux]
image: claude.png
sidebar_position: 1
---

# Claude Code

Claude Code est l'agent de code d'Anthropic. Il tourne dans le terminal (et dans VS Code), à l'intérieur d'un projet :
il lit les fichiers, cherche dans le code, modifie ce qu'il faut, lance les commandes — tests, build, git — et vérifie
le résultat. On lui décrit ce qu'on veut en langage naturel, et il travaille jusqu'à ce que ce soit fait, en montrant
chaque action. C'est l'outil avec lequel je développe la quasi-totalité de mes projets.

## Ce qu'il sait faire

- **Travailler sur un vrai projet** : il explore le dépôt, comprend son organisation, et applique les conventions qu'on
  lui décrit dans un fichier `CLAUDE.md` à la racine.
- **Agir sur la machine** : lancer des commandes, lire leurs erreurs, recommencer. Chaque action peut demander une
  confirmation, ou être autorisée une fois pour toutes.
- **Se répartir le travail** : lancer des sous-agents en parallèle, chacun sur une partie de la tâche.
- **S'étendre** : des *skills* (des savoir-faire chargés à la demande), des *hooks* (des actions à certains moments),
  des serveurs MCP et des plugins, une statusline personnalisée, une mémoire par projet.
- **Sortir du terminal** : piloter le navigateur avec l'extension Chrome, ou travailler dans VS Code avec l'extension.

## Mon usage

Je l'installe avec l'installeur natif, qui se met à jour seul, et je me connecte avec mon compte Claude. Je l'ouvre
avec l'alias `cc` dans n'importe quel projet, et je lui confie aussi bien une correction rapide qu'une fonctionnalité
entière ou un ticket de [Zorg](/projects/zorg). Il me répond en français, avec un niveau de réflexion élevé par
défaut.

Autour de lui, j'ai construit tout un environnement : des réglages et consignes versionnés, des skills qui produisent
des documents et des schémas soignés, des garde-fous contre les fuites, l'intégration avec mon gestionnaire de tickets.
C'est décrit en détail dans la section **[Mon harness Claude Code](/setup/claude-code)**.

## L'installer

```powershell
irm https://claude.ai/install.ps1 | iex     # Windows
claude                                     # dans un projet, puis se connecter
```
