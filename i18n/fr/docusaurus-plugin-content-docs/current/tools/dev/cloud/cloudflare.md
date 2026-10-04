---
description: "Des fonctions serveur, une base SQLite et du stockage de fichiers, au plus près des utilisateurs."
url: "https://www.cloudflare.com/developer-platform/"
status: active
kind: service
platforms: [web]
image: cloudflare.svg
sidebar_position: 2
---

# Cloudflare

Au-delà de son réseau, Cloudflare propose une plateforme pour développeurs : des **Workers** (du code serveur qui
s'exécute dans leurs centres de données du monde entier), **D1** (une base SQLite hébergée) et **R2** (un stockage de
fichiers sans frais de sortie). Le tout se déploie avec le CLI `wrangler`, avec une offre gratuite généreuse.

## Où je l'utilise

C'est l'hébergement de [Souvenirs](/projects/souvenirs) : l'API tourne dans un Worker, les données dans D1 et les
photos dans R2. Un autre Worker sert de relais pour les mises à jour de l'application de bureau, dont le dépôt est
privé (voir [Mises à jour des apps Tauri](/setup/tauri-updates)).
