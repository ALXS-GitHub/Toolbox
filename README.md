# Toolbox

This is my personal toolbox, containing all programs, commands, apps, and many other things installed on my computer.

All the documentation is made using Markdown files, and is built using the fantastic [Docusaurus](https://docusaurus.io/fr/) tool.

You can find the documentation hosted on GitHub Pages at: https://alxs-github.github.io/Toolbox/.

Warning, this is still a work in progress, and many things are missing or incomplete.

## Quick Start

This project can be run by executing the following command:

```bash
cd frontend
npm run start
```

This will launch the docusaurus server that is hosting the documentation at `http://localhost:3000`.

### Deployment

In order to deploy the app, first make sure that the `gh-pages` branch exists, else create it using the following command:

```bash
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial commit"
git push --set-upstream origin gh-pages
```

Then you can deploy the app using the following command (from the `main` branch):

```bash
cd frontend
npm run deploy
```

If any errors are detected, please make sure to resolve them before trying again.

## Documentation

The documentation is located in the `/docs` directory.

### Structure

```sh
/docs
├── docs1
│   ├── category1
│   │   ├── _category_.json
│   │   ├── section1.md
│   │   ├── section2.md
│   │   └── ...
│   ├── category2
│   │   ├── _category_.json
│   │   ├── section1.md
│   │   ├── section2.md
│   │   └── ...
│   ├── ...
│   └── intro.md
└── docs2
    └── ...
```


Docusaurus organizes documentation in a hierarchical structure within the `/docs` directory. Here's a general guide to setting it up:

- **Root Docs Directory**: Place all documentation files in `/docs`. This is where Docusaurus looks for content by default.

- **Subdirectories**: Create subdirectories within `/docs` for different documentation sets (e.g., `docs1/`, `docs2/`).

- **Categories**: Group related pages into subdirectories (e.g., `category1/`, `category2/`). Each category should include:

  - A `_category_.json` file to define metadata like the category name, position, and description.
  - Markdown files (e.g., `section1.md`, `section2.md`) for individual pages.

- **Introductory Files**: Include a top-level `intro.md` or similar for an overview or landing page.

- **File Naming**: Use lowercase with hyphens (e.g., `my-section.md`). Ensure each Markdown file has a frontmatter block for title, description, and other metadata.

- **Navigation**: Docusaurus auto-generates a sidebar based on the directory structure and `_category_.json` files. Customize via `sidebars.js` if needed.

- **Assets**: Store images or other media in `/docs/assets/` or per-category subfolders.

### Conventions

#### Docusaurus conventions

This section introduces the docusaurus conventions that are followed in this documentation.

##### Front Matter

The front matter is a YAML block at the beginning of each Markdown file that provides metadata about the document. Here are the fields you can include based on Docusaurus implementation:

```yaml
---
title: My Document Title # Overwrite the auto-generated title
description: A brief description of my document. # Overwrite the auto-generated description
sidebar_position: 1 # Position in the sidebar (lower numbers appear first)
sidebar_custom_props: # Docusaurus custom props 
  ...
---
```

#### Personal conventions

This section describes the personal conventions that I follow in this documentation and that are sometimes required for custom functionalities.

##### Front Matter

The front matter is a YAML block at the beginning of each Markdown file that provides metadata about the document. Here are the fields you can include based on my personal conventions:

```yaml
---
origin: <origin_of_the_tool> # origin of the tool
category: <category_of_the_tool> # category of the tool
use_state: <use_state_of_the_tool> # whether the tool is actively used
rating: <rating_of_the_tool> # from 0 to 5
url: <url_of_the_tool> # source where it can be found / downloaded
location: <local_path_of_the_tool> # path of the tool on the filesystem (if known)
version: <version_of_the_tool> # version of the tool used when documenting
sidebar_custom_props: # Docusaurus custom props
  image: /images/<image>.png # Path to the image to show in the DocCard and DocItem as the icon
---
```

Many of those fields have common values or patterns that can be reused across different tools. The common values can be found at [`constants/common.ts`](/frontend/src/constants/common.ts), where usual values are defined, but are not limited to those, you can always chose to specify your own. This is particularly useful for maintaining consistency across your documentation.

## Author

[ALXS](https://github.com/ALXS-GitHub)