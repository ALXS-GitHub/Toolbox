# Toolbox

This is my personal toolbox, containing all programs, commands, apps, and many other things installed on my computer.

All the documentation is made using Markdown files, and is built using the fantastic [Docusaurus](https://docusaurus.io/fr/) tool.

## Quick Start

This project can be run by executing the following command:

```bash
cd frontend
npm run start
```

This will launch the docusaurus server that is hosting the documentation at `http://localhost:3000`.

## Documentation

The documentation is located in the `/docs` directory.

### Structure

```sh
├── category1
│   ├── _category_.json
│   ├── section1.md
│   ├── section2.md
│   └── ...
├── category2
│   ├── _category_.json
│   ├── section1.md
│   ├── section2.md
│   └── ...
├── ...
└── intro.md
```

Docusaurus organizes documentation in a hierarchical structure within the `/docs` directory. Here's a general guide to setting it up:

- **Root Docs Directory**: Place all documentation files in `/docs`. This is where Docusaurus looks for content by default.

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
sidebar_custom_props: # Docusaurus custom props 
  image: /images/wsl.png # Path to the image to show in the DocCard and DocItem as the icon
---
```
