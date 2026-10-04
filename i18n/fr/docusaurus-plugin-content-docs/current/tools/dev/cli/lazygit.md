---
description: "Git au clavier, dans une interface en mode texte : indexer, commiter, réécrire l'historique."
url: "https://github.com/jesseduffield/lazygit"
status: active
kind: cli
platforms: [windows, macos, linux]
image: lazygit.png
---

# lazygit

lazygit est une interface en mode texte pour [Git](/tools/dev/version-control/git). Tout ce qui est pénible en ligne
de commande — indexer une partie d'un fichier, réécrire les derniers commits, résoudre un conflit — se fait au clavier
en voyant ce qu'on fait. C'est ainsi que je fais l'essentiel de mon git au quotidien.

## Mon usage

Je l'ouvre avec l'alias `lg` dans le terminal, ou avec `<leader>gz` depuis [Neovim](/setup/neovim). Il garde sa
configuration par défaut.

| Touche | Action |
|---|---|
| `Espace` | indexer / désindexer le fichier (ou la ligne, dans le détail) |
| `a` | tout indexer |
| `c` | commiter |
| `P` / `p` | pousser / tirer |
| `e` (sur un commit) | rebase interactif à partir de ce commit |
| `s`, `r`, `d` | fusionner dans le précédent, renommer, supprimer un commit |
| `z` | annuler la dernière action |
| `?` | toutes les touches du panneau courant |

L'intérêt principal est l'aperçu : en parcourant les fichiers modifiés, on voit le diff de chacun avant de décider de
l'indexer, et on peut n'indexer que certaines lignes. Le rebase interactif, qui demande d'éditer un fichier texte en
ligne de commande, devient une suite de touches réversibles.

Les commits partent signés comme d'habitude : lazygit appelle Git, qui passe par 1Password (voir
[Git et GitHub](/setup/git)).
