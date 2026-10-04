---
sidebar_position: 6
description: Releasing a Tauri app and having it update itself — even when its repository is private.
image: tauri.png
---

# Tauri app updates

Several of my desktop apps are built with [Tauri](/tools/dev/web-desktop/tauri): [CortX](/projects/cortx),
[Zorg](/projects/zorg), [PayLedger](/projects/payledger), [Souvenirs](/projects/souvenirs) and
[ALXS-RL-Mod](/projects/alxs-rl-mod). All of them update themselves with the same recipe: a version tag starts the build
on GitHub, which produces signed installers, and the installed app checks at start-up whether there is something
newer. The only difference comes from private repositories, which need a go-between.

<Diagram
  name="tauri-updates"
  alt="A version tag triggers GitHub Actions, which builds a signed release with latest.json; for a public repository the app reads it directly; for a private one it goes through a relay that holds a read-only token."
/>

## The principle

Tauri's updater plugin asks an address that returns a small file, `latest.json`: the latest version, its notes, and for
each system the installer's address and its **signature**. The app only installs it if the signature matches the
public key written in its configuration. Even if someone hijacked the address, they could not get anything else
installed.

## The signing key

```bash
bunx tauri signer generate -w ~/.tauri/my-app.key
```

The command produces a key pair. The **public key** goes into `tauri.conf.json`; the **private key** and its password
go into the GitHub repository's secrets, so the build can sign. The private key must never be committed, and it must be
backed up: losing it means never being able to update the apps already installed.

## In the app

```json
{
  "bundle": { "createUpdaterArtifacts": true },
  "plugins": {
    "updater": {
      "pubkey": "<public key>",
      "endpoints": ["<latest.json address>"]
    }
  }
}
```

On the Rust side, add the `updater` and `process` plugins (to restart the app), and only register the updater in
release builds, never in development. In the interface, check (`check()`), offer the update with its notes, download it
with a progress bar (`downloadAndInstall()`), then restart. Each app picks its moment: CortX checks a few seconds after
start-up and saves its windows' state before installing, Zorg checks at start-up then every four hours, ALXS-RL-Mod
offers a button in its settings.

## Building on GitHub

A GitHub Actions workflow runs on every `v*` tag. The official `tauri-action` builds the app for each system, signs the
installers with the private key from the secrets, generates `latest.json` and creates the release. I create it as a
**draft**:

1. bump the version in `package.json`, `Cargo.toml` and `tauri.conf.json`;
2. `git tag vX.Y.Z` then `git push origin vX.Y.Z`;
3. review the draft release, whose notes will show in the update dialog;
4. publish it.

As long as the draft is not published, no app sees the new version: it is a last check before everyone gets it.

## Public repository: nothing more

For a public repository such as CortX or ALXS-RL-Mod, the `latest.json` address is simply the latest release's:
`https://github.com/<account>/<repo>/releases/latest/download/latest.json`. GitHub serves the files to everyone.

## Private repository: a relay

For a private repository, a release's files can only be downloaded with an access token. Putting it in the app would
mean handing it to anyone who installs it. So a small **relay** sits between the two: it alone holds a token, limited to
reading that one repository, and the app asks it instead of GitHub.

I use two variants:

- **On Vercel** (Zorg, PayLedger): a function reads the latest release's `latest.json`, replaces the installers'
  addresses with its own, then serves the files by relaying them. The token is an environment variable of the Vercel
  project, and the answer is cached for a few minutes.
- **On a Cloudflare Worker** (Souvenirs): the relay builds the answer itself from the version the app reports, answers
  "nothing new" when it is up to date, and redirects downloads to GitHub's temporary addresses instead of passing the
  files through. It also serves an install page.

In both cases, changing the token is done without touching the app: replace the relay's variable.
