---
sidebar_position: 7
description: Retrouver mes skills sur claude.ai, sans que git cesse d'être la seule source.
image: claude.png
---

# Les skills sur claude.ai

Les skills de production servent aussi ailleurs que dans le terminal : sur claude.ai, sur mobile ou dans l'appli de
bureau, je veux pouvoir demander un rapport ou un schéma dans le même style. Les skills doivent donc exister aux deux
endroits, avec une règle simple : **git est la source, claude.ai n'est qu'une copie**.

<Diagram
  name="harness-claudeai"
  alt="Un skill du dépôt est empaqueté en zip par skills.ps1, puis importé à la main sur claude.ai ; la synchronisation de claude.ai vers la machine est coupée."
/>

## Empaqueter, puis importer

Il n'existe pas d'API pour envoyer un skill sur claude.ai : l'import se fait à la main, à partir d'un zip, dans les
réglages des skills. Le script `skills.ps1` prépare ce zip proprement :

```powershell
& ~/.claude/skills.ps1 list           # les skills, et ceux qui restent locaux
& ~/.claude/skills.ps1 pack documents # crée dist/documents.zip, hors du dépôt
```

Avant de construire le zip, `pack` vérifie ce qui ferait échouer l'import : le champ `name` doit être identique au nom
du dossier, la description ne doit pas dépasser 1 024 caractères, et le frontmatter ne doit contenir que les champs
acceptés par claude.ai. Il retire les fichiers parasites (caches Python, fichiers système), puis relit le zip pour
vérifier qu'il contient un seul dossier racine avec son `SKILL.md`. Sans argument, il empaquette tous les skills sauf
ceux qui dépendent d'un CLI local (tickets, navigateur), inutiles sur claude.ai.

Le circuit est donc : modifier le skill, commiter, `pack`, puis remplacer l'ancienne version sur claude.ai.

## Pourquoi la synchro est coupée

Claude Code sait faire l'inverse : télécharger les skills de claude.ai dans le dossier local, pour les proposer aussi
dans le terminal. Avec des skills qui existent déjà en local, cela crée des doublons, et deux versions d'un même skill
qui peuvent diverger. J'ai donc coupé cette synchronisation (`syncClaudeAiSkills: false`) : dans le terminal, seuls
les skills du dépôt existent.

## Skill, document ou artefact sur claude.ai

Sur claude.ai, d'autres outils font concurrence aux skills : les artefacts (pages web publiées) et les documents
intégrés. Pour que Claude choisisse bien, le plus simple est de reprendre dans les préférences de claude.ai la même
règle que dans le terminal : un document, un schéma ou une petite doc dans mon style passent par le skill
correspondant ; un artefact seulement sur demande.
