---
description: "Un ls lisible : icônes, dossiers d'abord, état git, vue en arbre."
url: "https://eza.rocks/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: eza.png
---

# eza

eza remplace `ls` (et le `Get-ChildItem` de PowerShell) par une liste qu'on lit d'un coup d'œil : des couleurs par type
de fichier, des icônes, les dossiers en premier, et l'état git de chaque fichier. C'est le successeur maintenu par la
communauté d'exa, qui n'est plus mis à jour.

## Mon usage

Je ne tape jamais `eza` directement : quatre alias, générés par [CortX](/projects/cortx) pour tous mes shells, le
remplacent.

| Alias | Commande | Pour |
|---|---|---|
| `ls` | `eza --icons --group-directories-first` | la liste de base |
| `ll` | … `-la` | le détail : droits, tailles, dates, état git |
| `la` | … `-a` | avec les fichiers cachés |
| `lt` | … `--tree --level=2` | un arbre sur deux niveaux |

Dans la vue détaillée, chaque fichier porte un repère git (nouveau, modifié, ignoré) : un `ll` sert souvent de mini
`git status`. Et `lt` donne exactement la profondeur qu'il faut pour comprendre l'organisation d'un projet ; avec
`--git-ignore`, il saute les dossiers comme `node_modules`.

Les icônes demandent une **Nerd Font** dans le terminal.

## Ce qu'il remplace

Le module PowerShell Terminal-Icons, que j'utilisais pour avoir des icônes avec `Get-ChildItem`, et la commande `tree`.
