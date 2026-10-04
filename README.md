# Toolbox

My setup, my tools and my projects — how I use them, and why. Published at
**https://alxs-github.github.io/Toolbox/**, in English and French.

Built with [Docusaurus](https://docusaurus.io/). Every push to `main` is checked, built and deployed to GitHub
Pages by GitHub Actions.

## Run it locally

```bash
cd frontend
npm ci
npm run start                 # English, http://localhost:3000/Toolbox/
npm run start -- --locale fr  # French
npm run build                 # content check, then both locales into frontend/build
```

Enable the pre-commit content check once per clone:

```bash
git config core.hooksPath .githooks
```

## Layout

```
docs/                   English pages (the default locale)
  setup/                guides: how my environment fits together (Claude Code harness, terminal, Git…)
  tools/                tool pages, by domain (ai, dev, creation, system, web)
  projects/             my projects
  hardware/             computer, accessories, companion software
  games/                games, launchers, mods, emulators
  archive/              tools and hardware I no longer use
i18n/fr/                French: pages (docusaurus-plugin-content-docs/current/) and UI strings
assets/images/          tool logos (served at /images/)
assets/diagrams/        diagrams, light and dark (<name>.png, <name>-dark.png; French in fr/)
diagrams/               diagram sources and make.py (rendered with the `diagrams` skill)
frontend/               the Docusaurus site (config, theme, components)
scripts/                check-content.mjs and the list of public repositories
```

Each folder has a `_category_.json` (label, position, description). Each section starts with an `index.md`
(the landing page of the section). A page missing from `i18n/fr/` falls back to its English version.

## Writing a page

### Front matter

Only these keys are accepted, with these values (checked by `scripts/check-content.mjs`):

```yaml
---
description: One sentence: what it is.         # shown under the title and on cards
url: https://example.com                       # official site (or the public site of a project)
repo: https://github.com/ALXS-GitHub/CortX     # public repositories only
status: active        # active | occasional | testing | paused | playing | archived
replaced_by: zoxide   # archived pages only
kind: cli             # app | cli | web | service | library | language | extension | hardware | game | project | config
platforms: [windows, macos, linux]   # windows | macos | linux | web | android | ios
stack: [Tauri, Rust, React]          # projects
image: zoxide.png     # file in assets/images/
---
```

Tool and archive pages need `description`, `status` and `kind`. Pages in `archive/` are `archived`; games are
never archived.

### Content

- Write from my own use: what the tool does in my setup, how I configured it, what I replaced it with. Link to
  the official documentation instead of copying it.
- Prose first: a short intro, then sections that each open with a sentence. Code blocks always have a language.
- A diagram as soon as four or more things are connected: `<Diagram name="…" alt="…" caption="…" />`.
- Links between pages use the route (`[zoxide](/tools/dev/cli/zoxide)`): it works in both languages, even
  when only one of the two pages is translated, and the build fails if the route does not exist.
- Public site: no personal paths, e-mail addresses, identifiers or secrets, and no links to private
  repositories. Private projects are described by how they work, never by what they contain.

## Author

[ALXS](https://github.com/ALXS-GitHub)
