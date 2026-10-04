---
sidebar_position: 0
sidebar_label: Vue d'ensemble
description: Tout ce qui entoure Claude Code pour en faire mon assistant de tous les jours, et comment les pièces s'assemblent.
---

# Le harness Claude Code

[Claude Code](/tools/ai/coding/claude-code), tel qu'il sort de la boîte, est un agent qui lit du code et lance des commandes. Ce que j'appelle mon
*harness*, c'est tout ce que j'ai construit autour : des réglages, des consignes, des skills qui produisent des
documents et des schémas soignés, quelques mods pour l'interface, des garde-fous, et une façon de tout versionner.
L'ensemble tient dans un seul dossier suivi par git, que je remonte sur une nouvelle machine en quelques minutes.

Cette section décrit ce harness tel qu'il est aujourd'hui. Elle est volontairement générique : les comptes, les
chemins et les identifiants sont remplacés par leur rôle, pour qu'on puisse s'en inspirer sans rien recopier de
personnel.

## Les pièces et leurs liens

Le schéma ci-dessous montre ce que Claude Code charge, ce qu'il pilote sur la machine, et où partent les
fichiers de configuration.

<Diagram
  name="harness-overview"
  alt="Claude Code charge les réglages et les consignes, appelle les skills et les mods, pilote un navigateur et des CLI ; la configuration est poussée sur un dépôt git privé, les skills sont importés sur claude.ai."
/>

Au centre, il y a Claude Code lui-même. Au démarrage d'une session, il charge deux choses : les **réglages**
(`settings.json` : modèle, niveau d'effort, langue, statusline, connecteurs refusés…) et les **consignes**, c'est-à-dire
les fichiers `CLAUDE.md`, global et par projet, auxquels s'ajoute la mémoire qu'il tient d'une session à l'autre. La
**statusline** est un petit script : Claude Code lui transmet l'état de la session en JSON, et il affiche sur deux
lignes le dossier, la branche, le contexte consommé, les quotas et le coût.

Pendant la session, Claude Code s'appuie sur les **skills** : des dossiers d'instructions et de scripts qu'il charge
quand une demande correspond à leur description. Les miens produisent des documents rédigés, des schémas, de petites
documentations et des pages visuelles, et pilotent deux outils en ligne de commande, mon gestionnaire de tickets
([Zorg](/projects/zorg)) et un navigateur. Les skills de production partagent un **design commun** (couleurs, thèmes clair et sombre,
composants) et passent par [Python](/tools/dev/languages/python) et un navigateur sans interface pour produire du HTML, du PDF et des PNG. À côté, des
**mods** ajoutent de l'interface au terminal : un bandeau qui rappelle le ticket en cours, un tableau de bord des
tickets d'un projet.

Toute la configuration vit dans un dépôt [git](/tools/dev/version-control/git) privé. Chaque commit passe par un hook anti-fuite et il est signé. Les
skills utiles hors du terminal sont exportés en zip et importés à la main sur claude.ai : git reste la seule source.

## Les principes

Quelques choix guident l'ensemble ; on les retrouve dans chaque page de cette section.

**Git est la source de vérité.** La configuration est versionnée dans le dossier même de Claude Code, avec un
`.gitignore` en liste blanche : tout est ignoré, sauf ce qui est explicitement autorisé. L'historique, les
transcriptions, les identifiants et les caches ne peuvent donc pas partir par erreur. Ce qui vit ailleurs, sur
claude.ai ou dans les mémoires, est soit une copie, soit volontairement local.

**Les outils en ligne de commande d'abord.** Quand un service a un CLI conçu pour être piloté, avec une sortie
`--json` et une aide écrite pour les agents, Claude Code s'en sert mieux et plus directement que d'un connecteur MCP.
Les connecteurs de claude.ai qui font doublon avec un CLI sont donc refusés dans le terminal ; ceux qui n'ont pas
d'équivalent local, comme la messagerie ou l'agenda, restent disponibles.

**Un résultat soigné, et contrôlé.** Les skills ne se contentent pas de donner des consignes à l'agent : leurs scripts
injectent le design, vérifient le résultat (contrastes, débordements, part de texte rédigé) et refusent de terminer
tant qu'un problème reste. Un document ou un schéma a la même allure d'une fois sur l'autre.

**Des garde-fous plutôt que de la vigilance.** Les règles qui comptent ne reposent ni sur mon attention ni sur celle
de l'agent : elles sont appliquées par des outils. Hook avant chaque commit, signature obligatoire, liste blanche,
et des descriptions de skills qui disent aussi quand *ne pas* se déclencher.

## Ce qui est versionné, et ce qui ne l'est pas

Le partage suit une règle simple : on versionne ce qu'on a écrit soi-même et qu'on voudrait retrouver sur une autre
machine ; tout ce que Claude Code produit ou télécharge reste local.

| Versionné | Reste sur la machine |
|---|---|
| `settings.json` et `CLAUDE.md` global | identifiants et session |
| statusline et scripts d'entretien | historique, transcriptions, mémoire |
| skills, mods et design commun | caches, plugins, fichiers temporaires |
| hook anti-fuite et script d'installation | secrets, dans les variables d'environnement |

Les secrets n'ont jamais leur place dans le dépôt, même privé : le hook refuse d'ailleurs les clés de
`settings.json` faites pour en contenir.

## Un exemple de bout en bout

Quand je demande « fais-moi un rapport sur tel sujet, en PDF », la description du skill `documents` correspond.
Claude Code le charge, lit le modèle de rapport et un exemple, rassemble les faits, puis rédige le document en HTML.
Le script du skill injecte le design commun, numérote les sections, construit le sommaire, vérifie qu'il y a bien du
texte rédigé et pas seulement des tableaux, puis appelle le navigateur sans interface pour produire le PDF. S'il faut un schéma, le skill
`diagrams` le dessine et le document l'intègre comme figure. Je reçois un fichier qui s'ouvre hors ligne, avec la
même mise en page que les précédents.
