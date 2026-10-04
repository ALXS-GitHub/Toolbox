---
description: "Un gestionnaire de fichiers dans le terminal, rapide, avec des aperçus."
url: "https://yazi-rs.github.io/"
status: active
kind: cli
platforms: [windows, macos, linux]
image: yazi.png
---

# yazi

yazi est un gestionnaire de fichiers en mode texte : trois colonnes (le dossier parent, le dossier courant, un aperçu),
qu'on parcourt au clavier. Il est écrit en Rust et tout y est asynchrone : un dossier de dix mille fichiers défile aussi
vite qu'un dossier de dix, et les aperçus d'images ou de code se chargent sans bloquer la navigation.

## Mon usage

Je le lance avec `y`, une petite fonction générée par [CortX](/projects/cortx) : quand je quitte yazi, le shell se place
dans le dernier dossier visité. yazi devient ainsi une façon visuelle de faire `cd`, plutôt qu'un programme à part.

```powershell
y              # parcourir, puis q pour quitter… dans le dossier atteint
```

Je m'en sers pour ce qui est plus simple à voir qu'à taper : explorer un dossier inconnu, trier des fichiers, renommer
ou supprimer en lot, regarder une image ou un PDF sans ouvrir d'application. Il garde sa configuration par défaut.

Avec [lazygit](/tools/dev/cli/lazygit) pour git et [Neovim](/setup/neovim) pour l'édition, il complète un ensemble
d'outils en mode texte qui évitent de quitter le terminal.

Les aperçus d'images demandent un terminal qui sait les afficher ; c'est le cas de celui de CortX.
