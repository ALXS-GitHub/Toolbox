---
sidebar_position: 6
description: Un jeu Roblox de collection de photocards K-pop, développé presque entièrement avec Claude Code.
url: "https://www.roblox.com/games/81917869584715"
status: active
kind: game
platforms: [windows, macos, android, ios]
stack: [Roblox, Luau, Rojo, Claude Code]
image: pack-a-kpop-idol.png
---

# Pack a K-Pop Idol

Pack a K-Pop Idol est un jeu Roblox multijoueur : on ouvre des packs pour collectionner des photocards d'idoles
K-pop, on les expose dans sa base, on les échange avec les autres joueurs et on les fait évoluer. C'est aussi une
expérience de développement : le jeu est écrit presque entièrement **en dialoguant avec
[Claude Code](/tools/ai/coding/claude-code)**, et cette page parle surtout de ça.

Le jeu est [jouable sur Roblox](https://www.roblox.com/games/81917869584715) ; son code est privé.

## Le jeu

On collectionne des cartes de douze raretés, avec des variantes, qu'on expose sur plusieurs étages de sa base. On
peut fusionner des doublons pour monter une carte en étoiles, échanger avec d'autres joueurs (chaque échange est
vérifié par le serveur), et progresser au fil des renaissances. Le contenu évolue presque chaque semaine : nouveaux
groupes, packs de « comeback », événements limités, musiques. Deux styles d'interface coexistent, que chaque joueur
choisit dans ses réglages.

## Développer avec Claude Code

<Diagram
  name="kpop-idol-workflow"
  alt="Un ticket part du gestionnaire de tickets vers Claude Code, qui édite le code Luau ; Rojo le synchronise dans Roblox Studio, où le jeu est testé avant d'être publié. Un tableau local lit les données du jeu publié par Open Cloud."
/>

Au début, l'agent modifiait le jeu directement dans Roblox Studio, à travers un serveur MCP. Ça marchait, mais le code
n'existait que dans le fichier du jeu : pas d'historique lisible, pas d'outils de qualité. Le projet est donc passé à
un fonctionnement **fichiers d'abord** : tout le code vit en fichiers Luau dans un dépôt git, et **Rojo** les
synchronise vers Studio. Le serveur MCP de Studio ne sert plus qu'à ce qui n'est pas du code : la 3D et les assets.

Quelques règles font que ça tient à l'échelle, avec près de mille commits :

- **Une fonctionnalité, un fichier.** Chaque fonctionnalité a son service côté serveur et son contrôleur côté client.
  Les modifications d'un agent restent localisées, faciles à relire, et deux agents se gênent rarement.
- **Un ticket à la fois, dans mon [gestionnaire de tickets](/projects/zorg).** Chaque ticket est un commit qui porte
  sa référence ; plusieurs sessions de Claude Code peuvent travailler en parallèle, avec des règles strictes sur ce
  que chacune a le droit d'ajouter au commit.
- **Des skills propres au projet** : créer un service, un contrôleur, une interface, ajouter un groupe, relire le
  code, publier. L'agent applique ainsi les mêmes conventions à chaque fois.
- **Le serveur fait autorité.** Le client ne décide de rien : le serveur valide chaque action, et une couche unique
  gère toutes les sauvegardes des joueurs.
- **Tester avant de publier.** Le code se teste dans Studio, sur des serveurs locaux ; les essais plus risqués se font
  dans un jeu « bac à sable » séparé, monté avec les mêmes outils, qui peut lire le jeu de référence sans le modifier.

L'interface est écrite avec React Lua, un portage de [React](/tools/dev/web-desktop/react) en Luau. Le code passe par
Selene et StyLua (vérification et mise en forme), et un tableau de bord local en React, qui lit les données du jeu
publié par l'API Open Cloud de Roblox, sert à régler l'équilibrage.

## Ce que l'agent change

Le jeu vit de ses mises à jour : un nouveau groupe, des cartes, un événement, presque chaque semaine. Seul, ce rythme
serait intenable. Avec Claude Code, une mise à jour se décrit en tickets, et l'agent fait le gros du travail : écrire
le service et l'interface, brancher les données, respecter les conventions du projet. Les tâches qui reviennent sont
écrites une fois pour toutes dans des skills : ajouter un groupe, par exemple, enchaîne les fichiers de données, les
textures à préparer dans Studio et l'emplacement dans l'arène, sans rien oublier. Je garde la conception, les tests et
la décision de publier, et un skill de relecture me permet de faire repasser l'agent sur le code avant de valider.

## Où il en est

Le jeu est sorti en février 2026 et en est à sa trentième mise à jour. C'est l'un de mes projets les plus actifs.
