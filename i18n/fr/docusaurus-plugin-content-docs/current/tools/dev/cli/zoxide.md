---
description: Un cd qui apprend où je vais, et m'y emmène en deux lettres.
url: "https://github.com/ajeetdsouza/zoxide"
status: active
kind: cli
platforms: [windows, macos, linux]
image: zoxide.png
---

# zoxide

zoxide remplace `cd` par une commande qui se souvient des dossiers où je vais. Il note chaque dossier visité et le
classe selon la fréquence et la récence de mes passages ; ensuite, `z toolbox` m'emmène dans le dossier le mieux
classé dont le chemin contient « toolbox », d'où que je parte. C'est l'outil de terminal dont je me sers le plus sans
même y penser.

## Pourquoi zoxide

J'ai longtemps utilisé `z`, un module PowerShell qui faisait la même chose. Il marchait bien, mais seulement dans
PowerShell, et il fallait le charger à chaque ouverture du shell. zoxide est un petit binaire écrit en Rust : il
fonctionne à l'identique dans PowerShell, bash, zsh et fish, il répond instantanément même avec des milliers de
dossiers en mémoire, et il sait importer la base de `z` pour ne rien perdre au passage. L'ancienne fiche de
[z](/archive/dev/z) est dans l'archive.

## Mon installation

zoxide s'installe avec [Scoop](/tools/dev/terminal/scoop) (`scoop install zoxide`), puis doit être initialisé dans chaque
shell : c'est ce qui crée les commandes `z` et `zi` et branche le suivi des dossiers. Chez moi, cette initialisation
n'est pas écrite à la main dans le profil. Elle fait partie des alias que [CortX](/projects/cortx) génère
pour tous mes shells avec `cortx init`, ce qui garde PowerShell, bash et les autres synchronisés. Sur une machine sans
CortX, la ligne à ajouter au profil PowerShell est la suivante :

```powershell
Invoke-Expression (& { (zoxide init powershell | Out-String) })
```

Pour bash ou zsh, l'équivalent est `eval "$(zoxide init bash)"` (ou `zsh`) dans le fichier de démarrage du shell.

## Au quotidien

Deux commandes suffisent : `z` saute directement au meilleur résultat, et `zi` ouvre une liste interactive, avec
[fzf](/tools/dev/cli/fzf), quand plusieurs dossiers se ressemblent.

```powershell
z toolbox        # le dossier le plus fréquenté dont le chemin contient « toolbox »
z perso tool     # plusieurs mots : ils doivent apparaître dans cet ordre dans le chemin
zi doc           # choisir parmi les candidats, avec fzf
z -              # revenir au dossier précédent
```

Les premiers jours, zoxide ne connaît rien : il faut être passé une fois dans un dossier pour qu'il le retienne. Après
une semaine, il ne se trompe presque plus. Quand un dossier a disparu ou ne sert plus, `zoxide remove <chemin>` le
retire de la base, et `zoxide query --list --score` affiche le classement pour comprendre un choix inattendu.

## Ce qu'il remplace

Il remplace d'abord `z`, avec le même principe mais sans la limite à PowerShell. Il rend aussi inutiles la plupart des
alias de navigation que j'écrivais à la main pour aller dans mes dossiers de projets : je n'en garde qu'un ou deux par
habitude.
