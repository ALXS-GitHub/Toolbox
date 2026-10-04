---
description: "Tout Python en un seul outil, très rapide : versions, environnements, dépendances, scripts."
url: "https://docs.astral.sh/uv/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: uv.png
sidebar_position: 4
---

# uv

uv remplace pip, venv, pipx et pyenv par un seul outil, écrit en Rust et extrêmement rapide. C'est par lui que passe
tout ce que je fais en [Python](/tools/dev/languages/python).

## Mon usage

Son meilleur atout pour moi, ce sont les **scripts autonomes** : un script Python déclare ses dépendances dans un
commentaire en tête de fichier, et `uv run` les installe dans un environnement jetable avant de l'exécuter. Mes scripts
globaux de [CortX](/projects/cortx) fonctionnent tous ainsi : aucun environnement à créer, rien à installer à l'avance.

```python
# /// script
# dependencies = ["pillow"]
# ///
```

```bash
uv run script.py               # exécuter un script avec ses dépendances
uv init && uv add requests     # un projet, avec son environnement et son verrou
uvx ruff check .               # lancer un outil sans l'installer
```
