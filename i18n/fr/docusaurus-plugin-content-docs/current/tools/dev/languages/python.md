---
description: "Mes scripts du quotidien, et les outils de mes skills Claude."
url: "https://www.python.org/"
status: active
kind: language
image: python.png
sidebar_position: 4
---

# Python

Python est mon langage de script : tout ce qui transforme des fichiers, automatise une tâche ou colle deux outils
ensemble. Je l'utilise rarement pour une application entière, mais très souvent pour les petits programmes qui rendent
service.

## Où je l'utilise

- **Mes scripts globaux**, déclarés dans [CortX](/projects/cortx) : convertir une image, retirer un fond, zipper un
  dossier sans ses dépendances… Chacun déclare ses propres dépendances en tête de fichier, et
  [uv](/tools/dev/runtimes/uv) les installe à la volée : aucun environnement à préparer.
- **Les scripts de mes skills Claude** : le rendu des [schémas](/setup/claude-code/skills) et des documents en PNG ou
  en PDF passe par des scripts Python.
- **Des notebooks Jupyter**, dans [VS Code](/tools/dev/editors/vscode), pour explorer des données.

Python s'installe avec [Scoop](/tools/dev/terminal/scoop), et tout le reste (environnements, dépendances, outils)
passe par uv.
