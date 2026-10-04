---
sidebar_position: 1
sidebar_label: Architecture
description: Un monorepo, quatre clients, une base Supabase avec des règles d'accès par ligne.
---

# Architecture de Zorg

Zorg est un monorepo qui produit quatre clients — l'app web, l'app de bureau, le CLI et le serveur MCP — tous branchés
sur la même base. Il n'y a pas de serveur d'application à moi : les clients parlent directement à
[Supabase](/tools/dev/cloud/supabase), et ce sont les règles d'accès de la base qui décident de ce que chacun peut
lire ou écrire.

<Diagram
  name="zorg-architecture"
  alt="L'app web, le CLI et l'app desktop parlent directement à Postgres avec le jeton de l'utilisateur ; claude.ai passe par le serveur MCP. Realtime, Storage, les rappels et l'import d'agenda gravitent autour de la base ; l'app desktop se met à jour par un relais Vercel qui lit des releases privées."
/>

## Le code

Le dépôt est un monorepo [Bun](/tools/dev/runtimes/bun) :

| Dossier | Contenu |
|---|---|
| `apps/web` | l'application, en [React](/tools/dev/web-desktop/react) 19 et [Vite](/tools/dev/web-desktop/vite), installable en PWA |
| `apps/desktop` | l'application de bureau [Tauri](/tools/dev/web-desktop/tauri) 2, qui embarque la même interface et le CLI |
| `apps/cli` | le CLI `zorg`, compilé en un binaire autonome |
| `apps/mcp` | le serveur MCP, déployé comme une fonction Supabase |
| `packages/core` | le domaine : la liste des entités, leurs schémas, une horloge logique pour dater les écritures |
| `packages/client` | l'accès aux données partagé par le CLI et le serveur MCP |
| `packages/ui` | le design system, construit sur [shadcn/ui](/tools/dev/web-desktop/shadcn) |

## Les données, et qui y a accès

Tout est dans une base Postgres. Chaque client s'y connecte avec le jeton de l'utilisateur connecté, et une
quarantaine de règles d'accès par ligne (RLS) s'appliquent à chaque requête : un ticket n'est visible que si l'on est
membre de son projet, avec un rôle qui permet de le lire ou de le modifier. Comme les règles vivent dans la base,
elles valent pour tout le monde de la même façon, que la requête vienne de l'application, du CLI ou d'un agent.

Les pièces jointes sont dans le stockage de fichiers de Supabase. Les suppressions sont logiques (un champ marque
l'élément comme supprimé), ce qui permet de revenir en arrière.

## En ligne, sans base locale

Zorg a d'abord été conçu « local-first » : chaque appareil gardait une copie complète des données (avec RxDB) et la
synchronisait avec le serveur. Ça n'a pas tenu : la synchronisation ne convergeait jamais tout à fait et relisait
toutes les tables toutes les cinq secondes, même application fermée, au point de représenter l'essentiel du trafic du
projet. J'ai donc tout remplacé par une application en ligne : les données sont lues à la demande et gardées en cache
(TanStack Query), toutes les écritures passent par un point unique, et seules les vues affichées à l'écran reçoivent
les changements en temps réel. C'est plus simple, et beaucoup plus léger.

## Rappels, agenda, notes en fichiers

Les **rappels** sont envoyés par le serveur : une tâche planifiée tourne chaque minute dans la base, cherche les
alertes arrivées à échéance et envoie une notification Web Push aux appareils abonnés. Elles arrivent donc même
application fermée, sur le téléphone comme sur l'ordinateur.

L'**import de Google Agenda** est une fonction serveur qui lit le calendrier principal sur une fenêtre de quelques
mois, à la demande et en lecture seule.

Sur l'app de bureau, les **notes** sont recopiées dans un dossier de fichiers `.md`. Zorg relit ce dossier au
démarrage et le réécrit à chaque changement reçu ; un fichier modifié par un autre éditeur est renvoyé en base.

## L'app de bureau et ses mises à jour

L'app de bureau embarque la même interface que le web, avec une fenêtre sans bordure, des notifications natives et un
accès disque limité au dossier des notes. Elle livre aussi le CLI : l'installeur Windows propose de l'ajouter au
`PATH`, et il se met à jour avec l'application.

Les versions sont construites par GitHub Actions quand je pousse une étiquette : Windows, macOS et Linux, signées, en
release brouillon que je publie à la main. Comme le dépôt est privé, l'application ne peut pas lire ces releases
directement. Elle interroge un petit relais hébergé sur Vercel, qui seul détient un jeton en lecture, lui renvoie la
dernière version et sert les fichiers. La signature des installeurs est vérifiée avant toute mise à jour.
