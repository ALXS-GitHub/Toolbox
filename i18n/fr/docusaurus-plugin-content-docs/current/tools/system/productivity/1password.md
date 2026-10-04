---
description: "Mes mots de passe, mes clés SSH et la signature de mes commits, au même endroit."
url: "https://1password.com/"
status: active
kind: app
platforms: [windows, macos, linux, android, ios]
image: 1password.svg
sidebar_position: 1
---

# 1Password

1Password garde mes mots de passe, mes codes à deux facteurs et mes notes sensibles, synchronisés entre l'ordinateur, le
téléphone et le navigateur. Mais ce qui le rend central dans mon environnement, c'est son **agent SSH**.

## L'agent SSH

Ma clé SSH ne se trouve nulle part sur le disque : elle vit dans 1Password, et son agent la fournit aux programmes qui la
demandent, après une confirmation. La même clé sert à pousser sur GitHub et à **signer tous mes commits**. Sur une
nouvelle machine, il n'y a donc aucune clé à copier : installer 1Password et activer l'agent suffit. Le câblage avec Git
sous Windows est décrit dans [Git et GitHub](/setup/git).

## Ce qu'il remplace

[Bitwarden](/archive/system/bitwarden), dans l'archive.
