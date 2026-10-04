"""Builds the diagram sources (one HTML per diagram and language) from the `diagrams` skill template.

    python diagrams/make.py [name…]   # every diagram, or only the named ones

For each diagram and language it writes the source HTML next to this script (<name>.<lang>.html), then
renders it with the skill (`render.py --figure`, light and dark) into assets/diagrams/: English at the root,
French in fr/. Texts live in T, layouts in the builder functions (one per diagram).
"""
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / "assets" / "diagrams"
SKILL = Path.home() / ".claude" / "skills" / "diagrams"
TEMPLATE = (SKILL / "templates" / "schema.html").read_text(encoding="utf-8")

T = {
    "harness-overview": {
        "fr": {
            "title": "Le harness Claude Code",
            "me": ("Moi", "terminal · voix"),
            "zone": "Claude Code · terminal",
            "settings": ("Réglages", "settings.json", "modèle · effort · langue"),
            "rules": ("Consignes", "CLAUDE.md", "mémoire automatique"),
            "status": ("Statusline", "script PowerShell", "contexte · quotas · coût"),
            "cc": ("Claude Code", "l'agent", "lit le contexte · appelle les outils"),
            "mods": ("Mods", "bandeau · tableau", "hooks en TSX"),
            "skills": ("Skills", "documents · schémas", "tickets · navigateur"),
            "design": ("Design commun", "variables · thèmes", "composants"),
            "machine": "Sur la machine",
            "cli": ("CLI", "gh · tickets", "dev-browser"),
            "chrome": ("Chrome", "extension Claude", "ou port de debug"),
            "render": ("Rendu", "Python · Chrome headless", "HTML · PDF · PNG"),
            "github": "GitHub · dépôt privé",
            "repo": ("Dépôt de config", "~/.claude versionné", "liste blanche"),
            "claudeai": "claude.ai",
            "imported": ("Skills importés", "copie des skills locaux"),
            "note": "Git reste la seule source",
            "l_ask": "demandes", "l_load": "charge", "l_json": "JSON", "l_drive": "pilote", "l_call": "appelle",
            "l_style": "style", "l_render": "rendu",
            "l_push": "commit signé · hook anti-fuite · push",
            "l_zip": "skills en zip · import à la main",
            "legend": {"blue": "Claude Code", "green": "Données versionnées", "gray": "Composant"},
            "line": "Appel", "dash": "Chargement · dépendance",
        },
        "en": {
            "title": "The Claude Code harness",
            "me": ("Me", "terminal · voice"),
            "zone": "Claude Code · terminal",
            "settings": ("Settings", "settings.json", "model · effort · language"),
            "rules": ("Instructions", "CLAUDE.md", "automatic memory"),
            "status": ("Status line", "PowerShell script", "context · quotas · cost"),
            "cc": ("Claude Code", "the agent", "reads context · calls tools"),
            "mods": ("Mods", "banner · dashboard", "TSX hooks"),
            "skills": ("Skills", "documents · diagrams", "tickets · browser"),
            "design": ("Shared design", "variables · themes", "components"),
            "machine": "On the machine",
            "cli": ("CLIs", "gh · tickets", "dev-browser"),
            "chrome": ("Chrome", "Claude extension", "or debug port"),
            "render": ("Rendering", "Python · headless Chrome", "HTML · PDF · PNG"),
            "github": "GitHub · private repo",
            "repo": ("Config repo", "~/.claude under git", "allow-list"),
            "claudeai": "claude.ai",
            "imported": ("Imported skills", "copy of the local skills"),
            "note": "Git stays the single source",
            "l_ask": "requests", "l_load": "loads", "l_json": "JSON", "l_drive": "drives", "l_call": "calls",
            "l_style": "style", "l_render": "renders",
            "l_push": "signed commit · leak hook · push",
            "l_zip": "skills as zip · manual import",
            "legend": {"blue": "Claude Code", "green": "Versioned data", "gray": "Component"},
            "line": "Call", "dash": "Loading · dependency",
        },
    },
    "cortx-architecture": {
        "fr": {
            "title": "Architecture de CortX",
            "me": ("Moi", "souris · clavier"), "agents": ("Agents IA", "Claude Code · Codex"),
            "zone": "CortX", "pill": "Rust · Tauri 2",
            "gui": ("App de bureau", "Tauri · React", "projets · terminal"), "tui": ("TUI", "ratatui", "scripts"),
            "cli": ("CLI", "cortx", "--json partout"), "mcp": ("Serveur MCP", "cortx-mcp", "stdio"),
            "core": ("cortx-core", "modèles · stockage", "gestion des processus"),
            "proc": ("Services", "PTY · ports · logs", "sessions restaurées"),
            "init": ("Init du shell", "cortx init", "alias · prompt · shims"),
            "data": ("Données", "fichiers JSON", "projets · outils · alias"),
            "shells": "Shells", "shells_node": ("PowerShell · bash", "zsh · fish"),
            "backup": "Sauvegarde", "backup_node": ("Dépôt git privé", "cortx backup"),
            "note": "Les quatre interfaces partagent les mêmes données",
            "l_gen": "génère", "l_push": "push",
            "legend": {"blue": "Cœur partagé", "green": "Données", "gray": "Composant"},
            "line": "Appel", "dash": "Génération · sauvegarde",
        },
        "en": {
            "title": "CortX architecture",
            "me": ("Me", "mouse · keyboard"), "agents": ("AI agents", "Claude Code · Codex"),
            "zone": "CortX", "pill": "Rust · Tauri 2",
            "gui": ("Desktop app", "Tauri · React", "projects · terminal"), "tui": ("TUI", "ratatui", "scripts"),
            "cli": ("CLI", "cortx", "--json everywhere"), "mcp": ("MCP server", "cortx-mcp", "stdio"),
            "core": ("cortx-core", "models · storage", "process management"),
            "proc": ("Services", "PTY · ports · logs", "restored sessions"),
            "init": ("Shell init", "cortx init", "aliases · prompt · shims"),
            "data": ("Data", "JSON files", "projects · tools · aliases"),
            "shells": "Shells", "shells_node": ("PowerShell · bash", "zsh · fish"),
            "backup": "Backup", "backup_node": ("Private git repo", "cortx backup"),
            "note": "All four interfaces share the same data",
            "l_gen": "generates", "l_push": "push",
            "legend": {"blue": "Shared core", "green": "Data", "gray": "Component"},
            "line": "Call", "dash": "Generation · backup",
        },
    },
}


def node(id_, cls, col, row, icon, lines, style=""):
    b, *small = lines
    smalls = "".join(f"<small>{s}</small>" for s in small)
    return (f'    <div class="node {cls}" id="{id_}" style="grid-column:{col};grid-row:{row};{style}">\n'
            f'      <div class="ico">{icon}</div><div><b>{b}</b>{smalls}</div>\n    </div>\n')


def harness_overview(t):
    lucide = lambda n: f'<i data-lucide="{n}"></i>'
    body = f'''  <h1>{t["title"]}</h1>
  <div class="canvas">
  <div class="diagram" data-flow="lr" style="width:1568px;
       grid-template-columns: 170px 56px 200px 200px 200px 64px 230px 64px 240px;
       grid-template-rows: 24px 22px 96px 30px 116px 30px 96px 30px 92px 14px 26px;">
    <div class="group main" id="cc-zone" style="grid-column:3/6;grid-row:2/11"></div>
    <div class="group" id="machine" style="grid-column:7;grid-row:2/11"></div>
    <div class="group-label" style="grid-column:3/5;grid-row:2"><img data-logo="si:claude">{t["zone"]}</div>
    <div class="group-label" style="grid-column:7;grid-row:2"><i data-lucide="monitor"></i>{t["machine"]}</div>
    <div class="node person" id="me" style="grid-column:1;grid-row:5">
      <div class="ico">{lucide("user")}</div><div><b>{t["me"][0]}</b><small>{t["me"][1]}</small></div>
    </div>
{node("settings", "k-green fill tall", 3, 3, lucide("sliders-horizontal"), t["settings"])}{node("rules", "k-green fill tall", 4, 3, lucide("scroll-text"), t["rules"])}{node("status", "tall", 5, 3, lucide("gauge"), t["status"])}{node("cc", "k-blue fill tall", "3/5", 5, '<img data-logo="si:claude">', t["cc"])}{node("mods", "tall", 3, 7, lucide("puzzle"), t["mods"])}{node("skills", "k-green fill tall", 4, 7, lucide("wand-sparkles"), t["skills"])}{node("design", "k-green fill tall", 4, 9, lucide("palette"), t["design"])}{node("chrome", "tall", 7, 5, '<img data-logo="si:googlechrome">', t["chrome"])}{node("cli", "tall", 7, 7, lucide("terminal"), t["cli"])}{node("render", "tall", 7, 9, lucide("file-output"), t["render"])}    <div class="stack" style="grid-column:9;grid-row:2/11;row-gap:30px">
      <div class="box" id="github">
        <div class="group-label"><img data-logo="si:github">{t["github"]}</div>
{node("repo", "k-green fill", "auto", "auto", lucide("git-branch"), t["repo"], "min-height:96px")}      </div>
      <div class="box" id="claudeai" style="row-gap:10px">
        <div class="group-label"><img data-logo="si:claude">{t["claudeai"]}</div>
{node("imported", "", "auto", "auto", lucide("package"), t["imported"], "min-height:86px;margin-top:8px")}        <div class="note plain">{t["note"]}</div>
      </div>
    </div>
    <svg class="wires"></svg>
  </div>
  </div>
  <div class="legend" data-auto></div>
'''
    links = f'''const LINKS = [
  ["me", "cc", {{ label: "{t["l_ask"]}" }}],
  ["settings", "cc", {{ dash: true, label: "{t["l_load"]}" }}],
  ["rules", "cc", {{ dash: true }}],
  ["cc", "status", {{ from: "r", to: "b", fromAt: .25, dash: true, label: "{t["l_json"]}" }}],
  ["cc", "chrome", {{ label: "{t["l_drive"]}" }}],
  ["cc", "mods", {{ dash: true }}],
  ["cc", "skills"],
  ["skills", "cli", {{ label: "{t["l_call"]}" }}],
  ["skills", "design", {{ dash: true, label: "{t["l_style"]}" }}],
  ["design", "render", {{ label: "{t["l_render"]}" }}],
  ["cc-zone", "github", {{ from: "t", to: "t", detour: 22, label: "{t["l_push"]}" }}],
  ["cc-zone", "claudeai", {{ from: "b", to: "b", detour: 18, label: "{t["l_zip"]}" }}],
];
const LEGEND = {{ blocks: {{ blue: "{t["legend"]["blue"]}", green: "{t["legend"]["green"]}", gray: "{t["legend"]["gray"]}" }}, line: "{t["line"]}", dash: "{t["dash"]}" }};'''
    return body, links


def cortx_architecture(t):
    lucide = lambda n: f'<i data-lucide="{n}"></i>'
    body = f'''  <h1>{t["title"]}</h1>
  <div class="canvas">
  <div class="diagram" data-flow="tb" style="width:1210px;
       grid-template-columns: 200px 200px 200px 200px 60px 240px;
       grid-template-rows: 92px 30px 22px 96px 30px 110px 30px 92px 30px;">
    <div class="group main" id="cortx" style="grid-column:1/5;grid-row:3/10"></div>
    <div class="group-label" style="grid-column:1/3;grid-row:3"><img data-logo="si:tauri">{t["zone"]}</div>
    <div class="pill" style="grid-column:4;grid-row:3;justify-self:end">{t["pill"]}</div>
    <div class="node person" id="me" style="grid-column:1;grid-row:1">
      <div class="ico">{lucide("user")}</div><div><b>{t["me"][0]}</b><small>{t["me"][1]}</small></div>
    </div>
    <div class="node person" id="agents" style="grid-column:4;grid-row:1">
      <div class="ico">{lucide("bot")}</div><div><b>{t["agents"][0]}</b><small>{t["agents"][1]}</small></div>
    </div>
{node("gui", "tall", 1, 4, lucide("app-window"), t["gui"])}{node("tui", "tall", 2, 4, lucide("square-terminal"), t["tui"])}{node("cli", "tall", 3, 4, lucide("terminal"), t["cli"])}{node("mcp", "tall", 4, 4, lucide("plug"), t["mcp"])}{node("proc", "tall", 1, 6, lucide("activity"), t["proc"])}{node("core", "k-blue fill tall", "2/4", 6, '<img data-logo="si:rust">', t["core"])}{node("init", "tall", 4, 6, lucide("wand-sparkles"), t["init"])}{node("data", "k-green fill tall", 2, 8, lucide("database"), t["data"])}    <div class="note plain" style="grid-column:3/5;grid-row:9;align-self:end">{t["note"]}</div>
    <div class="stack" style="grid-column:6;grid-row:3/9;row-gap:30px;align-content:end">
      <div class="box" id="shells">
        <div class="group-label">{lucide("terminal")}{t["shells"]}</div>
{node("sh", "", "auto", "auto", lucide("square-terminal"), t["shells_node"], "min-height:92px")}      </div>
      <div class="box" id="backup">
        <div class="group-label"><img data-logo="si:github">{t["backup"]}</div>
{node("repo", "k-green fill", "auto", "auto", lucide("git-branch"), t["backup_node"], "min-height:92px")}      </div>
    </div>
    <svg class="wires"></svg>
  </div>
  </div>
  <div class="legend" data-auto></div>
'''
    links = f'''const LINKS = [
  ["me", "gui"],
  ["agents", "mcp"],
  ["gui", "core", {{ at: .5 }}],
  ["tui", "core", {{ at: .5 }}],
  ["cli", "core", {{ at: .5 }}],
  ["mcp", "core", {{ at: .5 }}],
  ["core", "proc"],
  ["core", "init"],
  ["core", "data"],
  ["init", "sh", {{ dash: true, label: "{t["l_gen"]}" }}],
  ["data", "repo", {{ dash: true, label: "{t["l_push"]}" }}],
];
const LEGEND = {{ blocks: {{ blue: "{t["legend"]["blue"]}", green: "{t["legend"]["green"]}", gray: "{t["legend"]["gray"]}" }}, line: "{t["line"]}", dash: "{t["dash"]}" }};'''
    return body, links


BUILDERS = {"harness-overview": harness_overview, "cortx-architecture": cortx_architecture}


def make(name, lang):
    body, links = BUILDERS[name](T[name][lang])
    html = TEMPLATE.replace('lang="fr"', f'lang="{lang}"', 1)
    html = re.sub(r"<title>.*?</title>", f"<title>{T[name][lang]['title']}</title>", html, count=1)
    html = re.sub(r"  <h1>.*?  <div class=\"legend\" data-auto></div>\n", lambda m: body, html, count=1, flags=re.S)
    html = re.sub(r"const LINKS = \[.*?\];\nconst LEGEND = .*?;\n", lambda m: links + "\n", html, count=1, flags=re.S)
    path = HERE / f"{name}.{lang}.html"
    path.write_text(html, encoding="utf-8", newline="\n")
    return path


def build(names, render=True):
    for name in names:
        for lang in ("en", "fr"):
            src = make(name, lang)
            if not render:
                print(src)
                continue
            dest = OUT if lang == "en" else OUT / "fr"
            dest.mkdir(exist_ok=True)
            for dark in (False, True):
                png = dest / f"{name}{'-dark' if dark else ''}.png"
                cmd = [sys.executable, str(SKILL / "scripts" / "render.py"), str(src), "--figure", "-o", str(png)]
                if dark:
                    cmd.append("--dark")
                r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
                print(f"── {lang}{' dark' if dark else ''}: " + (r.stdout + r.stderr).strip().replace("\n", "\n   "))


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    build(args or list(BUILDERS), render="--no-png" not in sys.argv)
