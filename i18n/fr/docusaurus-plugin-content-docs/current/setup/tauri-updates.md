---
sidebar_position: 6
description: Publier une app Tauri et la mettre à jour toute seule — y compris quand son dépôt est privé.
image: tauri.png
---

# Mises à jour des apps Tauri

Plusieurs de mes applications de bureau sont faites avec [Tauri](/tools/dev/web-desktop/tauri) :
[CortX](/projects/cortx), [Zorg](/projects/zorg), [PayLedger](/projects/payledger), [Souvenirs](/projects/souvenirs)
et [ALXS-RL-Mod](/projects/alxs-rl-mod). Toutes se mettent à jour seules, avec la même recette : une étiquette de
version lance la construction sur GitHub, qui produit des installeurs signés, et l'application installée vérifie au
démarrage s'il y a mieux. La seule différence vient des dépôts privés, qui demandent un intermédiaire.

<Diagram
  name="tauri-updates"
  alt="Une étiquette de version déclenche GitHub Actions, qui construit une release signée avec latest.json ; pour un dépôt public, l'application la lit directement ; pour un dépôt privé, elle passe par un relais qui détient un jeton en lecture."
/>

## Le principe

Le plugin de mise à jour de Tauri interroge une adresse qui lui renvoie un petit fichier, `latest.json` : la dernière
version, ses notes, et pour chaque système l'adresse de l'installeur et sa **signature**. L'application ne s'installe
que si la signature correspond à la clé publique inscrite dans sa configuration. Même si quelqu'un détournait
l'adresse, il ne pourrait pas faire installer autre chose.

## La clé de signature

```bash
bunx tauri signer generate -w ~/.tauri/mon-app.key
```

La commande produit une paire de clés. La **clé publique** va dans `tauri.conf.json` ; la **clé privée** et son mot
de passe vont dans les secrets du dépôt GitHub, pour que la construction puisse signer. La clé privée ne doit jamais
être commitée, et elle doit être sauvegardée : la perdre, c'est ne plus jamais pouvoir mettre à jour les applications
déjà installées.

## Dans l'application

```json
{
  "bundle": { "createUpdaterArtifacts": true },
  "plugins": {
    "updater": {
      "pubkey": "<clé publique>",
      "endpoints": ["<adresse de latest.json>"]
    }
  }
}
```

Côté Rust, on ajoute les plugins `updater` et `process` (pour relancer l'application), et on n'enregistre l'updater
qu'en version publiée, jamais en développement. Côté interface, on vérifie (`check()`), on propose la mise à jour avec
ses notes, on la télécharge avec une barre de progression (`downloadAndInstall()`), puis on relance. Chaque application
choisit son moment : CortX vérifie quelques secondes après le démarrage et sauvegarde l'état de ses fenêtres avant
d'installer, Zorg vérifie au démarrage puis toutes les quatre heures, ALXS-RL-Mod propose un bouton dans ses réglages.

## La construction sur GitHub

Un workflow GitHub Actions se déclenche sur chaque étiquette `v*`. L'action officielle `tauri-action` construit
l'application pour chaque système, signe les installeurs avec la clé privée des secrets, génère `latest.json` et crée
la release. Je la crée en **brouillon** :

1. monter la version dans `package.json`, `Cargo.toml` et `tauri.conf.json` ;
2. `git tag vX.Y.Z` puis `git push origin vX.Y.Z` ;
3. relire le brouillon de release, dont les notes s'afficheront dans la fenêtre de mise à jour ;
4. le publier.

Tant que le brouillon n'est pas publié, aucune application ne voit la nouvelle version : c'est un dernier contrôle
avant que tout le monde la reçoive.

## Dépôt public : rien de plus

Pour un dépôt public comme CortX ou ALXS-RL-Mod, l'adresse de `latest.json` est simplement celle de la dernière
release : `https://github.com/<compte>/<dépôt>/releases/latest/download/latest.json`. GitHub sert les fichiers à tout
le monde.

## Dépôt privé : un relais

Pour un dépôt privé, les fichiers d'une release ne se téléchargent qu'avec un jeton d'accès. Le mettre dans
l'application reviendrait à le distribuer à quiconque l'installe. On place donc un petit **relais** entre les deux : il
est seul à détenir un jeton, limité à la lecture de ce seul dépôt, et l'application l'interroge à la place de GitHub.

J'en utilise deux variantes :

- **Sur [Vercel](/tools/dev/cloud/vercel)** (Zorg, PayLedger) : une fonction lit le `latest.json` de la dernière release, remplace les adresses
  des installeurs par les siennes, et sert ensuite les fichiers en les relayant. Le jeton est une variable
  d'environnement du projet Vercel, et la réponse est mise en cache quelques minutes.
- **Sur un Worker Cloudflare** (Souvenirs) : le relais construit lui-même la réponse à partir de la version demandée
  par l'application, répond « rien de neuf » quand elle est à jour, et redirige les téléchargements vers les adresses
  temporaires de GitHub plutôt que de faire transiter les fichiers. Il sert aussi une page d'installation.

Dans les deux cas, changer de jeton se fait sans toucher à l'application : on remplace la variable du relais.
