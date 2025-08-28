---
type: downloaded
category: dev
url: https://www.warp.dev/
location: ~\AppData\Roaming\warp\Warp
description: Terminal
state: actual
---

# Warp

Warp est une interface de terminal intelligent

## Themes

Pour mettre en place les themes custom pour warp il faut faire les manipulations suivantes. (Bien qu’il existe déjà une compatibilité avec les themes powershell (par exemple la compatibilité avec la configuration oh-my-posh déjà présente dans powershell) il n’y a pas de compatibilité avec le fond d’écran du terminal)

Il faut déjà vérifier que le dossier de theme existe à l’emplacement `~\AppData\Roaming\warp\Warp`

```bash
cd <path-to-warp>
git clone https://github.com/warpdotdev/themes.git
```

Ensuite voici les instructions de la documentation officielle : https://docs.warp.dev/appearance/custom-themes

Les themes peuvent être placés dans des sous dossiers.

On peut associer les images du background depuis la config yaml (voir doc)

On peut aussi créer des thèmes directement depuis l’interface Warp `Themes > +` . Cependant avec cette méthode les thèmes sont placés directement dans le dossier `/themes` . Je recommande personnellement d’aller ouvrir le dossier `~\AppData\Roaming\warp\Warp\themes` et de mettre l’image et le fichier yaml dans le sous dossier `my_themes` pour avoir une meilleure organisation.

⚠️ Lorsque l’on met un theme dans un sous dossier et qu’il a une image associée, il ne faut pas oublier de modifier le fichier yaml pour spécifier le chemin du sous dossier de l’image (car le chemin est par défaut pris à partir de `/themes` donc on change le chemin de l’image en `<nom_sous_dossier>/<nom_image>` ou alors on peut aussi mettre le chemin absolu).

⚠️ A part les couleurs d’accent, foreground et background, la création automatique du theme ne change pas les autres couleurs de prompt. Il faut alors le faire à la main. 

On peut trouver les couleurs de prompt par défaut dans l’application terminal puis settings puis ouvrir le fichier JSON. Sinon j’ai personnellement crée un fichier `my_themes\half_one_dark_modded` qui contient des couleurs de base que j’utilise par défaut.

## Themes Perso

Mes thèmes perso sont sur le git suivant : 

[https://github.com/ALXS-GitHub/Warp-Themes](https://github.com/ALXS-GitHub/Warp-Themes)