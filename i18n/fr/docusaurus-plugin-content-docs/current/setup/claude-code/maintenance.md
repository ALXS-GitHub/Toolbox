---
sidebar_position: 10
description: Les gestes à refaire quand on change quelque chose, et la petite revue périodique.
---

# Entretien

Un harness s'use comme le reste : Claude Code évolue, des réglages changent de nom, des fichiers s'accumulent, des
exemples vieillissent. Cette page rassemble les circuits à suivre après un changement, puis la revue que je fais de
temps en temps pour garder l'ensemble propre.

## Après avoir modifié un skill

Un skill modifié n'est terminé qu'une fois ses exemples remis à niveau et sa copie envoyée sur claude.ai :

1. relancer le script du skill sur ses exemples (`render.py` ou `build.py`) et relire les captures produites ;
2. commiter, ce qui passe par le [hook](/setup/claude-code/guardrails) ;
3. `skills.ps1 pack <skill>`, puis remplacer la version sur claude.ai (voir [claude.ai](/setup/claude-code/claude-ai)).

## Après avoir modifié le design commun

Un changement dans `_design` touche quatre skills à la fois :

```powershell
python skills/_design/scripts/build.py           # vérifie, puis recopie dans chaque skill
python skills/_design/scripts/build.py --check   # plus tard : signale une copie périmée
```

Viennent ensuite les exemples de chaque skill, à remettre à niveau un par un, puis un `pack` des quatre skills. La
version du design augmente à chaque changement : un document produit avant porte toujours l'ancienne, et on sait
ainsi qu'il peut être régénéré.

## La revue périodique

De temps en temps, et à chaque nouvelle version importante de Claude Code, je repasse sur quelques points :

- **Les réglages.** Une clé renommée ou dépréciée par Claude Code, un réglage devenu le comportement par défaut : le
  fichier reste court s'il ne contient que ce qui compte.
- **Les connecteurs refusés.** Un nouveau connecteur ajouté sur claude.ai qui ferait doublon avec un CLI rejoint la
  liste ; un CLI abandonné en sort.
- **Les permissions des projets.** Les autorisations accordées au fil de l'eau s'accumulent dans chaque projet ; on
  retire celles qui ne servent plus.
- **Les restes.** Corbeilles de skills, anciens dossiers de développement de mods, fichiers de sauvegarde : rien de
  tout ça n'entre dans le dépôt grâce à la liste blanche, mais le dossier gagne à rester lisible.
- **Le hook.** Si Claude Code crée un nouveau dossier d'état, il rejoint la liste des dossiers que le hook refuse,
  en plus de la liste blanche.
- **Les descriptions des skills.** Un skill qui se déclenche à tort, ou pas assez, se corrige presque toujours dans sa
  description (voir [Les skills](/setup/claude-code/skills)).
