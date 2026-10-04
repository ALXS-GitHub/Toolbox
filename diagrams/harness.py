"""Diagrams of the Claude Code harness section (texts + layouts). Registered by make.py."""

L = lambda n: f'<i data-lucide="{n}"></i>'  # noqa: E731
LOGO = lambda s: f'<img data-logo="si:{s}">'  # noqa: E731

T = {
    "harness-commit": {
        "fr": {
            "title": "Un commit de la configuration",
            "zone": "Poste de travail", "remote": "GitHub · privé",
            "files": ("Fichiers modifiés", "settings · skills", "scripts"),
            "allow": ("Liste blanche", ".gitignore", "tout est ignoré sauf…"),
            "hook": ("Hook pre-commit", "noms · secrets", "emails · réglages"),
            "sign": ("Signature", "clé SSH", "coffre de mots de passe"),
            "repo": ("Dépôt de config", "historique signé"),
            "blocked": ("Commit bloqué", "le problème est affiché"),
            "l_add": "git add", "l_commit": "git commit", "l_ok": "OK", "l_push": "push SSH", "l_ko": "sinon",
            "legend": {"green": "Données", "blue": "Garde-fou", "rose": "Refus", "gray": "Étape"},
        },
        "en": {
            "title": "Committing the configuration",
            "zone": "Workstation", "remote": "GitHub · private",
            "files": ("Changed files", "settings · skills", "scripts"),
            "allow": ("Allow-list", ".gitignore", "all ignored except…"),
            "hook": ("Pre-commit hook", "names · secrets", "e-mails · settings"),
            "sign": ("Signing", "SSH key", "password manager"),
            "repo": ("Config repo", "signed history"),
            "blocked": ("Commit blocked", "the problem is shown"),
            "l_add": "git add", "l_commit": "git commit", "l_ok": "OK", "l_push": "SSH push", "l_ko": "otherwise",
            "legend": {"green": "Data", "blue": "Guardrail", "rose": "Rejection", "gray": "Step"},
        },
    },
    "harness-design": {
        "fr": {
            "title": "La chaîne documentaire",
            "src": "Design commun", "skills": "Skills", "out": "Fichiers produits",
            "vars": ("Variables et thèmes", "clair · sombre", "contrat versionné"),
            "comp": ("Composants", "CSS · catalogue", "police · outils Python"),
            "build": ("build.py", "vérifie les contrastes", "recopie partout"),
            "documents": ("documents", "rapports · notes"), "pages": ("pages", "pages visuelles"),
            "docsite": ("doc-site", "petites docs"), "diagrams": ("diagrams", "schémas"),
            "render": ("Script du skill", "injecte le design", "contrôle le résultat"),
            "chrome": ("Chrome headless", "rendu · capture", "impression"),
            "html": ("HTML", "autonome · hors ligne"), "pdf": ("PDF", "A4 paginé"), "png": ("PNG", "relecture · figures"),
            "l_copy": "copie", "l_render": "rendu",
            "legend": {"green": "Source du design", "blue": "Script", "gray": "Composant"},
        },
        "en": {
            "title": "The document pipeline",
            "src": "Common design", "skills": "Skills", "out": "Output files",
            "vars": ("Variables and themes", "light · dark", "versioned contract"),
            "comp": ("Components", "CSS · catalogue", "font · Python tools"),
            "build": ("build.py", "checks contrast", "copies everywhere"),
            "documents": ("documents", "reports · notes"), "pages": ("pages", "visual pages"),
            "docsite": ("doc-site", "small docs"), "diagrams": ("diagrams", "diagrams"),
            "render": ("Skill script", "injects the design", "checks the result"),
            "chrome": ("Headless Chrome", "render · capture", "print"),
            "html": ("HTML", "standalone · offline"), "pdf": ("PDF", "paginated A4"), "png": ("PNG", "review · figures"),
            "l_copy": "copy", "l_render": "render",
            "legend": {"green": "Design source", "blue": "Script", "gray": "Component"},
        },
    },
    "harness-claudeai": {
        "fr": {
            "title": "Les skills vers claude.ai",
            "repo": "Dépôt git · source", "ai": "claude.ai",
            "skill": ("skills/&lt;nom&gt;", "SKILL.md · scripts", "modèles · exemples"),
            "pack": ("skills.ps1 pack", "vérifie le frontmatter", "construit le zip"),
            "zip": ("dist/&lt;nom&gt;.zip", "hors du dépôt"),
            "imported": ("Skill importé", "web · mobile · desktop"),
            "synced": ("Copie locale", "skills/synced"),
            "l_zip": "zip", "l_import": "import à la main", "l_off": "synchro coupée",
            "legend": {"green": "Source", "blue": "Script", "amber dashed": "Désactivé", "gray": "Composant"},
        },
        "en": {
            "title": "Skills to claude.ai",
            "repo": "Git repo · source", "ai": "claude.ai",
            "skill": ("skills/&lt;name&gt;", "SKILL.md · scripts", "templates · examples"),
            "pack": ("skills.ps1 pack", "checks front matter", "builds the zip"),
            "zip": ("dist/&lt;name&gt;.zip", "outside the repo"),
            "imported": ("Imported skill", "web · mobile · desktop"),
            "synced": ("Local copy", "skills/synced"),
            "l_zip": "zip", "l_import": "manual import", "l_off": "sync turned off",
            "legend": {"green": "Source", "blue": "Script", "amber dashed": "Turned off", "gray": "Component"},
        },
    },
    "harness-tickets": {
        "fr": {
            "title": "Le gestionnaire de tickets depuis les agents",
            "me": ("Moi", "« prends le ticket 42 »"),
            "term": "Claude Code · terminal", "ai": "claude.ai · mobile", "svc": "Service de tickets",
            "skill": ("Skill tickets", "lire · coder · commiter", "statut · commentaire"),
            "cli": ("CLI", "--json · aide pour agents", "connexion par navigateur"),
            "mods": ("Mods", "bandeau du ticket", "tableau de bord"),
            "connector": ("Connecteur", "claude.ai"),
            "api": ("Base et API", "règles d'accès", "par utilisateur"),
            "mcp": ("Serveur MCP", "OAuth"),
            "l_default": "par défaut", "l_watch": "relit", "l_oauth": "sans shell",
            "legend": {"blue": "Chemin par défaut", "green": "Données", "gray": "Composant"},
            "line": "Appel", "dash": "Observation · repli",
        },
        "en": {
            "title": "The ticket manager, from agents",
            "me": ("Me", "\"take ticket 42\""),
            "term": "Claude Code · terminal", "ai": "claude.ai · mobile", "svc": "Ticket service",
            "skill": ("Tickets skill", "read · code · commit", "status · comment"),
            "cli": ("CLI", "--json · agent help", "browser sign-in"),
            "mods": ("Mods", "ticket banner", "dashboard"),
            "connector": ("Connector", "claude.ai"),
            "api": ("Database and API", "access rules", "per user"),
            "mcp": ("MCP server", "OAuth"),
            "l_default": "by default", "l_watch": "reads", "l_oauth": "no shell",
            "legend": {"blue": "Default path", "green": "Data", "gray": "Component"},
            "line": "Call", "dash": "Watching · fallback",
        },
    },
}


def builders(node):
    def page(t, width, cols, rows, inner, links, legend):
        legend_js = ", ".join(f'"{k}": "{v}"' if " " in k else f'{k}: "{v}"' for k, v in legend["blocks"].items())
        extra = "".join(f', {k}: "{v}"' for k, v in legend.items() if k != "blocks")
        body = f'''  <h1>{t["title"]}</h1>
  <div class="canvas">
  <div class="diagram" data-flow="lr" style="width:{width}px;
       grid-template-columns: {cols};
       grid-template-rows: {rows};">
{inner}    <svg class="wires"></svg>
  </div>
  </div>
  <div class="legend" data-auto></div>
'''
        js = "const LINKS = [\n" + "".join(f"  {l},\n" for l in links) + "];\n"
        js += f"const LEGEND = {{ blocks: {{ {legend_js} }}{extra} }};"
        return body, js

    def commit(t):
        inner = f'''    <div class="group main" id="ws" style="grid-column:1/8;grid-row:1/5"></div>
    <div class="group" id="gh" style="grid-column:9;grid-row:1/3"></div>
    <div class="group-label" style="grid-column:1/4;grid-row:1">{L("laptop")}{t["zone"]}</div>
    <div class="group-label" style="grid-column:9;grid-row:1">{LOGO("github")}{t["remote"]}</div>
{node("files", "k-green fill tall", 1, 2, L("files"), t["files"])}{node("allow", "tall", 3, 2, L("list-checks"), t["allow"])}{node("hook", "k-blue fill tall", 5, 2, L("shield-check"), t["hook"])}{node("sign", "tall", 7, 2, L("key-round"), t["sign"])}{node("repo", "k-green fill tall", 9, 2, L("git-branch"), t["repo"])}{node("blocked", "k-rose fill tall", 5, 4, L("octagon-x"), t["blocked"])}'''
        links = [f'["files", "allow", {{ label: "{t["l_add"]}" }}]',
                 f'["allow", "hook", {{ label: "{t["l_commit"]}" }}]',
                 f'["hook", "sign", {{ label: "{t["l_ok"]}" }}]',
                 f'["sign", "repo", {{ label: "{t["l_push"]}" }}]',
                 f'["hook", "blocked", {{ label: "{t["l_ko"]}" }}]']
        return page(t, 1400, "190px 64px 190px 64px 200px 64px 230px 64px 190px", "22px 104px 34px 84px",
                    inner, links, {"blocks": t["legend"]})

    def design(t):
        inner = f'''    <div class="group" id="src" style="grid-column:1;grid-row:1/6"></div>
    <div class="group main" id="sk" style="grid-column:5;grid-row:1/6"></div>
    <div class="group" id="out" style="grid-column:11;grid-row:1/6"></div>
    <div class="group-label" style="grid-column:1;grid-row:1">{t["src"]}</div>
    <div class="group-label" style="grid-column:5;grid-row:1">{t["skills"]}</div>
    <div class="group-label" style="grid-column:11;grid-row:1">{t["out"]}</div>
{node("vars", "k-green fill tall", 1, "2/4", L("palette"), t["vars"])}{node("comp", "k-green fill tall", 1, "4/6", L("component"), t["comp"])}{node("build", "k-blue fill tall", 3, "2/6", L("hammer"), t["build"])}{node("documents", "tall", 5, 2, L("file-text"), t["documents"])}{node("pages", "tall", 5, 3, L("layout-template"), t["pages"])}{node("docsite", "tall", 5, 4, L("book-open"), t["docsite"])}{node("diagrams", "tall", 5, 5, L("workflow"), t["diagrams"])}{node("render", "k-blue fill tall", 7, "2/6", L("wand-sparkles"), t["render"])}{node("chrome", "tall", 9, "2/6", LOGO("googlechrome"), t["chrome"])}{node("html", "tall", 11, "2/4", L("code-xml"), t["html"])}{node("pdf", "tall", 11, 4, L("file-type"), t["pdf"])}{node("png", "tall", 11, 5, L("image"), t["png"])}'''
        links = ['["vars", "build"]', '["comp", "build"]',
                 f'["build", "sk", {{ label: "{t["l_copy"]}" }}]', '["sk", "render"]',
                 f'["render", "chrome", {{ label: "{t["l_render"]}" }}]', '["chrome", "out"]']
        return page(t, 1620, "220px 56px 190px 56px 180px 56px 180px 56px 200px 56px 190px",
                    "22px 76px 76px 76px 76px", inner, links, {"blocks": t["legend"]})

    def claudeai(t):
        inner = f'''    <div class="group main" id="repo" style="grid-column:1/6;grid-row:1/3"></div>
    <div class="group" id="ai" style="grid-column:7;grid-row:1/5"></div>
    <div class="group-label" style="grid-column:1/4;grid-row:1">{L("git-branch")}{t["repo"]}</div>
    <div class="group-label" style="grid-column:7;grid-row:1">{LOGO("claude")}{t["ai"]}</div>
{node("skill", "k-green fill tall", 1, 2, L("folder-code"), t["skill"])}{node("pack", "k-blue fill tall", 3, 2, L("package"), t["pack"])}{node("zip", "tall", 5, 2, L("file-archive"), t["zip"])}{node("imported", "tall", 7, 2, L("wand-sparkles"), t["imported"])}{node("synced", "k-amber fill dashed tall", 7, 4, L("refresh-cw-off"), t["synced"])}'''
        links = ['["skill", "pack"]', f'["pack", "zip", {{ label: "{t["l_zip"]}" }}]',
                 f'["zip", "imported", {{ label: "{t["l_import"]}" }}]',
                 f'["imported", "synced", {{ dash: true, label: "{t["l_off"]}" }}]']
        return page(t, 1126, "200px 56px 200px 56px 190px 100px 210px", "22px 100px 40px 80px",
                    inner, links, {"blocks": t["legend"]})

    def tickets(t):
        inner = f'''    <div class="group main" id="term" style="grid-column:3/6;grid-row:1/5"></div>
    <div class="group" id="ai" style="grid-column:3/6;grid-row:6/8"></div>
    <div class="group" id="svc" style="grid-column:7;grid-row:1/8"></div>
    <div class="group-label" style="grid-column:3/6;grid-row:1">{LOGO("claude")}{t["term"]}</div>
    <div class="group-label" style="grid-column:3/6;grid-row:6">{L("smartphone")}{t["ai"]}</div>
    <div class="group-label" style="grid-column:7;grid-row:1">{L("server")}{t["svc"]}</div>
    <div class="node person" id="me" style="grid-column:1;grid-row:2">
      <div class="ico">{L("user")}</div><div><b>{t["me"][0]}</b><small>{t["me"][1]}</small></div>
    </div>
{node("skill", "tall", 3, 2, L("wand-sparkles"), t["skill"])}{node("cli", "k-blue fill tall", 5, 2, L("terminal"), t["cli"])}{node("mods", "tall", 5, 4, L("puzzle"), t["mods"])}{node("connector", "tall", 5, 7, LOGO("claude"), t["connector"])}{node("api", "k-green fill tall", 7, 2, L("database"), t["api"])}{node("mcp", "tall", 7, 7, L("plug"), t["mcp"])}'''
        links = ['["me", "skill"]', f'["skill", "cli", {{ label: "{t["l_default"]}" }}]',
                 f'["mods", "cli", {{ dash: true, label: "{t["l_watch"]}" }}]', '["cli", "api"]',
                 f'["connector", "mcp", {{ dash: true, label: "{t["l_oauth"]}" }}]', '["mcp", "api"]']
        return page(t, 1094, "160px 56px 210px 56px 210px 64px 230px", "22px 100px 28px 84px 34px 22px 84px",
                    inner, links, {"blocks": t["legend"], "line": t["line"], "dash": t["dash"]})

    return {"harness-commit": commit, "harness-design": design, "harness-claudeai": claudeai,
            "harness-tickets": tickets}
