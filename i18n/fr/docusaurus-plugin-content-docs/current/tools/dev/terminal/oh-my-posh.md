---
description: "Le moteur de mon prompt : un thème maison et des palettes interchangeables."
url: "https://ohmyposh.dev/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: oh_my_posh.png
sidebar_position: 3
---

# Oh My Posh

Oh My Posh dessine le prompt du shell à partir d'un thème : une suite de segments (dossier, branche git, version d'un
langage, heure, code de sortie…) qui ne s'affichent que lorsqu'ils ont quelque chose à dire. Il fonctionne avec tous
les shells ; je l'utilise avec [PowerShell](/tools/dev/terminal/powershell).

## Mon thème

J'utilise un thème maison, `alxs`, sur deux lignes : à gauche le shell, les droits d'administrateur, le dossier et l'état
git ; à droite la version de Node et l'heure ; en dessous, le code de sortie de la dernière commande. Le thème ne
contient pas de couleurs en dur : chaque segment fait référence à un nom de couleur, et une **palette** leur donne leur
valeur. J'en ai une vingtaine (Dracula, Nord, Rosé Pine, Tokyo Night…), ce qui permet de changer complètement
d'ambiance sans toucher à la mise en page.

## Changer de thème ou de couleurs

C'est [CortX](/projects/cortx) qui charge Oh My Posh au démarrage du shell, avec le thème et la palette mémorisés.
Deux commandes me permettent d'en changer :

```powershell
omp-theme            # choisir un thème (le mien ou un thème intégré) dans une liste filtrable avec fzf
omp-color            # changer seulement la palette du thème actuel
```

Une police **Nerd Font** est indispensable pour les icônes des segments : j'utilise Hack Nerd Font. Le détail de
l'installation est dans [Le terminal sous Windows](/setup/windows).
