---
sidebar_position: 11
description: Advent of Code chaque décembre, et un simulateur de particules pour apprendre OpenGL.
status: occasional
kind: project
stack: [Rust, C++, OpenGL]
image: adventofcode.svg
---

# Défis et expériences

Certains projets ne servent à rien d'autre qu'à apprendre : un problème à résoudre chaque jour de décembre, ou une
technique qu'on veut comprendre en la programmant. Les deux dépôts de cette page sont publics.

## Advent of Code

[Advent of Code](https://adventofcode.com) propose chaque décembre un problème par jour, en deux parties.
[Mon dépôt](https://github.com/ALXS-GitHub/Advent-Of-Code) rassemble mes solutions, presque toutes en
[Rust](/tools/dev/languages/rust) : les éditions 2015, 2016, 2017, 2024 et 2025 sont complètes, 2023 a été faite en
[C++](/tools/dev/languages/cpp), et quelques autres années sont commencées.

Chaque jour est un petit projet Rust généré à partir d'un modèle : on lance chaque partie séparément avec son temps
d'exécution, des tests vérifient l'exemple de l'énoncé, et des benchmarks mesurent les solutions. Les temps sont
reportés dans le README de chaque année.

Je me suis fixé une règle sur l'IA, écrite en tête du dépôt : les assistants peuvent m'aider sur la technique (une
syntaxe, une erreur, une fonction du langage), **jamais sur la logique** ni sur l'algorithme. Pas de complétion de code
pendant que j'écris une solution : la résolution doit rester la mienne, sinon l'exercice perd son intérêt.

## Particles Simulator

![Le simulateur : des milliers de sphères dans un conteneur, rendues en OpenGL.](/images/projects/particles-simulator.jpg)

[Particles Simulator](https://github.com/ALXS-GitHub/Particles-Simulator) est né pour apprendre OpenGL et la
simulation physique. Des milliers de sphères tombent et s'entrechoquent dans un cube ou une sphère ; on peut en
ajouter, les attirer vers le centre, les attraper à la souris, et construire des « molécules » : des groupes de
particules reliées par des contraintes, comme une corde suspendue.

La physique utilise l'**intégration de Verlet** : on déduit la vitesse de la position précédente, ce qui rend les
contraintes faciles à imposer, avec plusieurs sous-étapes par image pour la stabilité. Pour ne pas tester toutes les
paires de particules, une **grille spatiale** range chaque particule dans une case et ne compare que les cases
voisines, en parallèle avec OpenMP. Côté rendu, chaque particule est un simple point que le *geometry shader*
transforme en sphère à l'écran. Le projet est en C++17 ; un portage en Rust a été commencé.

Le simulateur est en pause depuis septembre 2024.
