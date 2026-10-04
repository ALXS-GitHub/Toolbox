---
description: "Le terminal de Microsoft, que je garde configuré en secours."
url: "https://github.com/microsoft/terminal"
status: occasional
kind: app
platforms: [windows]
image: windows_terminal.png
sidebar_position: 2
---

# Windows Terminal

Windows Terminal est le terminal moderne de Microsoft : onglets, panneaux, profils par shell, rendu rapide et thèmes.
Il a été longtemps mon terminal principal. Aujourd'hui, c'est le [terminal de CortX](/projects/cortx) qui tient ce
rôle, et Windows Terminal reste installé et configuré **en secours** : quand je n'ai pas CortX sous la main, ou pour
ouvrir rapidement un shell d'administration.

## Ma configuration

- **Profil par défaut** : PowerShell 7, qui démarre dans le dossier personnel.
- **Police** : Hack Nerd Font, la même que partout, pour les icônes du prompt et d'[eza](/tools/dev/cli/eza).
- **Apparence** : un schéma de couleurs « One Half Dark » légèrement retouché, l'effet acrylique et une image de fond
  à demi transparente.

Tout se règle dans l'interface (`Ctrl+,`), qui écrit un fichier `settings.json` qu'on peut aussi éditer à la main ou
sauvegarder.

## Raccourcis utiles

| Raccourci | Action |
|---|---|
| `Ctrl+Shift+T` | nouvel onglet |
| `Alt+Shift+D` | dupliquer le panneau en le divisant |
| `Alt+flèches` | passer d'un panneau à l'autre |
| `Ctrl+Shift+P` | palette de commandes |
