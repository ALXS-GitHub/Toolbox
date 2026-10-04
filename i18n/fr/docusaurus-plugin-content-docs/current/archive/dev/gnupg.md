---
description: "Chiffrer et signer avec des clés GPG."
url: "https://gnupg.org/"
status: archived
replaced_by: 1Password (signature SSH)
kind: cli
platforms: [windows]
image: gnupg.png
---

# GnuPG

GnuPG est l'implémentation libre d'OpenPGP : on crée une paire de clés pour chiffrer des fichiers, signer des messages et, longtemps, signer ses commits Git.

## Pourquoi je l'ai arrêté

Git sait maintenant signer avec une clé SSH. Ma clé vit dans [1Password](/tools/system/productivity/1password), qui signe tous mes commits sans aucune clé sur le disque : plus besoin de gérer un trousseau GPG (voir [Git et GitHub](/setup/git)).
