---
description: "Les petites commandes qui rendent le terminal plus agréable, en une page."
status: active
kind: cli
platforms: [windows, macos, linux]
---

# Les petits outils

Certaines commandes ne méritent pas une page chacune, mais je ne m'en passerais pas. Elles s'installent toutes avec
[Scoop](/tools/dev/terminal/scoop), sont écrites pour la plupart en Rust, et remplacent avantageusement un outil plus
ancien.

| Outil | Pour | Remplace |
|---|---|---|
| **bat** | afficher un fichier avec la coloration syntaxique, les numéros de ligne et l'état git | `cat` |
| **bottom** (`btm`) | surveiller processeur, mémoire, disque, réseau et processus, en graphiques | le gestionnaire des tâches, `top` |
| **dust** | voir ce qui prend de la place dans un dossier, sous forme d'arbre | `du` |
| **duf** | l'espace libre de chaque disque, dans un tableau lisible | `df` |
| **tokei** | compter les lignes de code d'un projet, par langage | `cloc` |
| **tealdeer** (`tldr`) | des exemples concrets d'une commande, plutôt que sa page de manuel | `man` |
| **glow** | lire un fichier Markdown mis en forme dans le terminal | — |
| **hyperfine** | mesurer et comparer le temps d'exécution de commandes, avec statistiques | `time` |
| **sd** | rechercher-remplacer dans des fichiers, avec une syntaxe simple | `sed` |
| **fastfetch** | le résumé de la machine (système, processeur, mémoire) à l'ouverture d'un terminal | `neofetch` |
| **yt-dlp** | télécharger une vidéo ou extraire l'audio d'un site de vidéos | — |

## Quelques usages

```powershell
bat src/main.rs                    # lire un fichier, coloré
dust -d 2                          # les plus gros dossiers, sur deux niveaux
tldr tar                           # « comment on fait déjà… »
hyperfine "rg TODO" "grep -r TODO" # comparer deux commandes
sd "ancien" "nouveau" src/*.ts     # remplacer dans plusieurs fichiers
yt-dlp -x --audio-format mp3 <url> # garder seulement l'audio
```

**fastfetch** s'affiche à chaque ouverture de terminal, avec un logo en ASCII maison ; c'est
[CortX](/projects/cortx) qui le lance, avec le reste de l'initialisation du shell. **hyperfine** me sert à vérifier
qu'une optimisation en est vraiment une, par exemple dans mes solutions d'[Advent of Code](/projects/challenges).
