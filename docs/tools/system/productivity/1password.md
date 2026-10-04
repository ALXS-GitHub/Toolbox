---
description: "My passwords, SSH keys and commit signing, in one place."
url: "https://1password.com/"
status: active
kind: app
platforms: [windows, macos, linux, android, ios]
image: 1password.svg
sidebar_position: 1
---

# 1Password

1Password keeps my passwords, two-factor codes and sensitive notes, synced between the computer, the phone and the
browser. But what makes it central in my setup is its **SSH agent**.

## The SSH agent

My SSH key is nowhere on disk: it lives in 1Password, and its agent hands it to programs that ask, after a confirmation.
The same key pushes to GitHub and **signs all my commits**. On a new machine there is therefore no key to copy:
installing 1Password and turning on the agent is enough. The wiring with Git on Windows is described in
[Git and GitHub](/setup/git).

## What it replaces

[Bitwarden](/archive/system/bitwarden), in the archive.
