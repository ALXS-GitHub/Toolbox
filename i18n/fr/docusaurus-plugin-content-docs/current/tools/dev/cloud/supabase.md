---
description: "PostgreSQL, authentification et temps réel prêts à l'emploi : le backend de Zorg."
url: "https://supabase.com/"
status: active
kind: service
platforms: [web]
image: supabase.png
sidebar_position: 1
---

# Supabase

Supabase fournit un backend complet autour d'une vraie base **PostgreSQL** : l'authentification, une API générée à
partir des tables, le temps réel (être notifié quand une ligne change), le stockage de fichiers et des fonctions
serveur. On écrit son schéma SQL, et le reste est déjà là.

## Où je l'utilise

C'est le backend de [Zorg](/projects/zorg) : l'application web, l'application de bureau, le CLI et le serveur MCP
parlent directement à la base. La sécurité repose sur les règles de PostgreSQL (*row level security*) : chaque
utilisateur ne voit que ses données, quel que soit le client. Le temps réel est limité aux données affichées, pour que
les autres appareils se mettent à jour sans consommer de trafic inutile.

## Le CLI

```bash
supabase migration new <nom>          # une migration SQL versionnée
supabase db push                      # l'appliquer à la base
supabase functions deploy <nom>       # déployer une fonction serveur
```

Les migrations vivent dans le dépôt, ce qui permet à [Claude Code](/tools/ai/coding/claude-code) d'écrire une
évolution du schéma comme n'importe quel autre changement.
