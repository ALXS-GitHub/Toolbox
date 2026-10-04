---
description: "Containers to run a service without installing it."
url: "https://www.docker.com/"
status: paused
kind: app
platforms: [windows, macos, linux]
image: docker.png
sidebar_position: 4
---

# Docker

Docker runs applications in containers: an isolated, reproducible environment, described in a file, that behaves the
same on every machine. It is the simplest way to start a database or a service for a project without installing
anything.

Docker Desktop is still installed, with the `dc` alias for `docker compose`, but none of my current projects needs it:
my apps are local (SQLite) or rely on hosted services ([Supabase](/tools/dev/cloud/supabase), [Vercel](/tools/dev/cloud/vercel),
[Cloudflare](/tools/dev/cloud/cloudflare)).
