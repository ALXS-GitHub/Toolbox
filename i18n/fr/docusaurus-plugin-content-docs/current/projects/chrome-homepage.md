---
sidebar_position: 10
description: Une extension qui remplace la page « nouvel onglet » par un tableau de bord personnel.
repo: "https://github.com/ALXS-GitHub/Chrome-Homepage"
status: paused
kind: extension
platforms: [windows, macos, linux]
stack: [React, JavaScript]
image: google_chrome.png
---

# Chrome Homepage

Chrome Homepage remplace la page « nouvel onglet » du navigateur par un tableau de bord personnel : mes liens
favoris, une recherche, et un raccourci vers ce que je venais de chercher. Je l'ai aussi écrite pour apprendre à faire
une extension de navigateur avec React. Elle fonctionne dans [Chrome](/tools/web/browsers/chrome) et dans les
navigateurs basés sur Firefox, comme [Zen](/tools/web/browsers/zen).

![Les réglages des liens : ajout, modification, icônes et réorganisation.](/images/projects/chrome-homepage-settings.png)

## Ce qu'elle fait

Trois pages, accessibles par un menu :

- **Accueil** : une grille de liens, une recherche Google, et mes dix dernières recherches, retrouvées dans
  l'historique du navigateur.
- **YouTube** : la dernière vidéo regardée, avec sa vignette, et les dernières recherches YouTube.
- **GitHub** : mes dépôts, classés par dernière mise à jour, et mes derniers push.

Dans les réglages, on gère les liens (ajout, modification, icône, réorganisation par glisser-déposer), le fond (une
image locale) et les clés des API YouTube et GitHub, nécessaires seulement pour ces deux pages.

## Comment elle est construite

C'est une application React compilée, que le navigateur charge comme une extension. Elle n'a ni serveur ni compte :
tout est stocké dans le navigateur, dans IndexedDB plutôt que dans le stockage des extensions, pour pouvoir garder une
image de fond volumineuse. Elle lit l'historique avec l'API du navigateur, et les seuls appels réseau partent vers
YouTube et GitHub. La politique de sécurité des extensions interdit d'intégrer un lecteur YouTube : la dernière vidéo
s'affiche donc comme une vignette qui ouvre YouTube.

## L'installer

L'extension n'est pas publiée dans les boutiques. On clone [le dépôt](https://github.com/ALXS-GitHub/Chrome-Homepage),
on lance `npm run build`, puis on charge le dossier `chrome-homepage/build` comme extension non empaquetée (le dépôt
explique aussi l'installation dans Firefox et Zen).

## Où il en est

L'essentiel a été écrit fin 2023 et début 2024. L'extension est en pause depuis.
