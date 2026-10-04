---
sidebar_position: 2
description: Les réglages de Claude Code, les consignes en CLAUDE.md, les permissions et la mémoire.
---

# Réglages et consignes

Claude Code lit sa configuration à deux niveaux : des **réglages** techniques dans `settings.json`, et des
**consignes** en langage naturel dans des fichiers `CLAUDE.md`. Les premiers décident de ce que l'outil fait, les
secondes de la façon dont l'agent travaille. Cette page passe en revue les miens, puis les permissions et la mémoire,
qui complètent le tableau sans être versionnées.

## settings.json

Le fichier est court : chaque clé y est pour une raison précise, et aucune ne contient de secret.

| Réglage | Valeur | Pourquoi |
|---|---|---|
| `statusLine` | un script PowerShell | les deux lignes d'état décrites dans [Statusline](/setup/claude-code/statusline) |
| `modelSettings` | effort `high` pour le modèle principal | un niveau de réflexion élevé par défaut, sans le répéter à chaque session |
| `language` | `French` | l'agent me répond en français, quelle que soit la langue du code |
| `voice` | activée, mode « maintenir » | dicter une demande en gardant une touche enfoncée |
| `theme` | `dark` | |
| `autoUpdatesChannel` | `latest` | les nouvelles versions dès leur sortie |
| `agentPushNotifEnabled` | `true` | une notification quand un agent en arrière-plan a fini |
| `deniedMcpServers` | une liste de connecteurs | les connecteurs de claude.ai qui font doublon avec un CLI |
| `syncClaudeAiSkills` | `false` | git reste la seule source des skills (voir [claude.ai](/setup/claude-code/claude-ai)) |

Le refus des connecteurs mérite une explication. Les connecteurs ajoutés sur claude.ai (messagerie, agenda,
gestionnaire de tickets, base de données…) sont aussi proposés dans Claude Code. Quand un service a un bon CLI, l'agent
s'en sert mieux : il lit l'aide, enchaîne les commandes et récupère du JSON. `deniedMcpServers` retire donc du
terminal les connecteurs qui ont un équivalent en ligne de commande, et garde les autres.

Certaines clés sont interdites dans ce fichier par le [hook](/setup/claude-code/guardrails) : `env`, `apiKeyHelper`,
`mcpServers` et les assistants d'identifiants. Elles servent à porter des secrets, qui n'ont rien à faire dans un
dépôt.

## Les consignes : CLAUDE.md

Le `CLAUDE.md` global s'applique à toutes les sessions. Le mien tient en quelques règles : le contexte est
strictement personnel, une seule adresse e-mail est à utiliser partout, et les réponses se donnent dans le
terminal plutôt que sous forme de page web publiée, sauf si je le demande explicitement.

Chaque projet peut avoir son propre `CLAUDE.md`, à la racine du dépôt. On y met ce qui ne se devine pas en lisant le
code : la façon de valider un changement (les commandes de typecheck et de build), la convention de commit, ce qu'il
ne faut jamais réintroduire. Sur certains projets, la consigne est de commiter et pousser directement sur `main` une
fois le build passé ; sur d'autres, de toujours demander.

## Les permissions

Je lance Claude Code sans confirmation à chaque commande : c'est un alias de mon shell qui l'ouvre dans ce mode, et un
réglage masque l'avertissement qui va avec. C'est un choix de confort, compensé par des garde-fous qui ne dépendent
pas de la vigilance : rien de sensible n'est dans le dépôt, chaque commit est contrôlé et signé, et les consignes
interdisent les actions irréversibles sans accord. Les permissions accordées projet par projet s'accumulent dans un
`settings.local.json`, jamais versionné.

## La mémoire

Claude Code tient une mémoire par projet : un fichier `MEMORY.md` sert d'index, chargé au début de chaque session,
et chaque souvenir est un petit fichier à part (une préférence, une décision, une erreur à ne pas refaire). L'agent
l'enrichit quand je le corrige ou quand une décision tombe. Elle reste sur la machine : elle contient trop de
contexte personnel pour un dépôt, même privé.
