---
origin: installed
category: dev
url: https://ui.shadcn.com/
description: Copy-paste component collection built on Radix and Tailwind
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/shadcn.png
---

# shadcn/ui

**[shadcn/ui](https://ui.shadcn.com/)** is not a component library in the traditional sense—it's a collection of reusable components that you copy directly into your project. Built on [Radix UI](https://www.radix-ui.com/) primitives and styled with [Tailwind CSS](https://tailwindcss.com/), it gives you full ownership of the code with zero dependency lock-in.

## The philosophy

Traditional component libraries install as npm packages. You import components and customize through props and theme overrides. This works until you need to change something the library doesn't expose.

shadcn/ui inverts this:
- Components live in **your codebase**, not node_modules
- You have **full source code access**—modify anything
- No versioning headaches or breaking changes from upstream
- Start with sensible defaults, then customize deeply

## Getting started

```powershell
# Initialize in your project
npx shadcn@latest init

# Or create with full customization (choose styles, icons, colors)
npx shadcn create

# Add components as needed
npx shadcn@latest add button card dialog
```

Each command copies component source code into your project. From that point, the code is yours to modify.

## Prerequisites

- React project (Next.js, Vite, Remix, TanStack Start, etc.)
- Tailwind CSS configured
- TypeScript (recommended but optional)

## Project structure

```
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
lib/
└── utils.ts          # cn() helper for class merging
```

## Available components

40+ components covering common UI patterns:

**Form elements**: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Form

**Layout**: Card, Separator, Aspect Ratio, Scroll Area, Resizable panels

**Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card, Alert Dialog, Drawer

**Navigation**: Tabs, Navigation Menu, Menubar, Context Menu, Dropdown Menu, Command

**Data display**: Table, Data Table, Avatar, Badge, Calendar, Carousel

**Feedback**: Alert, Toast, Sonner, Progress, Skeleton

## Visual styles

Choose from multiple design presets:

| Style | Description |
|-------|-------------|
| **Vega** | Classic shadcn/ui look |
| **Nova** | Reduced padding/margins for compact layouts |
| **Maia** | Soft, rounded, generous spacing |
| **Lyra** | Boxy, sharp, pairs well with mono fonts |
| **Mira** | Compact, made for dense interfaces |

## Component library options

You can choose between **Radix** or **Base UI** as your underlying component library. Both are fully supported with the same API abstraction.

## CLI commands

```powershell
npx shadcn@latest init         # Initialize in project
npx shadcn create              # Create with full customization
npx shadcn@latest add button   # Add specific component
npx shadcn@latest add          # List available components
```

## Custom Tailwind prefix

Configure a custom Tailwind prefix and the CLI automatically prefixes utility classes. Enables adding shadcn/ui to existing projects like Docusaurus without class conflicts.

## Why choose shadcn/ui

- **Full control**: No fighting library constraints
- **No bundle bloat**: Only include what you use
- **Excellent accessibility**: Built on Radix/Base UI primitives
- **Tailwind native**: Uses your existing config
- **Active ecosystem**: Themes, blocks, and community extensions

## Tradeoffs

- **Manual updates**: Upstream improvements require re-copying
- **More responsibility**: You maintain the component code
- **Tailwind required**: Not suitable for CSS-in-JS approaches
- **Learning curve**: Need to understand Radix/Base UI and Tailwind

## Summary

shadcn/ui provides production-ready, accessible components that you own completely. Copy what you need, customize deeply, and maintain full control over your UI layer. The Registry Directory offers community-built components and extensions.
