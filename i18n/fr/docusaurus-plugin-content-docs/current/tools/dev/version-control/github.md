---
description: "Où vivent mes dépôts, mes releases et mes déploiements — et le CLI gh pour tout faire sans navigateur."
url: "https://github.com/"
status: active
kind: service
platforms: [web, windows, macos, linux]
image: github.png
sidebar_position: 2
---

# GitHub

GitHub héberge tous mes dépôts. La plupart sont **privés** — mes applications personnelles, mes configurations —, et
quelques-uns sont publics : ce site, [CortX](/projects/cortx), le [mod Rocket League](/projects/alxs-rl-mod), mes
[défis de code](/projects/challenges).

## Ce que j'y utilise

- **Les releases** : mes applications de bureau y publient leurs installeurs et leurs mises à jour. Pour les dépôts
  privés, un petit relais sert les mises à jour sans exposer le dépôt (voir
  [Mises à jour des apps Tauri](/setup/tauri-updates)).
- **GitHub Actions** : la compilation des releases, et le déploiement de ce site sur GitHub Pages.
- **GitHub Pages** : l'hébergement de ce site.

## Le CLI `gh`

Pour tout ce qui touche GitHub sans ouvrir le navigateur, j'utilise `gh` : créer un dépôt, ouvrir une pull request,
suivre une compilation, publier une release, ou interroger l'API.

```bash
gh repo create <nom> --private --source . --push
gh pr create --fill                 # pull request à partir des commits
gh run watch                        # suivre la compilation en cours
gh release list
gh api repos/{owner}/{repo}/pages   # n'importe quel appel à l'API
```

C'est aussi l'outil des agents : c'est avec `gh` que [Claude Code](/tools/ai/coding/claude-code) lit une pull request,
vérifie une release ou suit un déploiement.
