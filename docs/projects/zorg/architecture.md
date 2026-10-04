---
sidebar_position: 1
sidebar_label: Architecture
description: One monorepo, four clients, a Supabase database with row-level security.
image: icons/layers.svg
---

# Zorg architecture

Zorg is a monorepo that produces four clients — the web app, the desktop app, the CLI and the MCP server — all plugged
into the same database. There is no application server of my own: clients talk straight to
[Supabase](/tools/dev/cloud/supabase), and the database's access rules decide what each one can read or write.

<Diagram
  name="zorg-architecture"
  alt="The web app, the CLI and the desktop app talk straight to Postgres with the user's token; claude.ai goes through the MCP server. Realtime, Storage, reminders and calendar import sit around the database; the desktop app updates through a Vercel relay that reads private releases."
/>

## The code

The repository is a [Bun](/tools/dev/runtimes/bun) monorepo:

| Folder | Contents |
|---|---|
| `apps/web` | the application, in [React](/tools/dev/web-desktop/react) 19 and [Vite](/tools/dev/web-desktop/vite), installable as a PWA |
| `apps/desktop` | the [Tauri](/tools/dev/web-desktop/tauri) 2 desktop app, which bundles the same interface and the CLI |
| `apps/cli` | the `zorg` CLI, compiled to a standalone binary |
| `apps/mcp` | the MCP server, deployed as a Supabase function |
| `packages/core` | the domain: the list of entities, their schemas, a logical clock to timestamp writes |
| `packages/client` | data access shared by the CLI and the MCP server |
| `packages/ui` | the design system, built on [shadcn/ui](/tools/dev/web-desktop/shadcn) |

## Data, and who can access it

Everything lives in a Postgres database. Each client connects with the signed-in user's token, and some forty
row-level security (RLS) rules apply to every request: a ticket is only visible to members of its project, with a role
that allows reading or editing it. Since the rules live in the database, they apply the same way to everyone, whether
the request comes from the app, the CLI or an agent.

Attachments are in Supabase's file storage. Deletions are soft (a field marks the item as deleted), which makes it
possible to go back.

## Online, with no local database

Zorg was first designed "local-first": each device kept a full copy of the data (with RxDB) and synced it with the
server. It did not hold: sync never quite converged and re-read every table every five seconds, even with the app
closed, to the point of being most of the project's traffic. So I replaced it all with an online application: data is
read on demand and cached (TanStack Query), every write goes through a single entry point, and only the views on
screen receive real-time changes. It is simpler, and much lighter.

## Reminders, calendar, notes as files

**Reminders** are sent by the server: a scheduled job runs every minute in the database, looks for alerts that are
due and sends a Web Push notification to subscribed devices. They therefore arrive with the app closed, on the phone
as on the computer.

**Google Calendar import** is a server function that reads the main calendar over a window of a few months, on demand
and read-only.

On the desktop app, **notes** are mirrored to a folder of `.md` files. Zorg reads that folder at start-up and rewrites
it on every change it receives; a file changed by another editor is sent back to the database.

## The desktop app and its updates

The desktop app bundles the same interface as the web, with a frameless window, native notifications and disk access
limited to the notes folder. It also ships the CLI: the Windows installer offers to add it to the `PATH`, and it is
updated with the app.

Releases are built by GitHub Actions when I push a tag: Windows, macOS and Linux, signed, as a draft release that I
publish by hand. Since the repository is private, the app cannot read those releases directly. It asks a small relay
hosted on [Vercel](/tools/dev/cloud/vercel), which alone holds a read-only token, returns the latest version and serves the files. The
installers' signature is checked before any update; the mechanism is detailed in
[Tauri app updates](/setup/tauri-updates).
