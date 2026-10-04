---
sidebar_position: 9
description: Mon site vitrine, en 3D, qui présente mes projets et renvoie vers cette Toolbox.
url: "https://alxs-github.github.io/Portfolio/"
status: paused
kind: project
platforms: [web]
stack: [React, three.js, Tailwind, Deno]
image: portfolio.png
---

# Portfolio

Mon [portfolio](https://alxs-github.github.io/Portfolio/) est un site vitrine, plus vivant qu'un CV : il présente mes
projets, mes compétences et les moyens de me contacter, avec beaucoup de 3D. Il renvoie vers cette Toolbox, qui en est
le complément détaillé.

## Ce qu'on y trouve

- **L'accueil** : une sphère 3D animée par un shader maison, un fond animé, un bandeau de compétences qu'on fait
  défiler à la souris.
- **Les projets** : mes dépôts publics, chargés en direct depuis l'API de GitHub, affichés comme des bulles qui
  flottent en apesanteur, ou en liste filtrable. Certains projets ont une page sur mesure.
- **Le contact** : des cubes à logos qu'on attrape et qu'on lance, et un formulaire.
- **Les réglages** : la 3D, le curseur et les animations se désactivent, pour les machines modestes et les téléphones.

## Comment c'est construit

C'est un site statique, sans serveur : [React](/tools/dev/web-desktop/react) 19 et TypeScript, la 3D avec three.js et
React Three Fiber (physique comprise, pour les bulles et les cubes), les animations avec Framer Motion et GSAP, et
Tailwind pour le style. J'en ai aussi fait un terrain d'essai : il est construit avec [Deno](/tools/dev/runtimes/deno)
et une version expérimentale de [Vite](/tools/dev/web-desktop/vite), avec le compilateur de React, pour voir ce que
ces outils donnent sur un vrai projet.

Le déploiement est automatique : un push sur la branche `release` lance GitHub Actions, qui construit le site et le
publie sur GitHub Pages. Le code du site est privé.

## Où il en est

Le site a été mis en ligne en octobre 2025, puis refondu en mai 2026. Il est en pause depuis.
