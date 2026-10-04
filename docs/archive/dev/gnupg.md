---
description: "Encrypt and sign with GPG keys."
url: "https://gnupg.org/"
status: archived
replaced_by: 1Password (signature SSH)
kind: cli
platforms: [windows]
image: gnupg.png
---

# GnuPG

GnuPG is the free implementation of OpenPGP: you create a key pair to encrypt files, sign messages and, for a long time, sign your Git commits.

## Why I stopped

Git can now sign with an SSH key. Mine lives in [1Password](/tools/system/productivity/1password), which signs all my commits with no key on disk: no more GPG keyring to manage (see [Git and GitHub](/setup/git)).
