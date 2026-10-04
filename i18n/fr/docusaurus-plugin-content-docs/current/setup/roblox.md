---
sidebar_position: 5
description: Développer un jeu Roblox avec du code en fichiers, Rojo, des outils épinglés par projet, et Claude Code.
---

# Développer sur Roblox

Roblox Studio est un très bon éditeur de mondes 3D, mais un éditeur de code limité : pas de git, pas de vrais outils
de qualité, et un agent d'IA ne peut y travailler qu'à travers un serveur MCP. Pour
[Pack a K-Pop Idol](/projects/pack-a-kpop-idol), j'ai donc séparé les deux : **le code vit en fichiers dans un dépôt
git, la 3D vit dans Studio**, et Rojo fait le pont. Ce guide décrit cette chaîne, réutilisable pour n'importe quel jeu.

## La chaîne d'outils

| Outil | Rôle |
|---|---|
| **Rokit** | installe et épingle les autres outils, avec une version par projet |
| **Rojo** | synchronise les fichiers Luau du disque vers Studio |
| **Wally** | gestionnaire de paquets (React Lua, une bibliothèque d'animations) |
| **Selene** | vérification du code Luau, avec la bibliothèque standard de Roblox |
| **StyLua** | mise en forme automatique |
| **Luau LSP** | complétion et typage dans VS Code, grâce à la carte du projet générée par Rojo |

Rokit est le seul outil installé globalement. Les autres sont listés avec leur version dans un `rokit.toml` à la racine
du jeu : toute personne (ou tout agent) qui ouvre le projet obtient exactement les mêmes versions avec `rokit install`.
Côté éditeur, les extensions VS Code de Rojo, Luau LSP, Selene et StyLua complètent l'ensemble.

## Le code en fichiers, la 3D dans Studio

Le fichier de projet de Rojo associe chaque service de Roblox à un dossier : le code serveur, le code client, les
modules partagés, les paquets Wally. Rojo ne synchronise que le code ; tout le reste — le décor, l'éclairage, les
modèles, les assets — reste dans le fichier du jeu, que git ne suit pas. Ce choix évite les conflits et garde le dépôt
léger, et Rojo est réglé pour ne jamais effacer dans Studio ce qu'il ne connaît pas.

La synchronisation va **dans un seul sens**, du disque vers Studio. La règle d'or en découle : on ne modifie jamais le
code dans Studio, sinon Rojo l'écrase. Si besoin, `rojo syncback` rapatrie exceptionnellement un changement fait dans
Studio.

## Une session de travail

```bash
cd game
rojo serve          # Studio se connecte ensuite avec le plugin Rojo
```

1. Ouvrir le jeu dans Studio et connecter le plugin Rojo.
2. Lancer [Claude Code](/setup/claude-code) à la racine du dépôt, et travailler dans les fichiers.
3. Tester dans Studio : F5 en solo, F6 avec plusieurs joueurs.
4. Avant de commiter, `selene src/` et `stylua src/`, puis `rojo build`, qui vérifie que le projet se construit.

L'interface du jeu est écrite avec React Lua, un vrai React (composants et hooks) porté en Luau : on la décrit dans le
code au lieu de la construire à la main dans Studio.

## Claude Code et le MCP de Studio

L'agent travaille sur les fichiers comme sur n'importe quel projet. Pour ce qui n'est pas du code, il passe par le
**serveur MCP officiel de Roblox Studio** : exécuter du Luau dans Studio, inspecter ou modifier des objets, insérer un
asset, lancer un test et lire la console, faire une capture. La règle est stricte : jamais de code par le MCP, puisque
Rojo l'écraserait au prochain changement.

Les tâches qui reviennent sont écrites en skills dans le dépôt du projet : créer un service ou un contrôleur, créer une
interface, ajouter un groupe, relire le code, publier. Plusieurs sessions de Claude Code peuvent travailler en même
temps sur le même dépôt ; la règle de chacune est d'ajouter ses fichiers explicitement au commit, sans jamais prendre
le travail d'une autre.

## Tester et publier

Les essais risqués se font dans un **jeu bac à sable** séparé, monté avec les mêmes outils et un autre port Rojo : il
peut lire le jeu principal, jamais le modifier. La publication suit une procédure, elle aussi décrite dans un skill :
vérifications, commit et étiquette de version, puis enregistrement et publication depuis Studio, et enfin redémarrage
des serveurs depuis le tableau de bord de Roblox pour que les joueurs reçoivent la nouvelle version.
