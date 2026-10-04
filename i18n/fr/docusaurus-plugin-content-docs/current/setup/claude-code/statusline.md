---
sidebar_position: 3
description: Deux lignes sous le prompt pour savoir où je suis et ce que la session consomme.
---

# Statusline

La statusline est la barre que Claude Code affiche sous le prompt. Par défaut, elle est presque vide ; la mienne
répond en un coup d'œil à deux questions : *où suis-je et avec quoi ?* sur la première ligne, *combien ça consomme ?*
sur la seconde.

![La statusline sur un projet d'exemple : dossier, branche, modèle, effort, contexte et coût, puis quotas, durée, lignes modifiées et cache.](/images/setup/statusline.png)

## Ce qu'elle affiche

La première ligne situe la session : le dossier courant, la branche git avec le nombre de fichiers modifiés et
l'avance ou le retard sur la branche distante, le worktree et la pull request s'il y en a, le modèle, le niveau
d'effort (une couleur par niveau) et le nom de l'agent quand un sous-agent travaille. Elle se termine par
l'occupation du contexte, en barre et en tokens, et par le coût de la session.

La seconde ligne parle de consommation : les quotas sur 5 heures et sur 7 jours avec l'heure de leur
réinitialisation, la durée de la session, les lignes ajoutées et supprimées, et l'état du cache de prompt (chaud ou
froid, avec le taux de réutilisation).

Les couleurs suivent des seuils simples : vert sous 50 %, jaune jusqu'à 75 %, orange jusqu'à 90 %, rouge au-delà. Un
contexte qui passe au orange, c'est le signal de terminer la tâche en cours ou de repartir d'une session propre.

## Comment ça marche

Claude Code appelle la commande déclarée dans `statusLine` et lui envoie l'état de la session en JSON sur l'entrée
standard : dossier, modèle, effort, coût, fenêtre de contexte, quotas, pull request, cache. Le script n'a qu'à lire ce
JSON et écrire deux lignes colorées. Il est écrit en [PowerShell 7](/setup/windows/powershell) ; dans le vrai réglage, `pwsh` et le script sont
donnés par leur chemin complet, pour ne pas dépendre du shell courant (les chemins sont raccourcis ici) :

```json
"statusLine": {
  "type": "command",
  "command": "pwsh -NoProfile -File ~/.claude/statusline.ps1",
  "padding": 0
}
```

Seule la branche git demande un vrai calcul : le script lance `git status` une fois et garde le résultat en cache
cinq secondes par dossier, pour que la barre reste instantanée même si Claude Code la redessine souvent. Les dates
de réinitialisation sont affichées en français, d'où le « jeu. » de la capture.
