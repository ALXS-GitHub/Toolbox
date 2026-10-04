---
description: "Lire, filtrer et transformer du JSON en ligne de commande."
url: "https://jqlang.org/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: jq.png
---

# jq

jq est à JSON ce que `grep` et `sed` sont au texte : il lit du JSON, lui applique un filtre et ressort le résultat.
Comme tous mes outils récents répondent en JSON (`--json` dans les CLI de [Zorg](/projects/zorg/agents),
[CortX](/projects/cortx) ou `gh`), c'est l'outil qui permet d'en extraire exactement ce qu'il faut.

## Mon usage

```bash
cortx project list --json | jq -r '.[].name'               # une valeur par ligne, sans guillemets
gh pr list --json number,title | jq '.[] | select(.title | test("fix"))'
jq '.dependencies | keys' package.json                     # les clés d'un objet
jq '[.[] | {name, version}]' data.json                     # ne garder que certains champs
```

Les filtres s'enchaînent avec `|` : `.champ` lit un champ, `.[]` parcourt un tableau, `select()` filtre, `map()`
transforme. `-r` sort des valeurs brutes, `-c` du JSON compact sur une ligne, et `.champ // "défaut"` donne une valeur
de repli.

Pour mettre au point un filtre compliqué, le [bac à sable en ligne](https://play.jqlang.org/) est plus confortable que
le terminal.

Les agents d'IA s'en servent beaucoup : c'est souvent par `| jq` qu'ils réduisent une grosse réponse JSON à l'essentiel
avant de la lire.
