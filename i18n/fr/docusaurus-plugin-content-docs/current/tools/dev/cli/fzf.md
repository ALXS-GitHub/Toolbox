---
description: "Transformer n'importe quelle liste en sélection interactive, avec une recherche floue."
url: "https://github.com/junegunn/fzf"
status: active
kind: cli
platforms: [windows, macos, linux]
image: fzf.png
---

# fzf

fzf prend une liste sur son entrée — des fichiers, des branches, des commits, n'importe quoi — et la transforme en une
sélection interactive avec recherche floue : on tape quelques lettres, la liste se filtre, Entrée renvoie le choix. Il
ne fait rien d'autre, et c'est ce qui le rend si utile : c'est une brique qu'on branche partout.

## Où je m'en sers

Je l'utilise surtout à travers d'autres outils :

- **`zi`** de [zoxide](/tools/dev/cli/zoxide) pour choisir parmi les dossiers qui se ressemblent ;
- **`omp-theme` et `omp-color`**, mes commandes de changement de thème du prompt
  ([Oh My Posh](/tools/dev/terminal/oh-my-posh)) ;
- dans mes scripts, dès qu'il faut demander « lequel ? ».

Et directement, pour les choix ponctuels :

```powershell
git branch | fzf                        # choisir une branche
fd -e md | fzf --preview "bat {}"       # choisir un fichier, avec un aperçu
code (fzf)                              # ouvrir le fichier choisi dans VS Code
```

Dans la recherche, `'mot` impose une correspondance exacte, `^début` et `fin$` ancrent, et `!mot` exclut.

## Ce que je n'utilise plus

Le module PSFzf ajoutait à PowerShell des raccourcis comme `Ctrl+R` pour chercher dans l'historique avec fzf. Je ne le
charge plus : les suggestions de PSReadLine et le terminal de [CortX](/projects/cortx) couvrent ce besoin.
