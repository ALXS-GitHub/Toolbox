---
sidebar_position: 0
sidebar_label: Présentation
description: Une appli gratuite pour personnaliser Rocket League sur PC, en modifiant seulement des fichiers, sans injection.
url: "https://alxs-github.github.io/ALXS-RL-Mod/"
repo: "https://github.com/ALXS-GitHub/ALXS-RL-Mod"
status: active
kind: project
platforms: [windows]
stack: [Tauri 2, Rust, React, TypeScript]
image: alxs-rl-mod.png
---

# ALXS-RL-Mod

Fin avril 2026, Rocket League sur PC a reçu un anti-triche (Easy Anti-Cheat). Du jour au lendemain, BakkesMod — l'outil
qui permettait de personnaliser le jeu en s'injectant dedans — a dû s'arrêter, et avec lui AlphaConsole, le plugin qui
gérait presque tous les décals personnalisés. ALXS-RL-Mod est ma réponse : une application de bureau qui redonne
l'essentiel de ces personnalisations **en modifiant uniquement des fichiers du jeu**, sans injection, sans toucher au
réseau.

Le projet est libre (GPL-3.0), gratuit, et a son propre site, en anglais et en français.

![Une Octane avec un décal hybride : les couleurs du décal sont conservées, certaines zones prennent la couleur de l'équipe.](/images/projects/alxs-rl-mod-hybrid-paint.jpg)

## Ce qu'il permet

- **Changer l'apparence d'items.** On équipe un item qu'on possède et le jeu en affiche un autre : roues, boosts,
  décals, chapeaux, antennes, explosions de but… Le catalogue est lu dans les fichiers du jeu installé : les nouvelles
  saisons apparaissent sans mise à jour de l'application.
- **Des décals personnalisés**, au format des packs AlphaConsole : des décals « hybrides », qui gardent leurs vraies
  couleurs tout en laissant certaines zones prendre la couleur de l'équipe, et des décals valables pour toutes les
  voitures.
- **Une balle personnalisée**, **des palettes de couleurs** élargies, et **des cartes de la communauté** chargées à la
  place d'une arène d'entraînement.
- **Une bibliothèque de packs** de décals et de balles, des **presets** qui appliquent une tenue complète en un clic
  et se partagent par un code.
- **Un suivi de match** : session, match en direct, overlay en jeu et statistiques dans le temps, grâce à l'API de
  statistiques officielle du jeu.
- **L'import** de ce qu'on avait avec BakkesMod : cartes, packs AlphaConsole, balles.

Tout est réversible : chaque fichier touché est sauvegardé, un bouton remet le jeu d'origine, et la désinstallation
restaure les fichiers. Après une mise à jour du jeu, l'application reconstruit tout automatiquement. Le détail est
dans [Sous le capot](/projects/alxs-rl-mod/under-the-hood).

## Ce qu'il ne fait pas, volontairement

Tout ce qui demanderait d'injecter du code ou d'intercepter le trafic du jeu est exclu : faux rangs, titres, pseudo…
Ce choix garde l'application compatible avec l'anti-triche. Les modifications ne sont visibles que par le joueur
lui-même. Modifier les fichiers du jeu reste contraire à ses conditions d'utilisation : on l'utilise à ses risques,
comme le rappelle le site.

## L'installer

L'installeur Windows est sur la [page des releases](https://github.com/ALXS-GitHub/ALXS-RL-Mod/releases/latest), et
l'application se met ensuite à jour toute seule. Le jeu doit être la version Epic Games sur PC.

## Avant : RL-Designer

![La page « Requirements » de RL-Designer : Rocket League, BakkesMod, le plugin AlphaConsole et un patch pour les balles.](/images/projects/rl-designer-requirements.png)

ALXS-RL-Mod a un prédécesseur, [RL-Designer](https://github.com/ALXS-GitHub/RL-Designer) (2024-2025). C'était un
gestionnaire de décals : une collection, un catalogue communautaire, un aperçu 3D de la voiture et l'installation en
un clic. Mais il ne faisait qu'installer des fichiers pour AlphaConsole, qui les appliquait dans le jeu à travers
BakkesMod. Quand l'anti-triche est arrivé, RL-Designer n'avait plus de moteur. ALXS-RL-Mod applique les décals
lui-même, et le catalogue de RL-Designer continue de servir : c'est l'une des sources de packs de sa bibliothèque.

## Où il en est

Première version publique fin septembre 2026, version 0.2.4 depuis, et le projet avance vite : téléchargement des clés
de déchiffrement, couleurs exactes et statistiques dans le temps sont prêts pour la prochaine version.
