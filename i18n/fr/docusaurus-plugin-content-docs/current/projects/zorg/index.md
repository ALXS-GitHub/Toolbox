---
sidebar_position: 0
sidebar_label: Présentation
description: Mon organisation perso — tickets, notes, rappels et agenda — sur le web, le bureau, le terminal et claude.ai.
status: active
kind: project
platforms: [web, windows, macos, linux]
stack: [React, Tauri 2, Supabase, Bun]
image: zorg.png
---

# Zorg

Zorg est l'endroit où vit tout ce que j'ai à faire : les tickets de mes projets, mes notes, mes rappels et mon
agenda, rangés par projets. Je voulais un seul outil pour tout ça, que je puisse ouvrir partout — dans le navigateur,
en application de bureau, sur le téléphone — et surtout que mes agents d'IA puissent utiliser aussi bien que moi.
C'est devenu mon projet le plus utilisé au quotidien : c'est par lui que passent les tâches que je confie à
[Claude Code](/setup/claude-code/tickets).

Le dépôt est privé. Cette page et les deux suivantes décrivent comment l'application fonctionne, pas ce qu'elle
contient.

## Ce que fait Zorg

**Les projets.** Tout est rangé par projet, avec une clé courte qui sert aux références des tickets (`ZORG-42`), une
couleur et une icône. Un projet peut avoir des sous-projets, qui partagent par défaut ses statuts, ses étiquettes et
ses versions, ou qui ont leur propre fonctionnement. Un espace global accueille ce qui n'appartient à aucun projet.

**Les tickets.** C'est le cœur de l'application, sur le modèle des issues de GitHub. Chaque projet définit ses
statuts, rangés en quatre catégories (à faire, en cours, bloqué, terminé). Les tickets ont une priorité, une échéance,
des étiquettes, une version, des sous-tickets, des liens entre eux (bloque, lié à, duplique), des commentaires et des
pièces jointes. On les voit en kanban, en liste, en tableau ou par version, avec des filtres, des actions en lot, une
palette de commandes et des raccourcis clavier.

**Les notes.** Des notes en Markdown, rangées en dossiers, reliées entre elles par des liens `[[Titre]]`. Sur la
version de bureau, elles sont aussi recopiées dans un dossier de fichiers `.md` ordinaires, synchronisé dans les deux
sens : je peux les modifier avec n'importe quel éditeur, et Zorg récupère les changements.

**Les rappels et l'agenda.** Des rappels avec plusieurs alertes et une récurrence (quotidienne, hebdomadaire,
mensuelle, annuelle), envoyés même quand l'application est fermée. Un agenda mensuel pour les événements, qui peut
importer en lecture seule celui de Google.

**Plusieurs utilisateurs, sur invitation.** Zorg est pensé pour moi, mais il peut accueillir d'autres personnes :
l'inscription n'est ouverte qu'aux adresses invitées, et un projet peut être partagé avec des rôles (propriétaire,
gestionnaire, éditeur, lecteur). Chaque appareil connecté — navigateur, CLI, connecteur d'IA — a sa propre session,
que je peux révoquer depuis les réglages.

## Quatre façons de l'utiliser

| Surface | Pour quoi |
|---|---|
| **App web** | partout, y compris sur le téléphone en l'installant comme application (PWA) |
| **App de bureau** | Windows, macOS et Linux, avec les notes en fichiers et les notifications natives |
| **CLI `zorg`** | le terminal, et surtout les agents d'IA qui ont un shell |
| **Serveur MCP** | claude.ai sur le web ou le téléphone, qui n'a pas de shell |

Les quatre lisent et écrivent les mêmes données, avec les mêmes droits : ce que je vois dans l'application, un agent
le voit par le CLI. Le fonctionnement est détaillé dans [Architecture](/projects/zorg/architecture) et
[Agents : CLI et MCP](/projects/zorg/agents).

## Le ticket comme point de rencontre avec les agents

Zorg sert de mémoire partagée entre moi et mes agents. Une idée me vient sur le téléphone : je la dicte à Claude sur
claude.ai, qui crée le ticket avec le bon projet et la bonne priorité. Le soir, devant l'ordinateur, je dis à
[Claude Code](/setup/claude-code/tickets) « prends ce ticket » : il lit la description et tous les commentaires, fait
le travail, commite, passe le ticket au statut suivant et laisse un commentaire qui résume ce qu'il a fait et comment
le vérifier.

L'intérêt est double. Je n'ai plus à réexpliquer le contexte à chaque session : il est dans le ticket, et il s'enrichit
à chaque passage. Et j'ai un historique lisible de tout ce qu'un agent a fait sur un projet, ticket par ticket, avec le
commit correspondant. Sur des projets où plusieurs sessions d'agents travaillent en parallèle, c'est aussi ce qui
évite qu'elles se marchent dessus : chacune prend un ticket.

## Où il en est

Zorg en est à la version 0.8 (octobre 2026), avec près de 160 commits depuis juin 2026, et il évolue chaque semaine :
sous-projets, serveur MCP et durcissement de la sécurité sont arrivés début octobre. Je l'utilise tous les jours.
