---
origin: web
category: web
url: https://excalidraw.com/
description: Collaborative virtual whiteboard with hand-drawn feel
use_state: active
sidebar_custom_props:
    image: /images/excalidraw.png
---

# Excalidraw

**[Excalidraw](https://excalidraw.com/)** is an open-source virtual whiteboard that produces diagrams with a distinctive hand-drawn aesthetic. It runs entirely in the browser with no sign-up required -- you open the page and start drawing immediately. The infinite canvas supports shapes, arrows, text, freehand drawing, and images, making it well suited for architecture diagrams, flowcharts, wireframes, and brainstorming sessions.

Real-time collaboration is built in: generate a shareable link and anyone with it can join and edit the canvas simultaneously, with live cursors showing who is working where. Excalidraw also has a growing library system where you can import pre-made component sets (UI elements, cloud architecture icons, sequence diagram shapes) to speed up common diagram types. The app works offline once loaded, and all data stays in your browser by default -- nothing is stored on a server unless you explicitly share a link.

Excalidraw exports to PNG, SVG, and its own `.excalidraw` JSON format. The JSON format is particularly useful because it can be committed to a Git repository and edited later, unlike raster images. There is also a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) that lets you create and edit `.excalidraw` files directly in your editor. For teams that want embedded diagrams in documentation or architecture decision records, this workflow -- draw in VS Code, commit the source file, export a PNG for display -- keeps diagrams version-controlled and maintainable.
