---
sidebar_position: 4
description: Mes revenus, fiches de paie, impôts et papiers administratifs, dans une appli 100 % locale.
status: active
kind: project
platforms: [windows]
stack: [Tauri 2, Rust, SQLite, React]
image: payledger.png
---

# PayLedger

Les fiches de paie, les revenus, les impôts et les papiers qui vont avec finissent souvent éparpillés entre des PDF,
des tableurs et des dossiers. PayLedger les réunit dans une application de bureau, et m'aide à préparer chaque année
la déclaration de revenus. Comme ce sont des données parmi les plus sensibles qui soient, la règle de départ est
simple : **tout reste sur la machine**. Pas de compte, pas de serveur, pas de synchronisation.

Le dépôt est privé ; cette page décrit le fonctionnement de l'application, jamais son contenu.

## Ce que fait PayLedger

**Les revenus.** Des activités (salariée ou indépendante), des fiches de paie mensuelles avec leurs montants (brut,
net, imposable, impôt retenu), les autres revenus avec le suivi de ceux qui restent à recevoir, et les paiements
d'impôts et de cotisations. Pour une activité indépendante, un livre des recettes s'imprime ou s'exporte en CSV.

**La déclaration.** Une page par année fiscale. PayLedger additionne les montants à reporter sur chaque case de la
déclaration, rapproche le récapitulatif annuel de l'employeur de la somme des fiches de paie (et signale les écarts),
liste les justificatifs attendus et produit une page récapitulative à imprimer. Il prépare les chiffres, il ne
calcule pas l'impôt : ce n'est pas un conseil fiscal.

**L'administratif.** Les organismes, les démarches avec leur journal daté et leurs pièces, les tâches et échéances,
des notes, et les papiers réutilisables (identité, relevés…) avec une alerte avant leur date d'expiration.

**Les documents.** Chaque justificatif est copié dans un coffre géré par l'application et rangé par son empreinte
SHA-256 : un même fichier n'est stocké qu'une fois, même rattaché à plusieurs éléments. Un tableau de bord, une
chronologie et un historique de toutes les modifications complètent l'ensemble.

## Comment c'est construit

<Diagram
  name="payledger-architecture"
  alt="L'appli de bureau et le CLI appellent la même bibliothèque Rust, qui écrit dans un fichier SQLite et dans le coffre de documents ; tout reste sur la machine."
/>

Toute la logique est dans une bibliothèque Rust, `payledger-core` : accès aux données, calculs de la déclaration,
export, journal des modifications. L'application de bureau ([Tauri](/tools/dev/web-desktop/tauri) 2 et
[React](/tools/dev/web-desktop/react)) et le CLI `payledger` n'en sont que deux façades : ils ne font rien que l'autre
ne puisse faire. C'est la même organisation que [CortX](/projects/cortx).

Les données tiennent dans **un fichier SQLite**. Le choix est assumé : aucun service à installer, des transactions
fiables, et une sauvegarde qui se résume à copier un fichier. Les documents sont à côté, dans le coffre, avec des
chemins relatifs : le tout se déplace d'une machine à l'autre sans rien casser.

Le CLI et l'application peuvent travailler en même temps sur la même base. L'application surveille le fichier
SQLite : quand le CLI (ou un agent) y écrit, elle recharge ses données d'elle-même.

Une sauvegarde complète produit une archive ZIP : une copie cohérente de la base, un fichier JSON par table, les
documents, et un manifeste avec les empreintes de chaque fichier. L'import propose un mode « à blanc » pour vérifier
avant d'écrire, et fait une sauvegarde automatique avant chaque import.

## Avec un agent

Le CLI est pensé pour être utilisé par un agent d'IA : sortie JSON, une commande `schema` qui décrit toutes les
commandes et leurs arguments, une commande `docs` qui affiche le guide d'utilisation pour agents, et une commande de
requête SQL en lecture seule. Il n'y a pas d'extraction automatique des fiches de paie : pour en saisir une, l'agent
lit le PDF avec ses propres outils, puis appelle le CLI avec les montants. Le guide lui impose quelques règles :
confirmer avant toute suppression, faire un export avant une série d'écritures, ne jamais arrondir ni inventer un
montant.

## Confidentialité et limites

Rien ne quitte la machine : pas de télémétrie, pas de compte, et le seul accès réseau est la vérification des mises à
jour de l'application. Chaque modification est journalisée avec sa source (interface, CLI ou agent). Les données ne
sont pas chiffrées par l'application : c'est le chiffrement du disque du système qui les protège en cas de vol de la
machine. L'application ne fonctionne pour l'instant que sous Windows.

## Où il en est

PayLedger en est à la version 0.7 (octobre 2026). Il avance par vagues, au rythme des besoins de l'année fiscale.
