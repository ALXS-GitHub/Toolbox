---
origin: installed
category: dev
url: https://gnupg.org/
description: Free implementation of the OpenPGP standard for encryption and signing
use_state: active
os: Windows
sidebar_custom_props:
    image: /images/gnupg.png
---

# GnuPG

GnuPG (GPG) is the free implementation of the OpenPGP standard. It lets you encrypt files so only the intended recipient can read them, sign data so others can verify it came from you, and manage a keyring of public and private keys. If you sign Git commits, send encrypted emails, or verify software downloads, GPG is the tool doing the work.

## Installation

```powershell
scoop install gnupg
gpg --version
```

Alternatively, install [Gpg4win](https://www.gpg4win.org/) for a full Windows suite that includes a GUI key manager (Kleopatra) and Outlook plugin.

## Generating a key pair

Everything starts with a key pair. The private key stays on your machine, the public key gets shared with anyone who needs to verify your signatures or send you encrypted content.

```powershell
gpg --full-generate-key
```

GPG will walk you through algorithm selection, key size, and expiration. For most use cases, the defaults (ECC or RSA 3072+) work well. Pick a strong passphrase -- it protects your private key if the file is ever compromised.

Once generated, find your key ID:

```powershell
gpg --list-keys --keyid-format long
```

## Sharing your public key

Export your public key to a file so others can import it:

```powershell
gpg --armor --export you@example.com > publickey.asc
```

The `--armor` flag outputs ASCII text instead of binary, which is easier to share via email or paste into a web form. To import someone else's public key:

```powershell
gpg --import theirkey.asc
```

After importing, verify the fingerprint with the key owner out-of-band, then sign it to mark it as trusted:

```powershell
gpg --sign-key their@email.com
```

## Encrypting and decrypting files

Encrypt a file for a specific recipient. Only the holder of the corresponding private key can decrypt it:

```powershell
gpg --encrypt --recipient them@example.com document.pdf
```

This produces `document.pdf.gpg`. To decrypt a file encrypted for you:

```powershell
gpg --decrypt document.pdf.gpg > document.pdf
```

For symmetric encryption (password-based, no keys involved):

```powershell
gpg --symmetric document.pdf
gpg --decrypt document.pdf.gpg > document.pdf
```

## Signing files

A detached signature proves the file has not been tampered with and came from you:

```powershell
gpg --detach-sign --armor document.pdf
```

This creates `document.pdf.asc`. The recipient verifies it against the original file:

```powershell
gpg --verify document.pdf.asc document.pdf
```

You can also produce a cleartext signature (for text files or messages) where the content and signature live in the same file:

```powershell
gpg --clearsign message.txt
```

## Git commit signing

GPG is the standard way to sign Git commits and tags. Tell Git which key to use and enable signing by default:

```powershell
gpg --list-secret-keys --keyid-format long    # find your key ID
git config --global user.signingkey <KEY_ID>
git config --global commit.gpgsign true
git config --global tag.gpgsign true
```

On Windows you may also need to point Git to the GPG binary:

```powershell
git config --global gpg.program "C:/Users/<you>/scoop/apps/gnupg/current/bin/gpg.exe"
```

Signed commits show a "Verified" badge on GitHub once you add your public key to your GitHub account under Settings > SSH and GPG keys.

## Key management

Day-to-day commands for managing your keyring:

```powershell
gpg --list-keys                        # List all public keys
gpg --list-secret-keys                 # List your private keys
gpg --edit-key you@example.com         # Edit trust, expiry, add subkeys
gpg --delete-keys them@example.com     # Remove a public key
gpg --export-secret-keys --armor > private-backup.asc   # Backup private key
```

Keep a secure offline backup of your private key. If you lose it, anything encrypted to it is gone and your signing identity is unrecoverable.
