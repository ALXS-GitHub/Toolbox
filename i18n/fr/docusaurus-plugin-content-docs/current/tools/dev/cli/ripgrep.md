---
description: "Chercher du texte dans tout un projet, instantanément."
url: "https://github.com/BurntSushi/ripgrep"
status: active
kind: cli
platforms: [windows, macos, linux]
image: ripgrep.png
---

# ripgrep

ripgrep (`rg`) cherche un motif dans le contenu des fichiers, récursivement. Il est extrêmement rapide, respecte
`.gitignore` et saute les fichiers binaires et cachés : dans un projet, `rg motif` répond presque instantanément et ne
montre que ce qui compte. Il est écrit en Rust par Andrew Gallant ; VS Code l'utilise d'ailleurs pour sa recherche.

## Mon usage

```powershell
rg "TODO"                        # partout dans le projet
rg -i "erreur" src/              # sans tenir compte de la casse, dans un dossier
rg -F "console.log("             # chaîne littérale, sans expression régulière
rg -t ts "import"                # seulement les fichiers TypeScript
rg "panic!" -C 3                 # avec 3 lignes de contexte
rg -l "deprecated"               # seulement les noms de fichiers
```

C'est aussi l'outil de recherche des agents d'IA : quand Claude Code cherche où une fonction est utilisée, c'est
ripgrep qui travaille. Avec [fd](/tools/dev/cli/fd) pour les noms de fichiers et [fzf](/tools/dev/cli/fzf) pour choisir
dans les résultats, il remplace à lui seul `grep` et le `Select-String` de PowerShell.
