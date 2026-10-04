"""Diagrams of the Projects section (texts + layouts). Registered by make.py."""

L = lambda n: f'<i data-lucide="{n}"></i>'  # noqa: E731
LOGO = lambda s: f'<img data-logo="si:{s}">'  # noqa: E731


def tr(fr, en):
    return {"fr": fr, "en": en}


T = {
    "zorg-architecture": tr(
        {
            "title": "Architecture de Zorg",
            "clients": "Clients", "sb": "Supabase", "ext": "Services externes", "vercel": "Vercel", "gh": "GitHub",
            "claude": ("claude.ai", "connecteur MCP"), "web": ("App web", "PWA · React"),
            "cli": ("CLI zorg", "--json · agents"), "desktop": ("App desktop", "Tauri · CLI intégré"),
            "mcp": ("Serveur MCP", "Edge Function", "OAuth 2.1"), "pg": ("Postgres", "règles d'accès par ligne", "toutes les données"),
            "google": ("Import agenda", "Edge Function"), "rt": ("Realtime", "vues affichées"),
            "storage": ("Storage", "pièces jointes"), "cron": ("Rappels", "pg_cron · chaque minute"),
            "gcal": ("Google Agenda", "lecture seule"), "push": ("Web Push", "notifications"),
            "updater": ("Relais de mise à jour", "jeton en lecture"), "releases": ("Releases", "dépôt privé · signées"),
            "l_jwt": "JWT", "l_changes": "changements", "l_import": "import", "l_check": "vérifie",
            "legend": {"green": "Données", "blue": "Surface pour agents", "gray": "Composant"},
            "line": "Appel", "dash": "Événements · lecture",
        },
        {
            "title": "Zorg architecture",
            "clients": "Clients", "sb": "Supabase", "ext": "External services", "vercel": "Vercel", "gh": "GitHub",
            "claude": ("claude.ai", "MCP connector"), "web": ("Web app", "PWA · React"),
            "cli": ("zorg CLI", "--json · agents"), "desktop": ("Desktop app", "Tauri · bundled CLI"),
            "mcp": ("MCP server", "Edge Function", "OAuth 2.1"), "pg": ("Postgres", "row-level security", "all the data"),
            "google": ("Calendar import", "Edge Function"), "rt": ("Realtime", "visible views"),
            "storage": ("Storage", "attachments"), "cron": ("Reminders", "pg_cron · every minute"),
            "gcal": ("Google Calendar", "read-only"), "push": ("Web Push", "notifications"),
            "updater": ("Update relay", "read-only token"), "releases": ("Releases", "private repo · signed"),
            "l_jwt": "JWT", "l_changes": "changes", "l_import": "import", "l_check": "checks",
            "legend": {"green": "Data", "blue": "Agent surface", "gray": "Component"},
            "line": "Call", "dash": "Events · reading",
        },
    ),
    "payledger-architecture": tr(
        {
            "title": "Architecture de PayLedger", "zone": "Sur la machine · rien en ligne",
            "me": ("Moi", "l'interface"), "agent": ("Un agent", "le CLI"),
            "ui": ("Appli de bureau", "React · Tauri", "se recharge seule"), "cli": ("CLI payledger", "--json · schema"),
            "core": ("payledger-core", "toute la logique", "Rust"),
            "db": ("SQLite", "un seul fichier", "mode WAL"), "docs": ("Coffre de documents", "rangé par empreinte"),
            "l_cmd": "commandes", "l_watch": "fichier modifié → rechargement",
            "legend": {"blue": "Logique", "green": "Données", "gray": "Composant"},
            "line": "Appel", "dash": "Surveillance",
        },
        {
            "title": "PayLedger architecture", "zone": "On the machine · nothing online",
            "me": ("Me", "the interface"), "agent": ("An agent", "the CLI"),
            "ui": ("Desktop app", "React · Tauri", "reloads by itself"), "cli": ("payledger CLI", "--json · schema"),
            "core": ("payledger-core", "all the logic", "Rust"),
            "db": ("SQLite", "a single file", "WAL mode"), "docs": ("Document vault", "stored by hash"),
            "l_cmd": "commands", "l_watch": "file changed → reload",
            "legend": {"blue": "Logic", "green": "Data", "gray": "Component"},
            "line": "Call", "dash": "Watching",
        },
    ),
    "souvenirs-architecture": tr(
        {
            "title": "Architecture de Souvenirs", "devices": "Appareils de la famille", "cf": "Cloudflare",
            "pwa": ("App web", "PWA · mobile"), "desktop": ("App de bureau", "Tauri"),
            "local": ("Copie locale", "fichiers ouverts"),
            "access": ("Access", "connexion", "liste de la famille"),
            "worker": ("Worker", "site + API", "Hono"),
            "d1": ("D1", "SQLite · métadonnées"), "r2": ("R2", "photos · vidéos", "originaux conservés"),
            "cron": ("Tâche quotidienne", "dump de la base"),
            "l_jwt": "identité vérifiée", "l_signed": "URL signées", "l_backup": "sauvegarde", "l_dump": "dump",
            "legend": {"green": "Données", "blue": "Code", "gray": "Composant"},
            "line": "Appel", "dash": "Copie",
        },
        {
            "title": "Souvenirs architecture", "devices": "Family devices", "cf": "Cloudflare",
            "pwa": ("Web app", "PWA · mobile"), "desktop": ("Desktop app", "Tauri"),
            "local": ("Local copy", "open formats"),
            "access": ("Access", "sign-in", "family allow-list"),
            "worker": ("Worker", "site + API", "Hono"),
            "d1": ("D1", "SQLite · metadata"), "r2": ("R2", "photos · videos", "originals kept"),
            "cron": ("Daily job", "database dump"),
            "l_jwt": "verified identity", "l_signed": "signed URLs", "l_backup": "backup", "l_dump": "dump",
            "legend": {"green": "Data", "blue": "Code", "gray": "Component"},
            "line": "Call", "dash": "Copy",
        },
    ),
    "alxs-rl-mod-architecture": tr(
        {
            "title": "Architecture d'ALXS-RL-Mod", "app": "ALXS-RL-Mod", "rl": "Rocket League", "net": "Internet",
            "me": ("Joueur", "Windows"),
            "ui": ("Interface", "React · Tauri"), "integrity": ("Après une mise à jour", "tout est reconstruit"),
            "features": ("Fonctionnalités", "swaps · décals", "balle · cartes"),
            "writer": ("Couche d'écriture", "seul point qui touche", "au jeu"),
            "manifest": ("Manifeste", "sauvegardes · SHA-256"),
            "stats": ("Stats API", "officielle · locale"), "files": ("Fichiers du jeu", "packages .upk"),
            "sources": ("Sources de packs", "liste blanche"),
            "l_ipc": "IPC", "l_ws": "WebSocket", "l_upk": "réécrit", "l_net": "à la demande",
            "legend": {"blue": "Point de passage unique", "green": "Données", "gray": "Composant"},
            "line": "Appel", "dash": "Copie · réseau",
        },
        {
            "title": "ALXS-RL-Mod architecture", "app": "ALXS-RL-Mod", "rl": "Rocket League", "net": "Internet",
            "me": ("Player", "Windows"),
            "ui": ("Interface", "React · Tauri"), "integrity": ("After a game update", "everything is rebuilt"),
            "features": ("Features", "swaps · decals", "ball · maps"),
            "writer": ("Writer layer", "the only thing that", "touches the game"),
            "manifest": ("Manifest", "backups · SHA-256"),
            "stats": ("Stats API", "official · local"), "files": ("Game files", ".upk packages"),
            "sources": ("Pack sources", "allow-list"),
            "l_ipc": "IPC", "l_ws": "WebSocket", "l_upk": "rewrites", "l_net": "on demand",
            "legend": {"blue": "Single gateway", "green": "Data", "gray": "Component"},
            "line": "Call", "dash": "Copy · network",
        },
    ),
    "kpop-idol-workflow": tr(
        {
            "title": "Développer le jeu avec Claude Code", "dev": "Poste de développement", "rbx": "Roblox",
            "me": ("Moi", "un ticket à la fois"),
            "tickets": ("Tickets", "gestionnaire de tickets"), "claude": ("Claude Code", "skills du projet", "sessions en parallèle"),
            "luau": ("Code Luau", "une fonctionnalité", "par fichier"), "quality": ("Qualité", "Selene · StyLua"),
            "admin": ("Tableau d'équilibrage", "local · Bun · React"),
            "studio": ("Roblox Studio", "3D · assets"), "devu": ("Univers de dev", "données isolées"),
            "prod": ("Jeu publié", "serveurs · données"),
            "l_edit": "édite", "l_rojo": "Rojo", "l_test": "teste", "l_pub": "publie", "l_cloud": "Open Cloud",
            "l_mcp": "MCP · 3D",
            "legend": {"blue": "Agent", "green": "Code versionné", "gray": "Composant"},
            "line": "Flux", "dash": "Lecture · lien secondaire",
        },
        {
            "title": "Building the game with Claude Code", "dev": "Development machine", "rbx": "Roblox",
            "me": ("Me", "one ticket at a time"),
            "tickets": ("Tickets", "ticket manager"), "claude": ("Claude Code", "project skills", "parallel sessions"),
            "luau": ("Luau code", "one feature", "per file"), "quality": ("Quality", "Selene · StyLua"),
            "admin": ("Balancing dashboard", "local · Bun · React"),
            "studio": ("Roblox Studio", "3D · assets"), "devu": ("Dev universe", "isolated data"),
            "prod": ("Published game", "servers · data"),
            "l_edit": "edits", "l_rojo": "Rojo", "l_test": "tests", "l_pub": "publishes", "l_cloud": "Open Cloud",
            "l_mcp": "MCP · 3D",
            "legend": {"blue": "Agent", "green": "Versioned code", "gray": "Component"},
            "line": "Flow", "dash": "Reading · secondary link",
        },
    ),
    "k-games-architecture": tr(
        {
            "title": "Architecture de K-Games", "player": "Chaque joueur", "host": "Machine de l'hôte",
            "svc": "Services externes",
            "friends": ("Amis", "réseau privé virtuel"),
            "app": ("App de bureau", "Tauri · React", "les jeux"),
            "api": ("API", "Rust · actix-web", "comptes · cartes"), "ws": ("Serveur de partie", "Node · WebSocket", "votes · rounds"),
            "db": ("MongoDB", "chansons · parties", "collections"),
            "yt": ("YouTube", "lecteur intégré"), "sp": ("Import Spotify", "admin seulement"), "spapi": ("API Spotify", "playlists"),
            "l_http": "HTTP · JWT", "l_ws": "temps réel", "l_clips": "extraits", "l_import": "import",
            "legend": {"blue": "Moteur des parties", "green": "Données", "gray": "Composant"},
        },
        {
            "title": "K-Games architecture", "player": "Each player", "host": "Host machine", "svc": "External services",
            "friends": ("Friends", "virtual private network"),
            "app": ("Desktop app", "Tauri · React", "the games"),
            "api": ("API", "Rust · actix-web", "accounts · cards"), "ws": ("Game server", "Node · WebSocket", "votes · rounds"),
            "db": ("MongoDB", "songs · games", "collections"),
            "yt": ("YouTube", "embedded player"), "sp": ("Spotify import", "admin only"), "spapi": ("Spotify API", "playlists"),
            "l_http": "HTTP · JWT", "l_ws": "real time", "l_clips": "clips", "l_import": "import",
            "legend": {"blue": "Game engine", "green": "Data", "gray": "Component"},
        },
    ),
}


def builders(node, page):
    def zorg(t):
        inner = f'''    <div class="group" id="clients" style="grid-column:1;grid-row:1/6"></div>
    <div class="group main" id="sb" style="grid-column:3/6;grid-row:1/6"></div>
    <div class="group" id="ext" style="grid-column:7;grid-row:1/6"></div>
    <div class="group" id="vercel" style="grid-column:1;grid-row:7/9"></div>
    <div class="group" id="gh" style="grid-column:3;grid-row:7/9"></div>
    <div class="group-label" style="grid-column:1;grid-row:1">{t["clients"]}</div>
    <div class="group-label" style="grid-column:3/5;grid-row:1">{LOGO("supabase")}{t["sb"]}</div>
    <div class="group-label" style="grid-column:7;grid-row:1">{t["ext"]}</div>
    <div class="group-label" style="grid-column:1;grid-row:7">{LOGO("vercel")}{t["vercel"]}</div>
    <div class="group-label" style="grid-column:3;grid-row:7">{LOGO("github")}{t["gh"]}</div>
{node("claude", "tall", 1, 2, LOGO("claude"), t["claude"])}{node("web", "tall", 1, 3, L("globe"), t["web"])}{node("cli", "k-blue fill tall", 1, 4, L("terminal"), t["cli"])}{node("desktop", "tall", 1, 5, L("monitor"), t["desktop"])}{node("mcp", "k-blue fill tall", 3, 2, L("plug"), t["mcp"])}{node("pg", "k-green fill tall", 3, "3/6", LOGO("postgresql"), t["pg"])}{node("google", "tall", 5, 2, L("calendar"), t["google"])}{node("rt", "tall", 5, 3, L("radio"), t["rt"])}{node("storage", "tall", 5, 4, L("paperclip"), t["storage"])}{node("cron", "tall", 5, 5, L("alarm-clock"), t["cron"])}{node("gcal", "tall", 7, 2, LOGO("googlecalendar"), t["gcal"])}{node("push", "tall", 7, 5, L("bell"), t["push"])}{node("updater", "tall", 1, 8, L("refresh-cw"), t["updater"])}{node("releases", "tall", 3, 8, L("package"), t["releases"])}'''
        links = ['["claude", "mcp", { label: "OAuth" }]', '["mcp", "pg"]', f'["web", "pg", {{ label: "{t["l_jwt"]}" }}]',
                 '["cli", "pg"]', '["desktop", "pg"]', f'["pg", "rt", {{ dash: true, label: "{t["l_changes"]}" }}]',
                 '["pg", "storage", { dash: true }]', '["pg", "cron"]', f'["google", "gcal", {{ dash: true, label: "{t["l_import"]}" }}]',
                 '["cron", "push"]', f'["desktop", "updater", {{ label: "{t["l_check"]}" }}]', '["updater", "releases"]']
        return page(t, 1132, "210px 64px 220px 56px 210px 64px 200px", "22px 84px 84px 84px 84px 40px 22px 84px",
                    inner, links, {"blocks": t["legend"], "line": t["line"], "dash": t["dash"]})

    def payledger(t):
        inner = f'''    <div class="group main" id="m" style="grid-column:3/8;grid-row:2/5"></div>
    <div class="group-label" style="grid-column:3/6;grid-row:2">{L("laptop")}{t["zone"]}</div>
    <div class="node person" id="me" style="grid-column:1;grid-row:3">
      <div class="ico">{L("user")}</div><div><b>{t["me"][0]}</b><small>{t["me"][1]}</small></div>
    </div>
    <div class="node person" id="agent" style="grid-column:1;grid-row:4">
      <div class="ico">{L("bot")}</div><div><b>{t["agent"][0]}</b><small>{t["agent"][1]}</small></div>
    </div>
{node("ui", "tall", 3, 3, L("app-window"), t["ui"])}{node("cli", "tall", 3, 4, L("terminal"), t["cli"])}{node("core", "k-blue fill tall", 5, "3/5", LOGO("rust"), t["core"])}{node("db", "k-green fill tall", 7, 3, LOGO("sqlite"), t["db"])}{node("docs", "k-green fill tall", 7, 4, L("folder-lock"), t["docs"])}'''
        links = ['["me", "ui"]', '["agent", "cli"]', f'["ui", "core", {{ label: "{t["l_cmd"]}" }}]', '["cli", "core"]',
                 '["core", "db"]', '["core", "docs"]']
        return page(t, 1096, "150px 56px 210px 56px 220px 56px 220px", "0px 22px 92px 92px", inner, links,
                    {"blocks": t["legend"]})

    def souvenirs(t):
        inner = f'''    <div class="group" id="dev" style="grid-column:1;grid-row:1/6"></div>
    <div class="group main" id="cf" style="grid-column:3/8;grid-row:1/6"></div>
    <div class="group-label" style="grid-column:1;grid-row:1">{L("users")}{t["devices"]}</div>
    <div class="group-label" style="grid-column:3/5;grid-row:1">{LOGO("cloudflare")}{t["cf"]}</div>
{node("pwa", "tall", 1, 2, L("smartphone"), t["pwa"])}{node("desktop", "tall", 1, 3, L("monitor"), t["desktop"])}{node("local", "k-green fill tall", 1, 5, L("hard-drive"), t["local"])}{node("access", "tall", 3, "2/4", L("shield-check"), t["access"])}{node("worker", "k-blue fill tall", 5, "2/4", L("server"), t["worker"])}{node("d1", "k-green fill tall", 7, 2, L("database"), t["d1"])}{node("r2", "k-green fill tall", 7, 3, L("images"), t["r2"])}{node("cron", "tall", 5, 5, L("clock"), t["cron"])}'''
        links = ['["pwa", "access"]', '["desktop", "access"]', f'["access", "worker", {{ label: "{t["l_jwt"]}" }}]',
                 '["worker", "d1"]', f'["worker", "r2", {{ label: "{t["l_signed"]}" }}]',
                 f'["desktop", "local", {{ dash: true, label: "{t["l_backup"]}" }}]',
                 f'["cron", "r2", {{ from: "r", to: "b", dash: true, label: "{t["l_dump"]}" }}]']
        return page(t, 1140, "220px 64px 210px 56px 210px 64px 210px", "22px 90px 90px 34px 84px", inner, links,
                    {"blocks": t["legend"], "line": t["line"], "dash": t["dash"]})

    def rlmod(t):
        inner = f'''    <div class="group main" id="app" style="grid-column:3/6;grid-row:1/7"></div>
    <div class="group" id="rl" style="grid-column:7;grid-row:1/4"></div>
    <div class="group" id="net" style="grid-column:7;grid-row:5/7"></div>
    <div class="group-label" style="grid-column:3/5;grid-row:1">{t["app"]}</div>
    <div class="group-label" style="grid-column:7;grid-row:1">{L("gamepad-2")}{t["rl"]}</div>
    <div class="group-label" style="grid-column:7;grid-row:5">{L("globe")}{t["net"]}</div>
    <div class="node person" id="me" style="grid-column:1;grid-row:2">
      <div class="ico">{L("user")}</div><div><b>{t["me"][0]}</b><small>{t["me"][1]}</small></div>
    </div>
{node("ui", "tall", 3, 2, LOGO("react"), t["ui"])}{node("integrity", "tall", 3, 3, L("refresh-ccw"), t["integrity"])}{node("features", "tall", 5, 2, L("wand-sparkles"), t["features"])}{node("writer", "k-blue fill tall", 5, 3, L("pen-line"), t["writer"])}{node("manifest", "k-green fill tall", 5, 6, L("file-check"), t["manifest"])}{node("stats", "tall", 7, 2, L("activity"), t["stats"])}{node("files", "k-green fill tall", 7, 3, L("package"), t["files"])}{node("sources", "tall", 7, 6, L("download"), t["sources"])}'''
        links = ['["me", "ui"]', f'["ui", "features", {{ label: "{t["l_ipc"]}" }}]', '["features", "writer"]',
                 '["integrity", "writer"]', f'["writer", "files", {{ label: "{t["l_upk"]}" }}]',
                 '["writer", "manifest", { dash: true }]', f'["features", "stats", {{ label: "{t["l_ws"]}" }}]',
                 f'["manifest", "sources", {{ dash: true, plain: true }}]']
        links[-1] = '["features", "sources", { from: "r", to: "l", dash: true, at: .2 }]'
        return page(t, 1230, "150px 64px 220px 56px 220px 130px 230px", "22px 92px 92px 30px 22px 84px", inner, links,
                    {"blocks": t["legend"], "line": t["line"], "dash": t["dash"]})

    def kpop(t):
        inner = f'''    <div class="group main" id="dev" style="grid-column:3/6;grid-row:1/6"></div>
    <div class="group" id="rbx" style="grid-column:7;grid-row:1/6"></div>
    <div class="group-label" style="grid-column:3/5;grid-row:1">{L("laptop")}{t["dev"]}</div>
    <div class="group-label" style="grid-column:7;grid-row:1">{LOGO("roblox")}{t["rbx"]}</div>
    <div class="node person" id="me" style="grid-column:1;grid-row:5">
      <div class="ico">{L("user")}</div><div><b>{t["me"][0]}</b><small>{t["me"][1]}</small></div>
    </div>
{node("tickets", "tall", 3, 5, L("list-todo"), t["tickets"])}{node("claude", "k-blue fill tall", 3, "2/4", LOGO("claude"), t["claude"])}{node("luau", "k-green fill tall", 5, 2, L("file-code"), t["luau"])}{node("quality", "tall", 5, 3, L("badge-check"), t["quality"])}{node("admin", "tall", 5, 5, L("sliders-horizontal"), t["admin"])}{node("studio", "tall", 7, 2, L("box"), t["studio"])}{node("devu", "tall", 7, 3, L("flask-conical"), t["devu"])}{node("prod", "tall", 7, 5, L("rocket"), t["prod"])}'''
        links = ['["me", "tickets"]', '["tickets", "claude"]', f'["claude", "luau", {{ label: "{t["l_edit"]}" }}]',
                 '["luau", "quality", { dash: true }]', f'["luau", "studio", {{ label: "{t["l_rojo"]}" }}]',
                 f'["studio", "devu", {{ label: "{t["l_test"]}" }}]', f'["devu", "prod", {{ label: "{t["l_pub"]}" }}]',
                 f'["admin", "prod", {{ dash: true, label: "{t["l_cloud"]}" }}]']
        return page(t, 1150, "150px 64px 220px 56px 220px 70px 220px", "22px 92px 92px 34px 84px", inner, links,
                    {"blocks": t["legend"], "line": t["line"], "dash": t["dash"]})

    def kgames(t):
        inner = f'''    <div class="group" id="pl" style="grid-column:3;grid-row:1/4"></div>
    <div class="group main" id="host" style="grid-column:5/8;grid-row:1/4"></div>
    <div class="group" id="svc" style="grid-column:3/8;grid-row:5/7"></div>
    <div class="group-label" style="grid-column:3;grid-row:1">{t["player"]}</div>
    <div class="group-label" style="grid-column:5/7;grid-row:1">{L("server")}{t["host"]}</div>
    <div class="group-label" style="grid-column:5/7;grid-row:5">{t["svc"]}</div>
    <div class="node person" id="friends" style="grid-column:1;grid-row:2/4">
      <div class="ico">{L("users")}</div><div><b>{t["friends"][0]}</b><small>{t["friends"][1]}</small></div>
    </div>
{node("app", "tall", 3, "2/4", L("gamepad-2"), t["app"])}{node("api", "tall", 5, 2, LOGO("rust"), t["api"])}{node("ws", "k-blue fill tall", 5, 3, L("radio-tower"), t["ws"])}{node("db", "k-green fill tall", 7, "2/4", LOGO("mongodb"), t["db"])}{node("yt", "tall", 3, 6, LOGO("youtube"), t["yt"])}{node("sp", "tall", 5, 6, L("download"), t["sp"])}{node("spapi", "tall", 7, 6, LOGO("spotify"), t["spapi"])}'''
        links = ['["friends", "app"]', f'["app", "api", {{ label: "{t["l_http"]}" }}]', f'["app", "ws", {{ label: "{t["l_ws"]}" }}]',
                 '["api", "db"]', '["ws", "db"]', f'["app", "yt", {{ label: "{t["l_clips"]}" }}]',
                 f'["sp", "spapi", {{ dash: true, label: "{t["l_import"]}" }}]']
        return page(t, 1130, "150px 64px 210px 64px 220px 56px 210px", "22px 92px 92px 34px 22px 84px", inner, links,
                    {"blocks": t["legend"]})

    return {"zorg-architecture": zorg, "payledger-architecture": payledger, "souvenirs-architecture": souvenirs,
            "alxs-rl-mod-architecture": rlmod, "kpop-idol-workflow": kpop, "k-games-architecture": kgames}
