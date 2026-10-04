---
description: "L'agent de code d'OpenAI, que j'utilise en ligne de commande à côté de Claude Code."
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

Codex est mon deuxième agent. Je m'en sers quand un regard différent est utile — relire un changement fait avec
Claude Code, débloquer un problème sur lequel l'autre tourne en rond — et pour ce qu'il fait bien en plus, comme
générer des images à partir d'une consigne détaillée, par exemple des vignettes pour mon jeu
[Pack a K-Pop Idol](/projects/pack-a-kpop-idol).

Il tourne avec un niveau de réflexion moyen par défaut, et, sous Windows, dans un bac à sable qui limite ce qu'il peut
modifier en dehors du projet. Chaque dossier doit être marqué comme « de confiance » avant qu'il y travaille librement.
Ses sessions apparaissent dans [CortX](/projects/cortx), à côté de celles de Claude Code.

## L'installer

```powershell
scoop install codex      # ou : npm install -g @openai/codex
codex                    # dans un projet, puis se connecter avec son compte ChatGPT
```
