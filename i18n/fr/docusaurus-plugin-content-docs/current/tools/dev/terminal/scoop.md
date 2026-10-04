---
description: "Le gestionnaire de paquets par lequel j'installe presque tous mes outils."
url: "https://scoop.sh/"
status: active
kind: cli
platforms: [windows]
image: scoop.jpeg
sidebar_position: 4
---

# Scoop

Scoop installe des programmes en ligne de commande sous Windows, sans droits d'administrateur : chaque outil va dans
son propre dossier du profil utilisateur, et un petit lanceur est ajouté au `PATH`. Presque tous mes outils de
développement passent par lui — les langages, les CLI, Neovim, PowerShell 7 lui-même.

## Pourquoi Scoop

- **Pas de droits administrateur**, pas d'installeur à cliquer, pas de résidu dans le registre.
- **Des mises à jour en une commande** pour tout ce qui est installé.
- **Des versions isolées** : on peut revenir à la précédente si une mise à jour pose problème.
- **Des « buckets »** : des catalogues qu'on ajoute selon ses besoins. J'en utilise quatre : `main`, `extras` (les
  applications), `java` et `supabase`.

## Mon usage

```powershell
scoop install <outil>        # installer
scoop update; scoop update * # mettre à jour Scoop puis tout le reste
scoop cleanup *              # supprimer les anciennes versions
scoop search <nom>           # chercher dans les buckets ajoutés
scoop bucket add extras      # ajouter un catalogue
```

Je ne tiens pas de liste des paquets installés avec Scoop : c'est le rôle de [CortX](/projects/cortx), dont le
registre d'outils note la méthode d'installation de chacun, ce qui sert à remonter une machine.

## L'installer

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```
