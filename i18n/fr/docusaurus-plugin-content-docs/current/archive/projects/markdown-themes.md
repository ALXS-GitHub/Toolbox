---
description: Des thèmes pour rédiger en Markdown avec un beau rendu, une extension VS Code et un export PDF.
repo: "https://github.com/ALXS-GitHub/Markdown-Themes"
status: archived
kind: project
stack: [CSS, JavaScript, Node.js]
---

# Markdown Themes

Entre 2023 et 2025, j'ai rédigé mes cours et mes notes en Markdown, et je voulais un rendu plus soigné que l'aperçu
par défaut : des thèmes, des encadrés colorés, un sommaire automatique, des notes de bas de page. C'est devenu trois
projets liés : des **thèmes**, une **extension VS Code** pour les utiliser confortablement, et un **convertisseur PDF**.
Je ne m'en sers plus aujourd'hui.

![Les encadrés colorés d'un thème : définition, note, avertissement, astuce…](/images/projects/markdown-themes-blocks.png)

## Les thèmes

[Markdown Themes](https://github.com/ALXS-GitHub/Markdown-Themes) contient les feuilles de style et les scripts. Un
document Markdown charge son thème par une seule ligne en tête de fichier, qui ajoute le style et les scripts
(sommaire, notes, maths, diagrammes). Les thèmes ajoutent leurs propres éléments : un plan automatique, des encadrés
(définition, note, avertissement, astuce, erreur…), des couleurs et du surlignage, des notes de bas de page regroupées
en fin de document, des grilles, des formules mathématiques et des diagrammes Mermaid stylés.

![Le plan généré automatiquement à partir des titres.](/images/projects/markdown-themes-plan.png)

## L'extension VS Code

[L'extension](https://github.com/ALXS-GitHub/Markdown-Themes-VSC-Extension) rendait les thèmes pratiques à utiliser
dans VS Code : près d'une centaine de commandes pour insérer un thème, une couleur, un encadré ou une grille, avec des
raccourcis clavier, et la conversion en PDF. Elle démarrait un petit serveur local qui servait les thèmes à l'aperçu
de VS Code : une modification d'un thème était visible tout de suite, sans attendre le cache d'un CDN. Elle n'a jamais
été publiée sur le Marketplace.

## Le convertisseur PDF

Le convertisseur transformait le Markdown en HTML (markdown-it et ses extensions, coloration du code, Mermaid), puis
l'imprimait en PDF avec Puppeteer, en pages A4 numérotées ou en une seule longue page. Il servait à la fois en ligne
de commande et dans l'extension. Son dépôt est privé.
