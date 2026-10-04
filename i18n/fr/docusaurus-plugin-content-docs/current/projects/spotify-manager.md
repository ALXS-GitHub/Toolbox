---
sidebar_position: 8
description: Classer mes morceaux et artistes préférés, suivre l'évolution des classements et faire le tri dans mes playlists Spotify.
status: paused
kind: project
platforms: [windows]
stack: [React, TypeScript, Express, MongoDB]
image: spotify-manager.png
---

# Spotify Manager

Spotify Manager est parti d'une envie simple : tenir des classements de mes morceaux et de mes artistes préférés, et
voir comment ils évoluent dans le temps. Un deuxième besoin est arrivé ensuite : ma playlist d'écoute devenait trop
grosse, et je voulais en extraire des sous-playlists de « meilleurs titres » sans risquer d'abîmer les playlists
principales. L'application tourne en local, connectée à mon compte [Spotify](/tools/web/music/spotify).

Le dépôt est privé.

## Ce qu'il fait

- **Des classements** de morceaux et d'artistes, qu'on ordonne par glisser-déposer. Chaque mise à jour est gardée
  comme un instantané : on compare deux dates, et une chronologie montre l'évolution des rangs.
- **Des sous-playlists** synchronisées avec Spotify. Seules les playlists créées par l'application peuvent être
  modifiées : les playlists principales sont protégées, y compris côté serveur.
- **Des sauvegardes** des playlists, exportables en JSON.
- **Les paroles synchronisées** du morceau en cours, façon karaoké, avec la romanisation du coréen.
- **Des fiches d'artistes**, les sorties récentes et à venir, et les concerts.
- **Un atelier** pour associer les morceaux à leur clip officiel, repérer les doublons et relier les différentes
  versions d'un même enregistrement.

## Comment c'est construit

Une interface [React](/tools/dev/web-desktop/react) en TypeScript, un serveur Express sur la machine qui fait le lien
avec l'API de Spotify, et une base [MongoDB](/tools/dev/databases/mongodb) locale. Les jetons Spotify sont chiffrés au
repos et renouvelés automatiquement. Pour l'enrichissement (paroles, fiches d'artistes, actualités), l'application
privilégie des sources qui ne demandent pas de clé.

Deux choix évitent les erreurs de rapprochement : les morceaux et artistes sont identifiés par leur identifiant
Spotify plutôt que par leur nom (les homonymes sont nombreux), et l'ISRC — l'identifiant international d'un
enregistrement — relie les versions single, album ou régionales d'un même titre.

## Où il en est

Le projet avance par poussées : une refonte en décembre 2025, une nouvelle version au printemps 2026, et une pause
depuis mai.
