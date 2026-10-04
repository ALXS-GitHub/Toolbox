---
description: "L'historique de tous mes projets, avec des commits toujours signés."
url: "https://git-scm.com/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: git.png
sidebar_position: 1
---

# Git

Git garde l'historique de tous mes projets, du plus petit script au monorepo. Je l'utilise surtout à travers
[lazygit](/tools/dev/cli/lazygit), et de plus en plus à travers les agents : [Claude Code](/tools/ai/coding/claude-code)
commite et pousse lui-même quand un projet l'y autorise.

## Mon usage

- **Tous les commits sont signés**, avec une clé SSH conservée dans 1Password : aucune clé sur le disque, et GitHub
  affiche chaque commit comme « vérifié ».
- **Messages au format conventionnel** (`feat(scope): …`, `fix: …`), avec la référence du ticket
  [Zorg](/projects/zorg) quand le travail en vient.
- **Des hooks versionnés** dans le dépôt (`.githooks`), par exemple le contrôle anti-fuite de ce site avant chaque
  commit.

Le câblage complet sous Windows — l'agent SSH de 1Password, le piège du `ssh` fourni avec Git, la vérification des
signatures — est décrit dans le guide **[Git et GitHub](/setup/git)**.

## Raccourcis utiles

```bash
gs / gp / gl                          # status, push, log --oneline -20 (alias CortX)
git commit --amend --no-edit          # ajouter au dernier commit
git switch -c <branche>               # créer une branche et y aller
git restore --staged <fichier>        # désindexer
git log --show-signature -1           # vérifier la signature du dernier commit
```
