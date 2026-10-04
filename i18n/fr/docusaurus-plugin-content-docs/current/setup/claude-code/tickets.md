---
sidebar_position: 8
description: Confier un ticket à l'agent, et suivre son travail depuis le terminal.
image: zorg.png
---

# Tickets et mods

Mes tâches de développement vivent dans mon gestionnaire de tickets, [Zorg](/projects/zorg), un projet perso. L'intégration avec
Claude Code permet une demande comme « prends le ticket 42 » : l'agent lit le ticket en entier, fait le travail,
commite, déplace le ticket et laisse un commentaire de suivi. Trois pièces y concourent : un CLI fait pour les
agents, un skill qui décrit le cycle d'un ticket, et deux mods qui gardent le ticket en vue dans le terminal.

<Diagram
  name="harness-tickets"
  alt="Dans le terminal, le skill tickets appelle le CLI, que les mods relisent ; le CLI parle à la base. Sur claude.ai, sans shell, le connecteur passe par le serveur MCP, qui atteint la même base."
/>

## Un CLI pensé pour les agents

Le CLI répond à toutes ses commandes en JSON avec `--json`, accepte un nom ou un identifiant partout où il attend un
ticket ou un projet, et a une commande qui imprime sa propre documentation, écrite pour un agent : ce qu'on peut
faire, les conventions, les pièges. L'agent la lit avant tout le reste, ce qui évite de lui répéter le mode d'emploi
dans chaque consigne. La connexion passe par le navigateur et la session expire au bout de trente jours : quand elle
expire, l'agent me demande de me reconnecter plutôt que de chercher un contournement.

C'est le chemin par défaut. Le même service expose un serveur MCP, avec une connexion OAuth, pour les clients qui
n'ont pas de shell : claude.ai sur le web ou le téléphone. Dans le terminal, ce connecteur est refusé, puisque le CLI
fait mieux la même chose (voir [Réglages](/setup/claude-code/settings)).

## Le skill : le cycle d'un ticket

Le skill ne se déclenche que si je nomme le gestionnaire ou un ticket. Il décrit le travail dans l'ordre :

1. trouver le projet et ses statuts, puis lire le ticket **en entier**, corps et commentaires ;
2. passer le ticket « en cours » ;
3. faire le travail, en lançant des sous-agents en parallèle s'il y a plusieurs tickets ;
4. commiter avec la référence du ticket dans le message ;
5. passer le ticket au statut suivant et ajouter un commentaire qui résume ce qui a été fait et comment le vérifier.

Une règle compte plus que les autres : les sous-agents codent, mais ne touchent **ni à git ni aux statuts**. C'est
l'agent principal qui relit leur travail, commite et déplace les tickets, pour qu'il n'y ait jamais deux agents qui
poussent ou changent un statut en même temps.

## Les mods : le ticket reste en vue

Les mods sont de petits plugins qui ajoutent de l'interface à Claude Code. Ils s'écrivent en TypeScript (TSX), se
branchent sur des événements de Claude Code (un appel d'outil, l'ouverture d'une session, une horloge) et peuvent
afficher quelque chose au-dessus du prompt ou ouvrir un panneau. Les miens sont rangés avec les skills, dans le même
dossier versionné.

- **Le bandeau du ticket.** Il observe les appels d'outils de l'agent ; dès qu'une commande du CLI porte sur un ticket
  (le lire, le modifier, le commenter), il retient ce ticket et l'affiche au-dessus du prompt avec sa référence, son
  statut en couleur et son titre, rafraîchis toutes les deux minutes. Je sais toujours sur quoi l'agent travaille.
- **Le tableau de bord.** Une commande `/zorg-dashboard` ouvre un panneau avec les tickets d'un projet rangés par
  statut. Le projet est deviné d'après le dossier courant, et se change au clavier.

Les deux mods n'appellent que le CLI : ils voient exactement ce que voit l'agent.
