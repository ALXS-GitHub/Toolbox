---
description: "Mon éditeur graphique : une extension par langage, Vim dans les doigts, Claude Code dans le panneau."
url: "https://code.visualstudio.com/"
status: active
kind: app
platforms: [windows, macos, linux]
image: vscode.png
sidebar_position: 1
---

# Visual Studio Code

VS Code est mon éditeur graphique, à côté de [Neovim](/tools/dev/editors/neovim) dans le terminal. Léger, rapide, et
surtout extensible : chaque langage, chaque outil de mes projets a son extension, ce qui en fait l'éditeur qui couvre
tout, d'un mod Rocket League en Rust à un jeu Roblox en Luau.

## Mon usage

Je l'ouvre depuis le terminal avec l'alias `c` (le dossier courant). Les réglages qui comptent :

- **Vim** partout, avec l'extension VSCodeVim : `Espace` comme touche leader, presse-papiers du système, mêmes réflexes
  que dans Neovim.
- **Apparence** : le thème Rosé Pine Moon (le même que dans Neovim), les icônes Material, la police Hack Nerd Font
  dans le terminal intégré.
- **Un formateur par langage** : Prettier pour le web, Black pour Python,
  rust-analyzer pour Rust, StyLua pour Luau, tinymist pour [Typst](/tools/creation/documents/typst).
- **[Claude Code](/tools/ai/coding/claude-code)** dans le panneau latéral, pour voir ses modifications sous forme de
  diff directement dans l'éditeur.

## Les extensions qui comptent

| Pour | Extensions |
|---|---|
| Lire le code | Error Lens (les erreurs sur la ligne), Todo Tree, Better Comments, Code Spell Checker (+ français) |
| Git | GitLens, Git Graph, GitHub Pull Requests, GitHub Actions |
| Web | ESLint, Prettier, Deno |
| Rust | rust-analyzer, Dependi (versions des crates), CodeLLDB pour déboguer |
| Python | Python, Pylance, Black, Jupyter |
| Roblox | Rojo, Luau LSP, Selene, StyLua (voir [Développer sur Roblox](/setup/roblox)) |
| Divers | Excalidraw et Draw.io (schémas dans l'éditeur), Rainbow CSV, Hex Editor, Live Server |

Les extensions s'installent à la volée selon les projets ; la liste complète se récupère avec
`code --list-extensions`.
