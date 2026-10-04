---
description: "Des documents mis en page avec un langage simple, compilés instantanément."
url: "https://typst.app/"
status: active
kind: language
image: typst.png
---

# Typst

Typst est un langage de mise en page de documents, pensé comme un successeur moderne de LaTeX : une syntaxe proche du
Markdown pour le texte, un vrai langage de programmation pour les modèles, et une compilation si rapide que l'aperçu se
met à jour pendant la frappe.

## Mon usage

Je l'écris dans [VS Code](/tools/dev/editors/vscode) avec l'extension **tinymist**, qui embarque le compilateur, affiche
l'aperçu à côté du code et exporte en PDF : rien d'autre à installer. Je m'en sers pour les documents qui doivent être
beaux à l'impression — CV, rapports, fiches — là où LaTeX demandait autrefois des heures de réglages.

```typst
#set page(margin: 2cm)
#set text(font: "Inter", lang: "fr")

= Titre
Du texte en *gras*, des maths $a^2 + b^2 = c^2$, et une boucle :
#for x in (1, 2, 3) [- élément #x]
```

## Ce qu'il remplace

[LaTeX](/archive/creation/latex) et [Quarkdown](/archive/creation/quarkdown), tous deux dans l'archive.
