---
sidebar_position: 4
description: Mes revenus, fiches de paie, impôts et papiers administratifs, dans une appli 100 % locale que je pilote aussi avec un agent.
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
simple : **l'application n'envoie rien nulle part**. Pas de compte, pas de serveur, pas de synchronisation.

L'autre idée du projet, c'est que je ne saisis presque rien moi-même : un agent d'IA lit les documents et remplit
l'application à ma place, et je vérifie. C'est ce qui rend l'outil vraiment utilisable au quotidien.

Le dépôt est privé ; cette page décrit le fonctionnement de l'application, jamais son contenu.

## Ce que fait PayLedger

### Les revenus

On déclare d'abord ses activités : un emploi salarié, une activité indépendante, un projet annexe. Pour chaque emploi,
une fiche de paie par mois, avec les montants qui comptent (brut, net, imposable, impôt retenu à la source). Les autres
revenus ont leur propre suivi : un revenu attendu reste « à recevoir », avec sa devise d'origine, et n'entre dans les
totaux qu'une fois reçu. Les paiements d'impôts et de cotisations complètent le tableau. Pour une activité
indépendante, PayLedger tient le livre des recettes, imprimable ou exportable en CSV prêt pour un tableur.

### La déclaration

Chaque année fiscale a sa page. PayLedger additionne automatiquement les montants à reporter dans chaque case de la
déclaration, en gardant les lignes que j'ai saisies à la main. Il rapproche le récapitulatif annuel de l'employeur de
la somme des fiches de paie et signale le moindre écart, liste les justificatifs attendus pour l'année, puis produit
une page récapitulative à imprimer ou à enregistrer en PDF. Il prépare les chiffres ; il ne calcule pas l'impôt dû et
ne remplace pas un conseil fiscal.

### L'administratif

Les revenus s'accompagnent de démarches : des organismes avec leurs identifiants, des dossiers qui durent des mois,
des échéances à ne pas oublier. Chaque démarche a son journal daté, ses pièces et ses liens vers les écritures
concernées (un remboursement, un paiement). Les tâches ont une échéance, les notes s'écrivent en Markdown, et les
papiers réutilisables (pièce d'identité, relevé d'identité bancaire…) ont une date de validité qui déclenche une
alerte avant expiration.

### Les documents

Chaque justificatif est copié dans un coffre géré par l'application. Il y est rangé par son empreinte SHA-256 : un
même fichier n'est stocké qu'une fois, même rattaché à une fiche, à une démarche et à une déclaration. On l'importe par
glisser-déposer, l'application devine sa catégorie et sa date d'après son nom, et une visionneuse l'affiche sans
quitter PayLedger.

Autour de tout ça : un tableau de bord avec une carte « à traiter », une chronologie, une palette de commandes
(`Ctrl+K`) et un historique de toutes les modifications, avec leur origine.

## Avec un agent

Remplir ce genre d'application à la main est exactement le travail qu'on remet à plus tard : ouvrir un PDF, recopier
dix montants sans se tromper, ranger le fichier, recommencer le mois suivant. Avec un agent comme
[Claude Code](/tools/ai/coding/claude-code), la saisie devient une phrase, et je ne fais plus que vérifier.

| Je demande… | L'agent… |
|---|---|
| « Voici ma fiche de paie de septembre » | lit le PDF, saisit la fiche avec ses montants, importe le document et le rattache, puis me montre ce qu'il a saisi |
| « Prépare la déclaration de l'année » | lance la préparation, vérifie le rapprochement avec le récapitulatif de l'employeur, liste les justificatifs manquants et m'explique d'où vient chaque montant |
| « J'ai reçu un courrier de tel organisme » | crée ou complète la démarche, ajoute l'événement au journal, joint le scan et crée la tâche avec son échéance |
| « Combien d'impôt a été retenu cette année ? » | interroge la base en lecture seule et répond avec le détail |

Le CLI `payledger` est fait pour ça. Toutes ses commandes répondent en JSON ; `payledger docs` affiche un guide écrit
pour les agents (le modèle de données, les déroulés types, les règles), et `payledger schema` décrit chaque commande et
ses arguments, ce qui évite à l'agent de deviner. Une commande de requête SQL en lecture seule lui permet de répondre
à n'importe quelle question sans risque d'écrire. Il n'y a pas d'extraction automatique des PDF dans l'application :
c'est l'agent qui lit le document avec ses propres outils, ce qui marche avec n'importe quel format de fiche.

Le guide impose quelques règles, parce qu'une erreur ici a des conséquences : confirmer avant toute suppression, faire
un export complet avant une série d'écritures, ne jamais arrondir ni inventer un montant, et présenter la préparation
de la déclaration comme un brouillon à vérifier. Chaque modification faite par l'agent est marquée comme telle dans
l'historique : je sais toujours ce qui vient de lui.

## Comment c'est construit

<Diagram
  name="payledger-architecture"
  alt="L'appli de bureau et le CLI appellent la même bibliothèque Rust, qui écrit dans un fichier SQLite et dans le coffre de documents ; tout reste sur la machine."
/>

Toute la logique est dans une bibliothèque Rust, `payledger-core` : accès aux données, préparation de la déclaration,
livre des recettes, export, journal des modifications. L'application de bureau ([Tauri](/tools/dev/web-desktop/tauri)
2 et [React](/tools/dev/web-desktop/react)) et le CLI n'en sont que deux façades : rien ne peut se faire dans l'une
qui ne se fasse dans l'autre. C'est la même organisation que [CortX](/projects/cortx), et c'est ce qui permet à un
agent de tout faire par le CLI. Le CLI est d'ailleurs livré avec l'application et se met à jour avec elle.

Les données tiennent dans **un fichier SQLite**. Le choix est assumé : aucun service à installer, des transactions
fiables, et une sauvegarde qui se résume à copier un fichier. Les documents sont à côté, avec des chemins relatifs :
le dossier entier se déplace d'une machine à l'autre sans rien casser, et une variable d'environnement permet d'en
utiliser un autre, pratique pour essayer quelque chose sur une copie.

Le CLI et l'application travaillent en même temps sur la même base. L'application surveille le fichier SQLite :
quand l'agent écrit pendant qu'elle est ouverte, elle recharge ses données d'elle-même, et je vois la fiche apparaître
pendant que l'agent travaille.

## Sauvegarde et restauration

Un export produit une archive ZIP complète : une copie cohérente de la base, un fichier JSON par table (lisible sans
PayLedger), les documents, et un manifeste avec l'empreinte de chaque fichier. L'import propose trois modes :
remplacer, fusionner, ou essayer « à blanc » pour voir ce qui changerait sans rien écrire, et il fait une sauvegarde
automatique avant de commencer.

## Confidentialité

L'application elle-même n'envoie rien : pas de télémétrie, pas de compte, et son seul accès réseau est la
vérification de ses propres mises à jour, par un [relais](/setup/tauri-updates) puisque le dépôt est privé. Les données ne sont pas chiffrées par PayLedger : c'est le chiffrement du
disque du système qui les protège si la machine est volée.

Il y a une exception, et elle est voulue : **ce que je montre à l'agent passe par sa conversation**. Quand Claude lit
une fiche de paie ou le résultat d'une requête, ces informations sont envoyées au modèle, comme tout ce qu'on lui donne
à lire. C'est le prix de l'aide qu'il apporte, et c'est moi qui choisis ce qu'il voit, demande par demande.

## Où il en est

PayLedger en est à la version 0.7 (octobre 2026) et ne fonctionne pour l'instant que sous Windows. Il avance par
vagues, au rythme de l'année fiscale : le socle au printemps, la déclaration en été, l'administratif et le suivi des
paiements à la rentrée.
