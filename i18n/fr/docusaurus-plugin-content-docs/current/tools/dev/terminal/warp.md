---
description: Un terminal moderne avec des blocs de commandes — en pause depuis que je suis passé au mien.
url: "https://www.warp.dev/"
status: paused
kind: app
platforms: [windows, macos, linux]
image: warp.png
sidebar_position: 5
---

# Warp

[Warp](https://www.warp.dev/) est un terminal qui repense la ligne de commande : chaque commande et sa sortie forment
un **bloc** qu'on peut sélectionner, copier ou partager, l'édition fonctionne comme dans un éditeur de texte, une
palette donne accès à tout, et un assistant d'IA est intégré. Il a longtemps été mon terminal de tous les jours.

## Pourquoi je ne l'utilise plus en ce moment

Je l'ai remplacé par le terminal intégré à [CortX](/projects/cortx), ma propre application. Ce que j'aimais dans Warp
s'y retrouve — les blocs de commandes, des raccourcis à la Warp, les divisions, une notification quand une longue
commande se termine — avec ce que Warp ne pouvait pas m'offrir : les terminaux vivent à côté de mes projets et de leurs
services, les sessions reviennent comme je les ai laissées, et l'intégration au shell vient du même `cortx init` qui
installe mon prompt et mes alias (voir [Le terminal sous Windows](/setup/windows)).

## Ce qui reste : les thèmes

CortX lit le format de thèmes YAML de Warp : toute la bibliothèque de thèmes de Warp, et les miens, s'importent tels
quels. Un thème Warp est un petit fichier YAML avec les couleurs de fond, de texte et d'accent, les 16 couleurs du
terminal et une image de fond facultative. Une vieille habitude reste valable : ranger ses propres thèmes dans un
sous-dossier du dossier des thèmes, et donner le chemin de l'image relativement à ce sous-dossier.
