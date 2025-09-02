---
origin: installed
category: dev
url: https://www.docker.com/
location: C:/Program Files/Docker
description: Containerization platform
use_state: active
rating: 5
sidebar_custom_props:
    image: /images/docker.png
---

# Docker

**[Docker](https://www.docker.com/)** is a platform to build, package and run applications in lightweight, isolated environments called containers. A container bundles your application code together with its runtime, system tools, libraries and settings so it runs the same everywhere (developer laptop, CI, production server, cloud VM, etc.).

### Why it exists

Before containers you often had: "works on my machine" issues, heavy virtual machines, and complicated deployment instructions. Docker standardizes:
1. Packaging (Dockerfile -> Image)
2. Distribution (image registries like Docker Hub)
3. Execution (docker run on any host with the Docker Engine)

## Containerization in brief

Containerization uses OS‐level virtualization (namespaces + cgroups on Linux) to isolate processes while sharing the host kernel. Compared with full VMs:
- Faster startup (seconds vs minutes)
- Lower resource usage (no guest OS duplication)
- Easier image layering & caching

Docker workflow core pieces:
- Dockerfile: Declarative build steps to produce an image layer by layer.
- Image: Immutable snapshot (read‑only layers + a thin writable container layer at runtime).
- Registry: Remote store (push/pull) for images.
- Container: A running instance of an image (process + filesystem + networking isolation).

## Installation (Windows)

On Windows the simplest path is Docker Desktop, which provides the Docker Engine, an optional GUI, automatic updates, and integration with WSL 2. Official instructions can be found at https://docs.docker.com/desktop/setup/install/windows-install/.

Prerequisites (Windows 10/11): Install WSL 2. You can check my [documentation on WSL](/docs/dev/tools/wsl) for more details.

Steps (high level):
1. Download Docker Desktop installer from https://www.docker.com/products/docker-desktop/
2. Run installer, ensure the "Use WSL 2 instead of Hyper-V" option is checked (unless you must use Hyper-V).
3. Finish install, sign out/in if prompted.
4. Start Docker Desktop and wait until the whale icon indicates it's running.
5. Run `docker version` in PowerShell or your WSL shell to verify.

Note: WSL 2 is strongly recommended (and now effectively required) for the best experience; it provides a real Linux kernel that Docker uses under the hood even while you invoke commands from Windows PowerShell.

## Usage

You can perform most common tasks via the Docker Desktop GUI, but here we focus on the CLI (preferred for scripts, reproducibility, docs, CI). Below are concise, frequently used commands.

### Check installation

```sh
docker version # Client + server (engine) versions
docker info # Detailed engine info (storage driver, #containers, etc.)
```

### Getting images & running containers

```sh
docker pull nginx:latest # Download image from Docker Hub
docker images # List local images
docker run nginx:latest # Run in foreground, stops with CTRL+C
docker run -d -p 8080:80 --name web nginx:latest # Detached, port map host 8080 -> container 80
docker ps # Running containers
docker ps -a # All containers (including exited)
```

### Building your own image

Assuming a `Dockerfile` in the current directory:
```sh
docker build -t myapp:1.0 . # Build image and tag it
docker run --rm myapp:1.0 # Run then auto-remove container after exit
```

### Executing inside a container

```sh
docker exec -it web sh # Open interactive shell (or bash) in running container
```

### Logs & inspection

```sh
docker logs web # Show stdout/stderr
docker logs -f web # Follow logs
docker inspect web # Low-level JSON details
```

### Stopping / starting / removing

```sh
docker stop web # Graceful stop
docker start web # Start again
docker restart web # Restart
docker rm web # Remove container (must be stopped)
docker rmi nginx:latest # Remove image (no dependent containers)
```

### Cleaning up

```sh
docker container prune # Remove all stopped containers (prompts)
docker image prune # Remove dangling images
docker system df # Show disk usage
```

### Docker Compose (brief)

Compose lets you define multi-container setups in `docker-compose.yml` (v2 integrates as `docker compose`).
```sh
docker compose up -d # Start services defined in the file
docker compose ps # List services
docker compose down # Stop and remove containers, networks
```
