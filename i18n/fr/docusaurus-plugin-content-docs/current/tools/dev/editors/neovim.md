---
description: "Mon éditeur dans le terminal, à partir de LazyVim."
url: "https://neovim.io/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: neovim.png
sidebar_position: 2
---

# Neovim

Neovim est la version moderne de Vim : le même mode d'édition au clavier, avec une configuration en Lua, un vrai
écosystème de plugins et la prise en charge native des serveurs de langage (complétion, définitions, erreurs). C'est mon
éditeur dans le terminal, pour modifier vite un fichier sans quitter le shell, ou pour travailler longtemps sans souris.

## Mon usage

Je ne pars pas de zéro : ma configuration est construite sur **LazyVim**, une distribution qui fournit de bons réglages
par défaut et des « extras » à activer par langage. Je l'ouvre avec `vim` (un alias), j'y lance
[lazygit](/tools/dev/cli/lazygit) avec `<leader>gz`, et ses thèmes suivent ceux de [VS Code](/tools/dev/editors/vscode)
(Rosé Pine).

L'organisation de ma configuration, ce que j'y ai ajusté et les deux réglages indispensables sous Windows sont décrits
dans le guide **[Neovim et LazyVim](/setup/neovim)**.

## L'installer

```powershell
scoop install neovim llvm      # llvm fournit clang, nécessaire à Treesitter sous Windows
```
