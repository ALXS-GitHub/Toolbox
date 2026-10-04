---
description: "La base de données de documents de mes projets web en Node."
url: "https://www.mongodb.com/"
status: active
kind: service
platforms: [windows, macos, linux]
image: mongodb.png
sidebar_position: 1
---

# MongoDB

MongoDB stocke des documents JSON plutôt que des lignes dans des tables : chaque enregistrement peut avoir sa propre
forme, ce qui va vite quand le modèle de données évolue en même temps que le projet. C'est la base de mes projets web
avec un backend Node, comme [Spotify Manager](/projects/spotify-manager) et [K-Games](/projects/k-games).

J'installe le serveur, le shell `mongosh` et les outils de sauvegarde (`mongodump`, `mongorestore`) avec
[Scoop](/tools/dev/terminal/scoop), pour développer en local. Pour regarder les données, j'utilise
[Compass](/tools/dev/databases/mongodb-compass) ou l'extension MongoDB de VS Code.

Pour mes projets plus récents, j'ai choisi d'autres bases selon le besoin : PostgreSQL avec
[Supabase](/tools/dev/cloud/supabase) quand il faut synchroniser plusieurs appareils, et SQLite pour les applications
100 % locales comme [PayLedger](/projects/payledger).
