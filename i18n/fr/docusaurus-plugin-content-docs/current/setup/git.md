---
sidebar_position: 3
description: Des commits toujours signés, une clé SSH qui ne quitte jamais 1Password, et les conventions de mes dépôts.
image: git.png
---

# Git et GitHub

Deux principes guident ma configuration de [Git](/tools/dev/version-control/git) : **chaque commit est signé**, et **la
clé ne vit nulle part sur le disque**. Les deux reposent sur la même pièce, l'agent SSH de mon gestionnaire de mots de
passe. Ce guide montre comment c'est branché sous Windows, ce qui a un piège ou deux, puis les outils et conventions qui
vont autour.

<Diagram
  name="git-signing"
  alt="git commit signe avec op-ssh-sign et git push passe par l'OpenSSH de Windows ; les deux s'adressent à l'agent SSH de 1Password, qui garde la clé, puis le dépôt GitHub reçoit des commits vérifiés."
/>

## Une seule clé, dans 1Password

La même clé SSH sert à deux choses : s'authentifier auprès de GitHub pour pousser, et signer les commits. Elle est
stockée dans 1Password, et son agent SSH la met à disposition des programmes qui la demandent, après une autorisation
(empreinte, Windows Hello ou mot de passe). Sur une nouvelle machine, il n'y a donc aucune clé à copier : il suffit
d'installer 1Password et d'activer son agent SSH.

Sous Windows, l'agent de 1Password se présente comme un *pipe* nommé, le même que celui de l'agent SSH de Windows. Il
faut donc **désactiver le service `ssh-agent` de Windows**, sinon il prend la place.

## La configuration de Git

Voici l'essentiel de mon `~/.gitconfig` (l'adresse et la clé publique sont propres à chacun) :

```ini
[user]
    name = ALXS-GitHub
    email = <adresse>
    signingkey = <clé publique SSH>
[gpg]
    format = ssh
[gpg "ssh"]
    program = <chemin de op-ssh-sign.exe>
[commit]
    gpgsign = true
[core]
    sshCommand = C:/Windows/System32/OpenSSH/ssh.exe
```

**La signature.** `gpg.format = ssh` dit à Git de signer avec une clé SSH plutôt qu'avec GPG, et `commit.gpgsign`
rend la signature systématique. Git délègue l'opération à `op-ssh-sign`, le petit programme fourni par 1Password, qui
demande la signature à l'agent : la clé privée ne passe jamais par Git. Avec la version de 1Password installée depuis
le Microsoft Store, ce programme est un alias d'exécution situé dans `%LOCALAPPDATA%\Microsoft\WindowsApps`.

**Le push.** Git pour Windows embarque son propre `ssh`, qui ne sait pas parler à un *pipe* nommé Windows : avec lui,
les clés de 1Password sont invisibles et le push échoue. `core.sshCommand` force l'OpenSSH fourni avec Windows, qui
passe bien par l'agent. C'est le piège principal de cette configuration.

**Côté GitHub,** la même clé publique est déclarée deux fois dans les réglages du compte : comme clé d'authentification
et comme clé de signature. GitHub affiche alors chaque commit comme « vérifié ».

## Vérifier une signature en local

Sans réglage supplémentaire, `git log --show-signature` répond que `allowedSignersFile` n'est pas configuré : Git sait
signer avec SSH, mais il lui faut une liste des clés auxquelles faire confiance pour vérifier. On la crée une fois :

```bash
echo "<adresse> <clé publique SSH>" > ~/.ssh/allowed_signers
git config --global gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
git log --show-signature -1
```

## GitHub CLI et lazygit

Pour tout ce qui touche à GitHub sans passer par le navigateur (dépôts, pull requests, releases, API), j'utilise
[`gh`](/tools/dev/version-control/github), sans extension. Les agents s'en servent aussi beaucoup : c'est par lui que
Claude Code lit une pull request ou consulte une release.

Au quotidien, l'essentiel de git passe par [lazygit](/tools/dev/cli/lazygit), lancé avec l'alias `lg` ou depuis
[Neovim](/setup/neovim). Il garde sa configuration par défaut.

## Conventions de commit

Mes dépôts suivent presque tous les *commits conventionnels* (`feat(scope): …`, `fix: …`, `docs: …`), en français ou
en anglais selon le projet. Quand le travail vient d'un ticket, le message porte sa référence, ce qui relie l'historique
git aux tickets de [Zorg](/projects/zorg). La règle de chaque projet est écrite dans son `CLAUDE.md`, pour que les
agents la suivent aussi : certains projets demandent de commiter et pousser directement sur `main` une fois le build
validé, d'autres de toujours demander.

## Les hooks

Les hooks partagés vivent dans le dépôt, dans un dossier `.githooks`, et s'activent une fois par clone :

```bash
git config core.hooksPath .githooks
```

Deux de mes dépôts en ont un : celui de ma [config Claude Code](/setup/claude-code/guardrails), qui bloque toute fuite
de secret, et celui de ce site, qui vérifie les métadonnées des pages et refuse toute information personnelle avant
la publication.
