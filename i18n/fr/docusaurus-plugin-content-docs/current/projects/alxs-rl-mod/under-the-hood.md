---
sidebar_position: 1
sidebar_label: Sous le capot
description: Comment ALXS-RL-Mod modifie les packages du jeu, et pourquoi tout passe par une seule couche d'écriture.
---

# Sous le capot

Personnaliser un jeu sans y injecter de code oblige à tout faire avec ses fichiers : comprendre leur format, les
reconstruire sans erreur, et pouvoir revenir en arrière à tout moment. Cette page explique comment ALXS-RL-Mod s'y
prend. La documentation de référence (architecture détaillée, rétro-ingénierie des formats, publication) est dans
[le dépôt](https://github.com/ALXS-GitHub/ALXS-RL-Mod).

<Diagram
  name="alxs-rl-mod-architecture"
  alt="L'interface appelle les fonctionnalités par IPC ; toutes passent par la couche d'écriture, seule à réécrire les packages du jeu et à tenir le manifeste des sauvegardes. Les statistiques passent par l'API locale du jeu, les packs sont téléchargés à la demande depuis une liste blanche."
/>

## Une application Tauri

L'interface est en [React](/tools/dev/web-desktop/react) 19 et le cœur en Rust, dans une application
[Tauri](/tools/dev/web-desktop/tauri) 2. Chaque fonctionnalité a son module côté Rust (catalogue, swaps, décals, balle,
palette, cartes, statistiques…) et son dossier côté interface ; elles communiquent par des commandes typées, dont les
réponses sont validées à l'arrivée. L'overlay de match est une seconde fenêtre de la même application. Tout reste sur
la machine : réglages et presets sont des fichiers JSON, sans compte ni serveur.

## Réécrire les packages du jeu

Les objets du jeu sont rangés dans des packages Unreal (`.upk`), compressés et chiffrés. Pour changer l'apparence d'un
item, l'application reconstruit le package concerné : même taille, même structure, mais un contenu différent. Quand il
faut emprunter l'objet d'un autre package, elle le renomme sans changer la longueur du nom, puis le rechiffre avec la
clé de la cible, puisque le jeu choisit la clé d'après le nom du package. Les textures des décals et de la balle sont
placées dans un cache de textures propre à l'application, pour ne pas toucher ceux du jeu.

Les clés de déchiffrement ne sont pas livrées avec l'application. Un bouton télécharge la liste maintenue par la
communauté, et l'application ne garde que les clés qui déchiffrent réellement le package correspondant.

## Une seule couche d'écriture

Aucune fonctionnalité n'écrit directement dans le jeu : toutes passent par la même couche, qui tient un manifeste. Pour
chaque fichier touché, il note l'empreinte SHA-256 d'avant et d'après, et garde une copie de l'original. C'est ce qui
rend tout réversible : la restauration remet les originaux, mais refuse d'écraser un fichier modifié entre-temps par
autre chose. Les écritures sont refusées tant que le jeu tourne, sauf pour les cartes.

## Survivre aux mises à jour du jeu

Une mise à jour du jeu remplace ses fichiers, et avec eux les modifications. Au démarrage, l'application compare
l'empreinte de la version installée à celle qu'elle connaît. Si elle a changé, elle reconstruit toutes les
personnalisations à partir des fichiers d'origine *actuels*, jamais à partir de ses anciennes sauvegardes, qui
correspondent à une autre version du jeu.

## Réseau : le strict nécessaire

L'application ne se connecte qu'à une liste blanche de sources, et seulement quand on le demande : les bibliothèques
de cartes et de packs, la liste des clés. Le suivi de match passe par l'API de statistiques que le jeu expose
lui-même en local. Rien n'est envoyé nulle part.

## Publication

Une étiquette de version déclenche GitHub Actions : l'installeur Windows et une mise à jour signée partent dans une
release brouillon. Une fois la release publiée, les applications installées se mettent à jour d'elles-mêmes. Le site
est un générateur maison qui produit les versions anglaise et française, publié sur GitHub Pages.
