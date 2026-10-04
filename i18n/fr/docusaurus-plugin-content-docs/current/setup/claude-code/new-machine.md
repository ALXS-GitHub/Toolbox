---
sidebar_position: 1
description: Remonter tout le harness sur un nouvel ordinateur, sans rien écraser.
---

# Installer sur une nouvelle machine

Le harness est conçu pour se remonter vite : la configuration est dans un dépôt git, un script la branche sur le
dossier de Claude Code, et il ne reste ensuite que les connexions aux services et les secrets, qui ne sont jamais
versionnés. Cette page suit l'ordre dans lequel je fais les choses sur une machine neuve.

## Les prérequis

Avant de récupérer la configuration, il faut les outils dont elle dépend. Je les installe avec
[Scoop](/tools/dev/terminal/scoop), et c'est [CortX](/projects/cortx) qui tient la liste de ce qu'il faut
réinstaller.

| Outil | Pourquoi |
|---|---|
| Claude Code | l'agent lui-même, avec son installateur natif |
| PowerShell 7 | la statusline et les scripts d'entretien sont écrits pour lui |
| Git | le dépôt de configuration |
| Un gestionnaire de mots de passe avec agent SSH | la signature des commits et le push |
| Python 3 | les scripts des skills (rendu, contrôles) |
| Chrome ou Edge | le rendu des PDF et des PNG, et la navigation pilotée |
| Les CLI pilotés par les skills | le gestionnaire de tickets, `gh`, l'outil de navigation |

## Brancher le dépôt

Le dossier de Claude Code existe déjà après la première connexion : on ne peut pas y cloner le dépôt directement.
Le script `setup.ps1` règle ce problème. On le récupère avec un clone dans un dossier temporaire, on le lance, puis
on supprime le clone :

```powershell
git clone git@github.com:<compte>/<dépôt-de-config>.git "$HOME\config-tmp"
& "$HOME\config-tmp\setup.ps1"
Remove-Item -Recurse -Force "$HOME\config-tmp"
```

Le script initialise un dépôt git dans le dossier de Claude Code, le relie au dépôt distant et fait un *reset
mixte* : le dépôt devient la référence, mais aucun fichier local n'est remplacé. Il active ensuite le hook
anti-fuite (`core.hooksPath`) et affiche les différences entre la machine et le dépôt. On choisit alors fichier par
fichier ce qu'on reprend, avec `git checkout -- <fichier>`. Le script peut être relancé sans risque.

## Adapter ce qui dépend de la machine

Deux réglages contiennent des chemins absolus : la commande de la [statusline](/setup/claude-code/statusline), qui
appelle PowerShell 7 par son chemin d'installation, et le chemin du script lui-même. Ils sont à corriger si le nom
d'utilisateur ou le gestionnaire de paquets change. Le reste est portable.

## Se connecter, puis les secrets

Il reste les connexions, qui ne se versionnent pas :

1. se connecter à son compte dans Claude Code ;
2. installer l'extension Claude dans Chrome pour la [navigation](/setup/claude-code/browser) ;
3. se connecter dans chaque CLI piloté par un skill (le gestionnaire de tickets ouvre le navigateur pour ça) ;
4. remettre les secrets éventuels dans les variables d'environnement de l'utilisateur, jamais dans un fichier du
   dépôt.

Au premier commit, le [hook](/setup/claude-code/guardrails) vérifie que rien de personnel ne part, et la signature
passe par le gestionnaire de mots de passe : si l'agent SSH n'est pas actif, le commit échoue, ce qui est voulu.
