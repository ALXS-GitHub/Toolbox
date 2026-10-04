---
sidebar_position: 2
sidebar_label: "Agents : CLI et MCP"
description: Comment un agent d'IA utilise Zorg — le CLI par défaut, le serveur MCP quand il n'y a pas de shell.
image: icons/bot.svg
---

# Agents : CLI et MCP

Zorg a été pensé dès le départ pour être utilisé par des agents d'IA autant que par moi. Le principe vient d'un autre
de mes outils, [CortX](/projects/cortx) : tout ce que fait l'interface doit pouvoir se faire en ligne de commande, et
le CLI doit expliquer lui-même comment s'en servir. Le serveur MCP est venu plus tard, pour les cas où un agent n'a
pas de terminal.

## Le CLI par défaut

Un agent qui a un shell, comme [Claude Code](/tools/ai/coding/claude-code), passe par le CLI. Sa première commande est
`zorg ai`, qui affiche un guide écrit pour lui : les conventions, les entités et leurs champs, comment lire un ticket
avec son contexte, comment travailler avec les sous-projets.

```bash
zorg ai                                   # le guide pour agents
zorg project list --json                  # les projets, en JSON
zorg ticket show <ticket> --json          # un ticket complet, avec ses commentaires
zorg ticket update <ticket> --set priority=3
zorg comment add <ticket> "Fait : …"
```

Toutes les entités (projets, tickets, notes, rappels, événements, statuts, étiquettes, versions…) ont les mêmes
commandes : `list`, `get`, `create`, `update`, `delete`. Les tickets ajoutent ce qui leur est propre : la vue
complète, les étiquettes, les liens, les sous-tickets, les commentaires et les pièces jointes. Les conventions sont
pensées pour un programme : `--json` partout, `--set champ=valeur` pour modifier, un nom ou un identifiant acceptés
partout, `--yes` pour confirmer une suppression sans interaction, un code de sortie fiable.

Le cycle complet d'un ticket confié à Claude Code est décrit dans la page
[Tickets et mods](/setup/claude-code/tickets) de mon harness.

## Se connecter par le navigateur

Le CLI se connecte comme `gh` : il ouvre un petit serveur local, lance le navigateur sur une page de l'application,
et j'autorise la connexion avec la session que j'y ai déjà. Le serveur local reçoit alors un jeton à usage unique, que
le CLI échange contre une session à lui. Je n'ai jamais à taper de mot de passe dans le terminal, et chaque CLI
connecté apparaît comme un appareil distinct dans les réglages, que je peux déconnecter à tout moment. La session
expire au bout de trente jours.

## Le serveur MCP pour claude.ai

Sur claude.ai, dans le navigateur ou sur le téléphone, il n'y a pas de shell : pas de CLI possible. Zorg y est
disponible comme connecteur, grâce à un serveur MCP distant. Il expose huit outils, volontairement limités aux
tickets : lister les projets, les statuts, les versions et les tickets, afficher un ticket, en créer, en modifier,
ajouter un commentaire. Il envoie aussi ses consignes d'utilisation dès la connexion, l'équivalent de `zorg ai`.

La connexion passe par OAuth 2.1, comme pour n'importe quel connecteur : claude.ai découvre le serveur
d'autorisation, s'enregistre, et j'accepte l'accès sur un écran de consentement de Zorg. À chaque requête, le serveur
vérifie que le jeton lui est bien destiné, qu'il vient d'un connecteur et pas d'une autre session, et que la session
existe encore et a moins de trente jours. Révoquer l'accès dans les réglages le coupe immédiatement. Dans l'autre
sens, un jeton de connecteur ne peut pas servir à ouvrir une session complète ailleurs.

## Lequel utiliser

Le CLI couvre tout et c'est le plus efficace : l'agent lit l'aide, enchaîne les commandes et filtre le JSON. Le
serveur MCP ne couvre que les tickets et ne sert que là où il n'y a pas de terminal. Dans Claude Code, le connecteur
Zorg de claude.ai est donc désactivé, pour que l'agent ne se trompe pas de chemin.
