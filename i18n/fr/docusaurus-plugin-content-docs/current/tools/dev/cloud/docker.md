---
description: "Des conteneurs pour faire tourner un service sans l'installer."
url: "https://www.docker.com/"
status: paused
kind: app
platforms: [windows, macos, linux]
image: docker.png
sidebar_position: 4
---

# Docker

Docker fait tourner des applications dans des conteneurs : un environnement isolé et reproductible, décrit dans un
fichier, qui fonctionne de la même façon sur toutes les machines. C'est la façon la plus simple de lancer une base de
données ou un service le temps d'un projet, sans rien installer.

Docker Desktop reste installé, avec l'alias `dc` pour `docker compose`, mais aucun de mes projets actuels n'en a
besoin : mes applications sont locales (SQLite) ou s'appuient sur des services hébergés
([Supabase](/tools/dev/cloud/supabase), [Cloudflare](/tools/dev/cloud/cloudflare)).
