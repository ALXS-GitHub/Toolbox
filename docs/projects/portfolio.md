---
sidebar_position: 9
description: My showcase website, in 3D, which presents my projects and links to this Toolbox.
url: "https://alxs-github.github.io/Portfolio/"
status: paused
kind: project
platforms: [web]
stack: [React, three.js, Tailwind, Deno]
image: portfolio.png
---

# Portfolio

My [portfolio](https://alxs-github.github.io/Portfolio/) is a showcase website, livelier than a CV: it presents my
projects, my skills and how to reach me, with a lot of 3D. It links to this Toolbox, its detailed companion.

## What is on it

- **Home**: a 3D sphere animated by a custom shader, an animated background, a skills strip you scroll with the mouse.
- **Projects**: my public repositories, loaded live from GitHub's API, shown as bubbles floating in zero gravity, or
  as a filterable list. Some projects have a custom page.
- **Contact**: logo cubes you grab and throw, and a form.
- **Settings**: 3D, the cursor and animations can be turned off, for modest machines and phones.

## How it is built

It is a static website with no server: [React](/tools/dev/web-desktop/react) 19 and TypeScript, 3D with three.js and
React Three Fiber (physics included, for the bubbles and cubes), animations with Framer Motion and GSAP, and Tailwind
for styling. I also used it as a testing ground: it is built with [Deno](/tools/dev/runtimes/deno) and an experimental
version of [Vite](/tools/dev/web-desktop/vite), with the React compiler, to see how those tools do on a real project.

Deployment is automatic: a push to the `release` branch triggers GitHub Actions, which builds the site and publishes
it to GitHub Pages. The site's code is private.

## Where it stands

The site went live in October 2025, then was redesigned in May 2026. It has been on hold since.
