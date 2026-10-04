---
description: "L'hébergement de l'app web de Zorg et des relais de mise à jour de mes apps de bureau."
url: "https://vercel.com/"
status: active
kind: service
platforms: [web]
image: vercel.svg
sidebar_position: 3
---

# Vercel

Vercel héberge des sites et des fonctions serveur à partir d'un dépôt Git : chaque push déclenche un déploiement, chaque
branche a son aperçu, et une fonction n'est qu'un fichier dans un dossier `api/`. L'offre gratuite suffit largement à
des projets personnels.

## Où je l'utilise

- **L'app web de [Zorg](/projects/zorg)** : la version web, une PWA [React](/tools/dev/web-desktop/react) +
  [Vite](/tools/dev/web-desktop/vite), est déployée sur Vercel. Sa configuration ajoute des en-têtes de sécurité stricts
  (politique de contenu limitée à Supabase et au relais de mises à jour, interdiction d'être affichée dans un cadre).
- **Les relais de mise à jour** de Zorg et de [PayLedger](/projects/payledger) : leur dépôt étant privé, une petite
  fonction Vercel détient seule un jeton en lecture, renvoie la dernière version à l'application et lui sert les
  fichiers. Le jeton est une variable d'environnement du projet Vercel, et le changer ne demande pas de republier
  l'application (voir [Mises à jour des apps Tauri](/setup/tauri-updates)).

Pour [Souvenirs](/projects/souvenirs), le même rôle est tenu par un Worker [Cloudflare](/tools/dev/cloud/cloudflare).
