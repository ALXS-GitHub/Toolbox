---
description: "L'agent d'OpenAI, que j'utilise surtout pour générer des images."
url: "https://openai.com/codex/"
status: active
kind: cli
platforms: [windows, macos, linux, web]
image: openai.png
sidebar_position: 2
---

# Codex

Codex est l'agent de code d'OpenAI : comme [Claude Code](/tools/ai/coding/claude-code), il travaille dans un projet,
lit et modifie le code, lance des commandes. Je l'utilise surtout en ligne de commande (le CLI `codex`), inclus dans
mon abonnement [ChatGPT](/tools/ai/assistants/chatgpt).

## Mon usage

Je m'en sers **surtout pour créer des images** : Codex génère et retouche des visuels à partir d'une consigne détaillée,
directement dans le dossier du projet, ce qui est pratique pour produire des illustrations, des icônes ou des visuels
de présentation pour mes projets. Comme second agent de code, à côté de Claude Code, je l'utilise très peu.

Il tourne avec un niveau de réflexion moyen par défaut, et, sous Windows, dans un bac à sable qui limite ce qu'il peut
modifier en dehors du projet. Chaque dossier doit être marqué comme « de confiance » avant qu'il y travaille librement.
Ses sessions apparaissent dans [CortX](/projects/cortx), à côté de celles de Claude Code.

## L'installer

```powershell
scoop install codex      # ou : npm install -g @openai/codex
codex                    # dans un projet, puis se connecter avec son compte ChatGPT
```
