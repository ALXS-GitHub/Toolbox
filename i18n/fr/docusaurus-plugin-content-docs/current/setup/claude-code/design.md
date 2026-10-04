---
sidebar_position: 6
description: Un design commun, défini une seule fois, pour tous les documents, pages, docs et schémas.
---

# La chaîne documentaire

Les quatre skills de production (`documents`, `pages`, `doc-site` et `diagrams`) partagent un même design : les
mêmes couleurs, la même police, les mêmes encadrés et tableaux, en clair comme en sombre. Ce design est défini à un
seul endroit, un dossier `_design`, puis recopié dans chaque skill. Cette page explique pourquoi on le recopie,
comment, et ce que vérifient les scripts au passage.

<Diagram
  name="harness-design"
  alt="Les variables, thèmes et composants du design commun passent par build.py, qui les copie dans les quatre skills ; le script de chaque skill injecte le design et un navigateur sans interface produit le HTML, le PDF et le PNG."
/>

## Une source, des copies

Il serait plus simple que chaque skill lise le design directement dans `_design`. C'est impossible sur claude.ai : un
skill y est un dossier isolé, qui ne voit pas les fichiers d'un autre. Chaque skill embarque donc **sa propre copie**
du design, et `_design` n'est pas un skill : il n'est jamais envoyé nulle part.

Pour que ces copies ne divergent pas, on ne les modifie jamais à la main. Elles portent un en-tête « généré, ne pas
modifier », et la seule façon de les changer est de modifier la source puis de relancer `build.py`.

## Ce que contient le design

| Fichier | Rôle |
|---|---|
| `variables.json` | le contrat : chaque variable (couleurs, polices, rayons…) avec son usage et sa valeur en clair et en sombre ; il porte aussi la version du design |
| `themes/*.json` | un thème ne contient que ce qu'il change par rapport au contrat |
| `components.css` | les composants communs (encadrés, tableaux, étapes, cartes…), écrits uniquement avec des variables |
| `components.md` | le catalogue de ces composants, avec leur HTML exact : c'est ce que lit l'agent |
| police et outils | Inter, embarquée dans chaque fichier, et quelques fonctions Python partagées (injection, rendu dans le navigateur, captures) |

Comme les composants n'utilisent que des variables, un thème ou le mode sombre change tout d'un coup. N'importe quel
bloc peut même changer de thème localement, avec un attribut `data-theme`.

## build.py vérifie, puis recopie

Le script de build calcule les valeurs complètes de chaque thème, génère la feuille de style, puis contrôle avant de
recopier :

- les **contrastes** du texte sur ses fonds, en clair et en sombre (au moins 4,5:1) ;
- l'absence de **couleur écrite en dur** dans les composants ;
- l'absence de **variable inconnue** dans un thème.

Avec `--check`, il ne touche à rien et signale seulement les copies périmées.

## Le rendu, contrôlé lui aussi

Chaque skill a son script de rendu. Il injecte le design dans le fichier produit (qui devient autonome et s'ouvre hors
ligne), ajoute ce qui est propre au skill (numérotation et sommaire pour un document, recherche et navigation pour une
doc), puis ouvre le résultat dans un navigateur sans interface (Chrome, Edge ou un autre Chromium) pour le vérifier et
l'exporter. Les contrôles portent sur
la forme et sur le fond : rien ne déborde, aucun lien de schéma ne passe en diagonale, et un document doit contenir
du vrai texte rédigé (une section de document qui n'aligne que des tableaux est refusée). Tant qu'un point reste à
corriger, le script le dit et l'agent recommence.

## Deux règles d'entretien

Ne jamais modifier une copie, toujours la source ; et ne jamais renommer une variable ou un composant, puisque des
fichiers déjà produits s'en servent. On en ajoute, on n'en retire pas. Le circuit complet après un changement est
décrit dans [Entretien](/setup/claude-code/maintenance).
