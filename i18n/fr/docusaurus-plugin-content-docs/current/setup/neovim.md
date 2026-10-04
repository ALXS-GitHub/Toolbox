---
sidebar_position: 4
description: Ma configuration de Neovim, construite sur LazyVim, et ce qu'il faut savoir pour la faire tourner sous Windows.
image: lazyvim.png
---

# Neovim et LazyVim

[Neovim](/tools/dev/editors/neovim) me sert d'éditeur dans le terminal, à côté de [VS Code](/tools/dev/editors/vscode).
Plutôt que de tout configurer à la main, je pars de **LazyVim**, une distribution qui fournit des réglages par défaut
soignés, un gestionnaire de plugins et des « extras » à activer par langage ou par besoin. Ma configuration n'ajoute
que ce qui me manque et retire ce qui me gêne. Elle vit dans un dépôt privé, cloné dans `~\AppData\Local\nvim`.

Versions actuelles : Neovim 0.12, LazyVim 15.

## L'organisation

```text
nvim/
├── init.lua              # une ligne : charge config.lazy
├── lua/config/
│   ├── lazy.lua          # lazy.nvim, LazyVim et les extras
│   ├── options.lua       # options de l'éditeur
│   ├── keymaps.lua       # raccourcis
│   └── autocmds.lua      # actions automatiques
└── lua/plugins/          # un fichier par thème : code, couleurs, édition, Treesitter, interface
```

Les extras de LazyVim ne sont pas choisis dans l'interface (`:LazyExtras`) mais importés directement dans `lazy.lua` :
ils sont ainsi versionnés avec le reste.

| Extras | Pour |
|---|---|
| TypeScript, JSON, Tailwind, Rust, Python, Go | le support de mes langages (serveurs de langage, formatage) |
| ESLint, Prettier | vérification et mise en forme du web |
| yanky, dial, harpoon2, inc-rename | presse-papiers amélioré, incrément intelligent, marque-pages de fichiers, renommage en direct |
| mini-hipatterns, treesitter-context | couleurs surlignées, contexte de la fonction en haut de l'écran |

## Ce que j'ai ajusté

- **Complétion.** La complétion (blink.cmp) n'insère rien sans moi, affiche la documentation après un court délai,
  et montre l'élément sélectionné en texte fantôme.
- **Couleurs.** Rosé Pine par défaut, avec la transparence et quelques retouches pour les diffs et les titres Markdown.
  D'autres thèmes (Catppuccin, Tokyo Night, Kanagawa, Nightfox) se chargent à la demande depuis le sélecteur de
  LazyVim.
- **Édition.** nvim-surround pour entourer une sélection, un rendu Markdown directement dans l'éditeur, la fermeture
  automatique des balises HTML.
- **Interface.** L'écran d'accueil a un en-tête ASCII maison ; des raccourcis ouvrent lazygit (`<leader>gz`), la page
  GitHub du fichier (`<leader>gB`), un mode zen (`<leader>z`) et un brouillon (`<leader>.`).
- **Options.** Numéros de ligne relatifs, souris désactivée, découpages en bas et à droite, et la correction
  orthographique en français et en anglais, qui comprend le camelCase.

Les raccourcis viennent surtout de mes habitudes : `ss` et `sv` pour découper la fenêtre, `sh`, `sj`, `sk`, `sl` pour
passer de l'une à l'autre, `+` et `-` pour incrémenter un nombre, `Tab` pour changer d'onglet.

## Sous Windows

Deux réglages ne servent qu'à faire fonctionner LazyVim sous Windows :

- **Compiler Treesitter avec clang.** Treesitter compile ses analyseurs de syntaxe à l'installation. Avec le compilateur
  de MinGW, l'éditeur de liens échoue sur les chemins longs de Windows. Je force donc `clang`, installé avec le paquet
  `llvm` de [Scoop](/tools/dev/terminal/scoop), par une ligne dans `options.lua` : `vim.env.CC = "clang"`.
- **Retirer codelldb de Mason.** Le débogueur codelldb, que LazyVim installe pour Rust, échoue à l'installation sous
  Windows et bloque le démarrage : je le retire de la liste des outils installés automatiquement.

## L'installer

```powershell
scoop install neovim llvm
git clone <dépôt de configuration> $env:LOCALAPPDATA\nvim
nvim     # au premier lancement, lazy.nvim installe tous les plugins
```

Dans le terminal, `vim` est un alias de `nvim` (voir [Le terminal sous Windows](/setup/windows)).
