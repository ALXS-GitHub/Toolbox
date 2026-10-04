---
description: "Un vrai Linux dans Windows."
url: "https://learn.microsoft.com/windows/wsl/"
status: paused
kind: app
platforms: [windows]
image: wsl.png
sidebar_position: 6
---

# WSL

WSL (Windows Subsystem for Linux) fait tourner une vraie distribution Linux dans Windows, avec un noyau Linux complet,
démarrée en une seconde et intégrée au système : on lance des commandes Linux depuis Windows, on ouvre les fichiers
d'un côté comme de l'autre, et VS Code travaille directement dedans.

Je l'ai beaucoup utilisé, avec mes propres fichiers de configuration bash (prompt, alias, complétion). Je ne m'en sers
plus en ce moment : tous mes outils tournent nativement sous Windows avec
[PowerShell](/tools/dev/terminal/powershell), et [CortX](/projects/cortx) génère les mêmes alias pour bash si j'y
reviens.

```powershell
wsl --install            # installe WSL et Ubuntu
wsl                      # ouvrir le shell Linux
```
