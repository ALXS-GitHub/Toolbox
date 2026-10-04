---
description: "Trouver des fichiers par leur nom, vite et sans options compliquées."
url: "https://github.com/sharkdp/fd"
status: active
kind: cli
platforms: [windows, macos, linux]
image: fd.png
---

# fd

fd retrouve des fichiers par leur nom. C'est l'équivalent moderne de `find`, avec de bons choix par défaut : il cherche
récursivement, accepte une expression régulière, ignore les fichiers cachés et tout ce que liste `.gitignore`, et
colore les résultats. Dans un projet, il ne renvoie donc que ce qui compte.

## Mon usage

```powershell
fd readme                  # tout ce qui contient « readme »
fd -e png                  # par extension
fd -t d src                # seulement les dossiers
fd -HI .env                # y compris fichiers cachés (-H) et ignorés (-I)
fd -e log -X rm            # agir sur tous les résultats d'un coup
```

`-x` exécute une commande pour chaque résultat, `-X` une seule fois avec tous les résultats ; `{}` désigne le chemin,
`{.}` le chemin sans extension. C'est souvent plus simple qu'une boucle PowerShell.

fd sert aussi de source à [fzf](/tools/dev/cli/fzf) (`fd | fzf`) pour choisir un fichier dans une liste, et complète
[ripgrep](/tools/dev/cli/ripgrep), qui cherche, lui, dans le contenu des fichiers.
