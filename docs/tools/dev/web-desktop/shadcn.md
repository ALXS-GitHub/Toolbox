---
description: "Interface components you copy into your project, not a dependency."
url: "https://ui.shadcn.com/"
status: active
kind: library
image: shadcn.png
sidebar_position: 5
---

# shadcn/ui

shadcn/ui is not a library you install: it is a collection of components (buttons, dialogs, menus, tables…) that a
command **copies into the project**. Built on Radix (for accessibility and keyboard support) and styled with
[Tailwind](/tools/dev/web-desktop/tailwind), they become your own code, to adapt freely.

```bash
npx shadcn@latest add dialog     # adds components/ui/dialog.tsx to the project
```

It is the base of [CortX](/projects/cortx)'s and [PayLedger](/projects/payledger)'s interfaces: a consistent look from
the start, without depending on a library's choices.
