---
description: "Compresser et extraire tous les formats d'archives, au clic droit ou en ligne de commande."
url: "https://www.7-zip.org/"
status: active
kind: app
platforms: [windows]
image: 7zip.png
---

# 7-Zip

7-Zip ouvre à peu près tous les formats d'archives (zip, 7z, tar, gz, rar, iso…) et crée des archives 7z bien plus
compactes que le zip. Sous Windows, il s'ajoute au menu du clic droit, et sa commande `7z` sert dans les scripts.

## Mon usage

La plupart du temps, c'est un clic droit pour extraire. En ligne de commande :

```powershell
7z x archive.7z                  # extraire en gardant l'arborescence
7z a archive.7z dossier/         # créer une archive
7z a -mx=9 archive.7z dossier/   # compression maximale
7z l archive.zip                 # lister le contenu sans extraire
7z a -p -mhe=on secret.7z dossier/   # chiffrer, y compris la liste des fichiers
```

Pour zipper un dossier de projet sans ses `node_modules` et autres fichiers inutiles, j'ai plutôt un script global de
[CortX](/projects/cortx), `zip_it`, qui gère les exclusions.
