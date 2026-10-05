---
sidebar_position: 5
description: A family app to share photos, videos and memories, built to last a hundred years.
status: active
kind: project
platforms: [web, windows, macos, linux]
stack: [Cloudflare Workers, D1, R2, React, Tauri 2]
image: souvenirs.png
---

# Souvenirs

Souvenirs ("memories") is a private app, for my family only, to share and keep photos, videos, recordings and texts.
The need that drives the whole project fits in one sentence: **these memories must still be readable in a hundred
years**. That rules out handing them to a service that may close or change its terms, and it requires open formats,
several independent copies and a way out at any time. The app also had to be pleasant to browse, like a gallery.

The repository and the app are private; this page describes how it works, never what it contains.

## What Souvenirs does

- **Browse**: an animated home page, a timeline, a page per year, albums per event with sub-albums, a map, a
  slideshow.
- **Add**: drag and drop files or whole folders. Date and place are read from the photos' metadata; iPhone formats are
  converted for the preview, but **the original is always kept**. Duplicates are detected, even renamed.
- **Describe**: dates of varying precision ("summer 1998"), places, identified people, tags, comments from each member,
  and full-text search.
- **Share**: groups with roles (admin, member, viewer), and invitations by address.

## How it is built

<Diagram
  name="souvenirs-architecture"
  alt="Family devices go through Cloudflare Access, then a Worker that serves the site and the API; metadata is in D1, media in R2. The desktop app keeps a local copy, and a daily job backs the database up to R2."
/>

Everything runs on Cloudflare. A single **Worker** serves both the site and the API; **metadata** lives in **D1**, a
SQLite database, and **media** in **R2**, an object store. Files are stored there by their SHA-256 hash: that is what
makes it possible to detect duplicates and to check that a file has not been altered. Media uploads and downloads go
straight between the browser and R2, through signed URLs valid for a few minutes, without going through the Worker.

Sign-in is handed to **Cloudflare Access**, placed in front of the app: only the family's addresses can get in, with a
code received by e-mail or an existing account. The Worker then checks the identity passed on by Access on every
request, and the app manages permissions per group.

It is used from the browser, including on the phone (it is a PWA), or with the [Tauri](/tools/dev/web-desktop/tauri)
desktop app, whose main job is to keep a local copy.

## Adding a memory

All the processing of a file happens in the browser, before the upload. The app computes its hash (and, for a photo,
a hash of its pixels, which recognises the same image saved again) to skip duplicates; a file already present but in
the trash is simply restored. It reads the date and place from the metadata, converts iPhone photos to JPEG for the
preview, and, for a video, extracts a poster frame and reorganises the file so it can play while downloading — without
re-encoding it. The original file goes to R2 as is, next to its optimised version.

## The copy at home

The desktop app regularly downloads everything that changed: one file per database table, as JSON with one line per
record, the media sorted by version (original, optimised), and a file that links each media to its metadata. These
are ordinary formats: in fifty years, a text editor and an image viewer will be enough to read everything again,
without Souvenirs and without Cloudflare. A full export is also available from the admin dashboard.

## Choices made to last

**Cloudflare rather than Supabase.** A free Supabase project can be paused, or even deleted, when inactive: an
unacceptable risk for family archives. Cloudflare also offers storage with no egress fees, which keeps the door open
to getting everything back.

**SQLite for metadata.** A single file, in a format recommended for long-term archiving, readable without the app.

**Several independent copies.** Media is in R2; every night, a scheduled job also drops a full export of the database
there; and the desktop app downloads everything, as plain files, to a disk at home. If Cloudflare disappears one day,
everything is still there, readable without Souvenirs.

**Delegated sign-in.** Rather than writing a magic-link sign-in, as first planned, Access checks the identity before
the request even reaches the app, with two-factor authentication as a bonus and the member list managed outside the
code.

## Where it stands

Souvenirs has been in service since April 2026 and is in active use. It was built in a few weeks; version 0.0.7, released in
May, covers everything it needs to do, and it keeps evolving as needs come up.
