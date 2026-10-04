---
sidebar_position: 9
description: Laisser l'agent naviguer sur un site pour moi, avec deux façons de piloter Chrome.
---

# Le navigateur

Certaines tâches se passent sur un site web : remplir une démarche en ligne, récupérer une information derrière une
connexion, vérifier le rendu d'une appli que je développe. Claude Code peut piloter Chrome de deux façons, et je
garde les deux parce qu'elles ne servent pas au même moment.

## L'extension Claude pour Chrome

C'est le premier choix. L'extension officielle relie Claude Code au Chrome que j'utilise déjà, avec mes sessions
ouvertes : l'agent ouvre un onglet, lit la page, clique, remplit des champs, fait des captures. Elle s'installe une
fois depuis le Chrome Web Store, et Claude Code la trouve tout seul tant que Chrome est ouvert.

## Un CLI par le port de debug

Quand l'extension n'est pas connectée, ou pour une tâche plus mécanique, un skill passe par un petit CLI qui pilote
Chrome à travers son port de debug (le protocole CDP). Chrome doit alors avoir été lancé avec
`--remote-debugging-port=9222` ; si le port ne répond pas, la consigne est de me le dire plutôt que de réessayer en
boucle.

```bash
dev-browser --connect http://localhost:9222 <<'EOF'
  const pages = await browser.listPages();
  console.log(JSON.stringify(pages, null, 2));
EOF
```

L'agent écrit un court script, exécuté dans un bac à sable JavaScript isolé : ni Node, ni modules, ni accès réseau
en dehors du navigateur, seulement de quoi enregistrer une capture ou un fichier. L'API est proche de Puppeteer :
lister les onglets, naviguer, cliquer, lire le DOM, faire une capture.

## Je reste aux commandes

Dans les deux cas, la règle est la même : l'agent prépare, je valide. Il peut remplir un formulaire administratif,
mais ne clique sur aucun bouton irréversible (valider, signer, envoyer, payer) : je le fais moi-même après avoir
relu. Il ne saisit jamais un mot de passe, un numéro de carte ou un code d'authentification. Une connexion à faire, un code reçu par SMS, une étape de vérification : il me la
laisse.
