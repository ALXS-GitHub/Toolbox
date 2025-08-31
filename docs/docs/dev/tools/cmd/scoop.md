---
type: downloaded
category: dev
location: ~\scoop
description: gestionnaire de paquets pour Windows
state: actual
---

# Scoop

scoop est un gestionnaire de paquets pour Windows.

## Installation

```bash
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
iwr -useb get.scoop.sh | iex
```

## Utilisation

```bash
scoop install <nom_de_l_application> # pour installer une application
scoop update <nom_de_l_application> # pour mettre à jour
scoop uninstall <nom_de_l_application> # pour désinstaller
scoop list # pour afficher les applications téléchargées
```

## Applications utiles

Mes applications téléchargées au `14/01/2025`

```bash
7zip    22.01        main   2023-03-15 18:28:41
curl    7.88.1_2     main   2023-03-15 18:28:43
fd      9.0.0        main   2023-12-20 21:18:38
fzf     0.44.1       main   2023-12-18 15:00:30
jq      1.6          main   2023-03-15 18:28:44
lazygit 0.40.2       extras 2023-12-20 21:20:33
llvm    19.1.6       main   2024-12-22 15:08:08
neovim  0.10.2       main   2024-12-17 13:26:08
nvm     1.1.10       main   2023-03-15 21:16:44
ripgrep 14.0.3       main   2023-12-20 21:17:52
sudo    0.2020.01.26 main   2023-03-15 18:28:45
```