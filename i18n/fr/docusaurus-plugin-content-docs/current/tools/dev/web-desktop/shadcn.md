---
description: "Des composants d'interface qu'on copie dans son projet, pas une dépendance."
url: "https://ui.shadcn.com/"
status: active
kind: library
image: shadcn.png
sidebar_position: 5
---

# shadcn/ui

shadcn/ui n'est pas une bibliothèque qu'on installe : c'est une collection de composants (boutons, dialogues, menus,
tableaux…) qu'une commande **copie dans le projet**. Construits sur Radix (pour l'accessibilité et le clavier) et
stylés avec [Tailwind](/tools/dev/web-desktop/tailwind), ils deviennent du code à soi, qu'on adapte librement.

```bash
npx shadcn@latest add dialog     # ajoute components/ui/dialog.tsx au projet
```

C'est la base des interfaces de [CortX](/projects/cortx) et de [PayLedger](/projects/payledger) : une apparence
cohérente dès le départ, sans dépendre des choix d'une bibliothèque.
