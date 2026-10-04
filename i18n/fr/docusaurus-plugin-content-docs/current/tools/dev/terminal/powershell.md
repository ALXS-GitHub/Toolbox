---
description: "Le shell de tous mes terminaux, en version 7."
url: "https://github.com/PowerShell/PowerShell"
status: active
kind: cli
platforms: [windows, macos, linux]
image: powershell.png
sidebar_position: 1
---

# PowerShell

PowerShell est le shell de tous mes terminaux sous Windows. J'utilise **PowerShell 7** (le projet open source,
multiplateforme), installé avec [Scoop](/tools/dev/terminal/scoop), et plus du tout le Windows PowerShell 5.1 livré
avec le système. La différence n'est pas qu'une question de version : PowerShell 7 est plus rapide, reçoit des
nouveautés, et c'est la version que visent mes scripts.

## Pourquoi PowerShell plutôt que bash

Sous Windows, PowerShell est le shell natif : il parle directement au système, et sa force est de faire circuler des
**objets** plutôt que du texte. `Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU` filtre et trie des processus
sans jamais découper une chaîne. Pour le reste, j'ai les réflexes Unix grâce aux alias que génère
[CortX](/projects/cortx) (`ls`, `which`, `touch`, `less`…).

## Mon usage

Mon profil est presque vide : il charge un fichier de configuration qui règle PSReadLine (édition à la Emacs,
suggestions tirées de l'historique), puis exécute `cortx init powershell`, qui installe le prompt, les alias et les
intégrations des outils. Toute la chaîne est décrite dans [Le terminal sous Windows](/setup/windows).

Deux réflexes utiles au quotidien :

```powershell
Ctrl+R                     # recherche dans l'historique
Ctrl+H                     # (mon raccourci) suggestions en liste ou en ligne
```

## Ce qu'il remplace

Windows PowerShell 5.1, toujours présent sur le système mais que je n'ouvre plus, et l'invite de commandes `cmd`.
