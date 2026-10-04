---
sidebar_position: 5
description: Les skills que j'utilise, ce qu'ils produisent, et comment ils savent quand se déclencher.
---

# Les skills

Un skill est un dossier : un fichier `SKILL.md` qui dit à quoi il sert et comment s'y prendre, et à côté, les
scripts, modèles et exemples dont il a besoin. Claude Code ne lit au départ que la *description* de chaque skill ; il
charge le reste seulement quand une demande correspond. C'est ce qui permet d'en avoir beaucoup sans encombrer chaque
session.

## Le catalogue

Mes skills se rangent en deux familles : ceux qui produisent des fichiers soignés, et ceux qui pilotent un outil de
la machine.

| Skill | Se déclenche quand… | Produit |
|---|---|---|
| `documents` | je demande un document, un rapport, une note, un compte rendu ou un PDF | un document rédigé façon Word : page de garde, sommaire, sections numérotées, figures ; HTML et PDF A4 |
| `diagrams` | je demande un schéma, ou de lui-même dès qu'au moins quatre éléments sont reliés | un schéma d'architecture ou de process, HTML autonome et PNG, clair et sombre |
| `doc-site` | je demande une petite documentation de plusieurs pages | une doc avec barre latérale, recherche et mode sombre, en un ou plusieurs fichiers HTML |
| `pages` | je le demande explicitement, et seulement dans ce cas | une page visuelle et interactive pour expliquer ou comparer quelque chose |
| tickets | je nomme mon gestionnaire de tickets ou un ticket | le cycle complet du ticket : lecture, code, commit, statut, commentaire (voir [Tickets et mods](/setup/claude-code/tickets)) |
| navigateur | il faut naviguer sur un site pour moi | des actions dans [Chrome](/tools/web/browsers/chrome), pilotées par un CLI (voir [Le navigateur](/setup/claude-code/browser)) |

Les quatre premiers partagent le même design et la même chaîne de rendu, décrite dans
[La chaîne documentaire](/setup/claude-code/design). Les deux derniers dépendent de CLI installés sur la machine : ils
restent locaux et ne sont pas envoyés sur claude.ai.

## Lire, parcourir, consulter

Trois des skills de production se ressemblent, et le risque est que l'agent prenne le mauvais. La frontière tient en
trois verbes : un **document** se *lit* du début à la fin, une **page** se *parcourt* à l'écran, une **doc** se
*consulte* par morceaux. Un document de quarante pages reste un document ; une doc d'une seule page n'a pas lieu
d'être.

## Écrire une bonne description

Tout se joue dans la description, puisque c'est la seule chose que l'agent voit avant de choisir. Les miennes disent
trois choses : ce que le skill produit, les mots qui doivent le déclencher, et surtout **quand ne pas l'utiliser**.
Le skill `pages`, par exemple, se déclenchait au début dès que je demandais une page web ou un artefact ; sa
description dit désormais qu'il ne s'utilise que sur demande explicite, et renvoie les autres cas vers le bon outil.
Le skill des tickets ne se déclenche que si je nomme le gestionnaire de tickets, pour ne pas s'inviter dans une
conversation où le mot « ticket » passe par hasard.

En cas de doute entre deux skills, la consigne est de demander avant de commencer : une question coûte moins qu'un
document de dix pages au mauvais format.

## Skills globaux et skills de projet

Mes skills vivent dans le dossier de Claude Code et sont disponibles partout. Un projet peut aussi avoir les siens,
dans son propre dossier `.claude/skills/`, quand ils n'ont de sens que là. Un skill de projet passe avant un skill
global du même nom.
