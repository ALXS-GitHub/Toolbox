---
sidebar_position: 7
description: Des jeux musicaux K-pop en multijoueur, pour jouer entre amis — duels de chansons et blind tests.
status: paused
kind: project
platforms: [windows]
stack: [Tauri 2, React, Rust, Node.js, MongoDB]
image: k_games.png
---

# K-Games

K-Games est né pour jouer entre amis à des jeux musicaux autour de la K-pop, en temps réel, sur une base de chansons
et d'artistes que j'ai construite moi-même. Au fil des versions, une couche de progression s'y est ajoutée, en clin
d'œil à la culture K-pop : de l'expérience, une monnaie et des photocards à collectionner.

Le dépôt est privé, et l'application ne se distribue qu'entre amis.

## Les jeux

- **Save One, Drop One** : deux clips s'affrontent, chaque joueur vote pour celui qu'il garde. Une variante oppose deux
  équipes de deux.
- **Guess the Song** : un blind test, en choix multiples en mode facile, ou en tapant la réponse en mode difficile.
  Les fautes de frappe sont tolérées et les surnoms d'artistes acceptés : la réponse est normalisée (accents,
  ponctuation, parenthèses) puis comparée par une distance d'édition.
- **Des filtres de partie** : artistes, période, agence, groupes de garçons ou de filles, et des règles qui imposent
  par exemple que les deux clips d'un duel viennent de la même agence ou du même album.

Autour des jeux : un historique des parties, de l'expérience et des niveaux, une monnaie, des récompenses
quotidiennes, une boutique de packs de photocards avec une collection triée par rareté, et un thème personnalisable.

## Comment c'est construit

<Diagram
  name="k-games-architecture"
  alt="Chaque joueur lance l'app de bureau, qui parle à l'API Rust et au serveur de partie en WebSocket, tous deux sur la machine de l'hôte avec MongoDB ; les extraits viennent du lecteur YouTube intégré, et un outil d'admin importe des playlists Spotify."
/>

Le moteur des parties est un **serveur WebSocket** en Node.js : il gère les joueurs, les rounds, les votes et les
équipes, vérifie les réponses et distribue l'expérience. Une **API REST en Rust** s'occupe du reste : comptes, base de
chansons et d'artistes, cartes et boutique. Les deux écrivent dans **MongoDB**, sur la machine de celui qui héberge ;
les amis s'y connectent à travers un réseau privé virtuel. Côté joueurs, c'est une application de bureau
[Tauri](/tools/dev/web-desktop/tauri) en [React](/tools/dev/web-desktop/react).

Deux choix viennent de problèmes rencontrés en chemin :

- **YouTube plutôt que Spotify pour la musique.** Le lecteur de Spotify exige un abonnement Premium pour chaque joueur
  et ne permet pas de partager l'audio. Spotify ne sert donc qu'à remplir la base, depuis un petit outil
  d'administration qui importe des playlists entières.
- **Une application de bureau plutôt qu'un site.** Servie depuis la machine de l'hôte, la page web ne parvenait pas à
  lancer les vidéos YouTube chez les autres joueurs. Une application de bureau règle le problème.

## Où il en est

K-Games en est à la version 0.7. Il est en pause depuis mai 2025 ; il reste quelques idées sur la liste, comme des
modes à quatre ou un mode tournoi.
