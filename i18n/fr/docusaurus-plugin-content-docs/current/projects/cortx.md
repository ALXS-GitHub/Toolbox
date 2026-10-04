---
sidebar_position: 1
description: Une appli de bureau qui lance mes projets, héberge mes terminaux et tient l'inventaire de mes outils.
url: "https://github.com/ALXS-GitHub/CortX/releases"
repo: "https://github.com/ALXS-GitHub/CortX"
status: active
kind: project
platforms: [windows, macos, linux]
stack: [Tauri 2, Rust, React, TypeScript]
image: cortx.png
---

# CortX

CortX est né d'un agacement simple : pour travailler sur un projet, il fallait ouvrir quatre terminaux, lancer le
front, l'API, un worker, puis retrouver lequel affichait quoi. CortX regroupe tout ça dans une application : un projet,
ses services, un bouton pour tout démarrer. Depuis, il est devenu le centre de mon environnement de travail. Il me
sert de terminal, il génère les alias de tous mes shells, il lance mes scripts et il tient la liste des outils
installés sur la machine.

Le projet est open source (licence MIT) et publié pour Windows, macOS et Linux.

## Ce que fait CortX

**Projets et services.** Un projet, c'est un dossier et une liste de services : une commande, un dossier de travail,
des variables d'environnement. On les démarre un par un ou tous ensemble, CortX détecte les ports ouverts et garde la
sortie de chacun dans un onglet. Arrêter un service envoie d'abord un `Ctrl+C`, pour que les serveurs de dev
s'arrêtent proprement.

**Un vrai terminal.** Chaque service, script ou shell tourne dans un vrai pseudo-terminal, rendu avec xterm.js :
couleurs, barres de progression et interfaces en mode texte se comportent comme dans un terminal classique. La fenêtre
Terminal ajoute les onglets, les divisions, les raccourcis à la Warp, les thèmes au format de Warp et la restauration
des sessions : à la réouverture, chaque onglet retrouve son dossier et la fin de sa sortie précédente, sans rien
relancer. Avec l'intégration au shell, les onglets suivent le dossier courant et signalent la fin des commandes
longues.

**Scripts, outils et alias.** CortX garde des scripts globaux paramétrables, que je lance depuis l'application, depuis
son interface en mode texte ou avec `cortx run`. Il tient aussi un registre des outils et applications de la machine,
avec leur statut, leurs fichiers de configuration et un lien vers leur fiche dans cette doc : c'est mon inventaire
quand je réinstalle un poste. Enfin, `cortx init <shell>` génère pour PowerShell, bash, zsh et fish le même ensemble
d'alias, de fonctions et d'intégrations, par exemple celle de [zoxide](/tools/dev/cli/zoxide).

**Pensé aussi pour les agents.** Le CLI répond en JSON (`--json`) et `cortx docs` affiche une référence écrite pour
les agents d'IA. Un serveur MCP expose les mêmes fonctions, et CortX sait retrouver les sessions de Claude Code et de
Codex en cours sur la machine (fonction encore en bêta).

## Comment c'est construit

CortX est un espace de travail Rust avec une application Tauri par-dessus. Le schéma montre comment les quatre
interfaces partagent un même cœur.

<Diagram
  name="cortx-architecture"
  alt="L'application de bureau, la TUI, le CLI et le serveur MCP appellent cortx-core, qui gère les services, génère l'initialisation des shells et stocke les données en JSON, sauvegardées dans un dépôt git."
/>

Tout passe par `cortx-core`, une bibliothèque Rust qui définit les modèles, lit et écrit les données et gère les
processus. L'application de bureau (Tauri 2, React 19, TypeScript, Tailwind, shadcn/ui, Zustand), l'interface en mode
texte (ratatui), le CLI et le serveur MCP ne sont que des façons différentes d'y accéder. Ils voient donc tous les
mêmes projets, les mêmes scripts et les mêmes alias. Les données sont de simples fichiers JSON ; `cortx backup` les
pousse dans un dépôt git privé, ce qui permet de tout retrouver sur une nouvelle machine.

Les versions sont construites par GitHub Actions quand je pousse une étiquette : la release est créée en brouillon
avec les installateurs des trois systèmes, et je la publie à la main.

## Où il en est

CortX est mon projet le plus actif. Il en est à la version 0.15 (octobre 2026), avec près de 280 commits, et je
l'utilise tous les jours : c'est lui qui ouvre mes terminaux et prépare mes shells.

## L'installer

Les installateurs (`.msi` et `.exe` pour Windows, `.dmg` pour macOS, `.deb` et `.AppImage` pour Linux) sont sur la
[page des releases](https://github.com/ALXS-GitHub/CortX/releases). Pour le compiler soi-même, il faut Bun et Rust :

```bash
git clone https://github.com/ALXS-GitHub/CortX.git
cd CortX/frontend
bun install
bun tauri:dev     # mode développement
bun tauri:build   # installateur pour le système courant
```
