---
sidebar_position: 5
description: Une appli familiale pour partager photos, vidéos et souvenirs, pensée pour durer cent ans.
status: paused
kind: project
platforms: [web, windows, macos, linux]
stack: [Cloudflare Workers, D1, R2, React, Tauri 2]
image: souvenirs.png
---

# Souvenirs

Souvenirs est une application privée, réservée à ma famille, pour partager et garder des photos, des vidéos, des
enregistrements et des textes. Le besoin qui guide tout le projet tient en une phrase : **ces souvenirs doivent encore
être lisibles dans cent ans**. Ça exclut de les confier à un service qui peut fermer ou changer ses conditions, et ça
impose des formats ouverts, plusieurs copies indépendantes et une sortie toujours possible. Il fallait aussi que
l'application soit belle à parcourir, comme une galerie.

Le dépôt et l'application sont privés ; cette page décrit le fonctionnement, jamais le contenu.

## Ce que fait Souvenirs

- **Parcourir** : une page d'accueil animée, une chronologie, une page par année, des albums par événement avec des
  sous-albums, une carte, un diaporama.
- **Ajouter** : glisser-déposer de fichiers ou de dossiers entiers. La date et le lieu sont lus dans les métadonnées
  des photos ; les formats d'iPhone sont convertis pour l'aperçu, mais **l'original est toujours conservé**. Les
  doublons sont détectés, même renommés.
- **Décrire** : des dates plus ou moins précises (« été 1998 »), des lieux, des personnes identifiées, des étiquettes,
  des commentaires de chaque membre, et une recherche plein texte.
- **Partager** : des groupes avec des rôles (administrateur, membre, lecteur), et des invitations par adresse.

## Comment c'est construit

<Diagram
  name="souvenirs-architecture"
  alt="Les appareils de la famille passent par Cloudflare Access, puis par un Worker qui sert le site et l'API ; les métadonnées sont dans D1, les médias dans R2. L'app de bureau fait une copie locale, et une tâche quotidienne sauvegarde la base dans R2."
/>

Tout tourne chez Cloudflare. Un seul **Worker** sert à la fois le site et l'API ; les **métadonnées** sont dans **D1**,
une base SQLite, et les **médias** dans **R2**, un stockage d'objets. Les fichiers y sont rangés par leur empreinte
SHA-256 : c'est ce qui permet de détecter les doublons et de vérifier qu'un fichier n'a pas été altéré. Les envois et
les lectures de médias passent directement entre le navigateur et R2, par des adresses signées valables quelques
minutes, sans transiter par le Worker.

La connexion est confiée à **Cloudflare Access**, placé devant l'application : seules les adresses de la famille
peuvent entrer, avec un code reçu par e-mail ou un compte existant. Le Worker vérifie ensuite l'identité transmise par
Access à chaque requête, et l'application gère les droits par groupe.

On l'utilise depuis le navigateur, y compris sur le téléphone (c'est une PWA), ou avec l'application de bureau
[Tauri](/tools/dev/web-desktop/tauri), dont le rôle principal est de garder une copie locale.

## Les choix, pour durer

**Cloudflare plutôt que Supabase.** Un projet Supabase gratuit peut être mis en pause, voire supprimé, s'il reste
inactif : un risque inacceptable pour des archives familiales. Cloudflare offre aussi un stockage sans frais de
sortie, ce qui garde la possibilité de tout récupérer.

**SQLite pour les métadonnées.** Un seul fichier, dans un format recommandé pour l'archivage à long terme, lisible sans
l'application.

**Plusieurs copies indépendantes.** Les médias sont dans R2 ; chaque nuit, une tâche planifiée y dépose aussi un export
complet de la base ; et l'application de bureau télécharge tout, en fichiers ordinaires, sur un disque de la maison.
Si un jour Cloudflare disparaît, tout est encore là, lisible sans Souvenirs.

**Une connexion déléguée.** Plutôt qu'écrire un système de connexion par lien magique, comme prévu au départ, Access
vérifie l'identité avant même que la requête atteigne l'application, avec la double authentification en prime et la
liste des membres gérée hors du code.

## Où il en est

Souvenirs est en service depuis avril 2026, en version 0.0.7. Il a été construit en quelques semaines, et n'évolue plus
depuis mai : il fait ce qu'on lui demande.
