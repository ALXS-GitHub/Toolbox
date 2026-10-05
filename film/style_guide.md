# Style guide : l'univers réel des apps

Tout ce qui est montré dans le film est recréé à partir du code des vraies apps
(tokens, composants, mises en page), avec des **données fictives**. Aucune capture
d'une app réelle. Les valeurs ci-dessous sont lues dans le code source.

## Zorg (web, bureau) : design « Halcyon »

Source : `apps/web/src/globals.css`, `screens/Tickets.tsx`, `screens/TicketDetail.tsx`,
`components/Sidebar.tsx`, `components/TitleBar.tsx`, `components/ui/primitives.tsx`.

Le film utilise le **thème sombre**.

| Rôle | Valeur |
|---|---|
| Fond (`--background`) | `hsl(196 36% 9%)` ≈ `#0f1b1f` |
| Carte (`--card`) | `hsl(192 27% 13%)` ≈ `#18272a` |
| Texte | `hsl(180 30% 92%)` ≈ `#e4f1f1` |
| Texte atténué | `hsl(186 16% 64%)` ≈ `#95afb2` |
| Texte pâle (`text-faint`) | `hsl(186 12% 46%)` ≈ `#678183` |
| Bordure | `hsl(173 79% 68% / .12)` ; forte : `/ .22` |
| Accent (`--primary`) | `#2dd4bf` (sarcelle), texte sur accent `#06231f` |
| Accent doux (`--accent`) | accent à 16 % |
| Verre (barre latérale) | `hsl(192 46% 10% / .6)`, flou 20 px |
| Verre fort (modales, toasts) | `hsl(192 40% 12% / .8)`, flou 28 px |
| Statuts | Open `#2aa6f0`, In progress `#f0a517`, Blocked `#fb6f8e`, Done `#1bb89a` |
| Priorités | aucune `hsl(186 10% 54%)`, basse `#74b3cf`, moyenne `#f5b73a`, haute `#ff9a5c`, urgente `#ff7a88` |
| Lavis du fond | 3 radiales : accent 16 % en haut à gauche, corail 13 % à droite, ciel 11 % en bas |

- Rayons : `--radius` 16 px ; contrôles ≈ 10 px ; cartes 16 px ; modales ≈ 22 px ; puces 999 px.
- Ombres : `soft` = `0 1px 2px /.06, 0 6px 16px -10px /.22` ; `pop` = `0 12px 28px -12px /.2, 0 28px 60px -20px /.3`
  (couleur d'ombre `hsl(196 60% 2%)` en sombre).
- **Barre latérale** 252 px, verre. Logo 32 px arrondi 7 px + « Zorg » (titrage 15 px).
  Groupes en capitales 10,5 px, interlettrage 0,07 em : TRAVAIL (Tickets), CONNAISSANCE (Notes),
  TEMPS (Rappels, Agenda), SYSTÈME (Projet, Réglages). Élément actif : fond accent doux, icône en accent.
- **En-tête d'écran** 56 px : « Tickets » (titrage 18 px semi-gras) + « 12 tickets » ; recherche
  « Rechercher… (/) », « Filtrer », sélecteur de vue (Kanban, Liste, Tableau, Versions), bouton accent « + Nouveau ».
- **Colonne kanban** 286 px, `rounded-xl`, bordure, fond carte à 42 % ; en-tête : pastille de statut,
  nom, compteur pâle, « + ».
- **Carte ticket** : `rounded-lg`, bordure, fond carte, ombre douce, padding 10×12.
  Ligne 1 : glyphe de priorité (3 barres 3 px de large, hauteurs 4/8/12, éteintes à 26 %), référence
  mono 11 px pâle `#ZORG-128`, à droite avatar 20 px. Ligne 2 : titre 14 px poids 480.
  Ligne 3 : puces de labels (pilule, 11 px/500, point 7 px, fond couleur 14 %, bordure couleur 36 %).
- **Pastille de statut** 11 px, bordure 2 px : Open = anneau vide ; In progress = demi-disque
  (conic 50 %) ; Done = disque plein avec coche (trait 3,2, couleur carte).
  Les noms de statuts par défaut sont **en anglais même dans l'UI française** (fidélité).
- **Détail du ticket** : modale verre fort, rayon 22 px. Fil d'Ariane mono, titre (titrage 20 px),
  deux colonnes : à gauche labels, DESCRIPTION, COMMENTAIRES & ACTIVITÉ ; à droite, propriétés
  (Statut, Priorité, Assigné, Projet, Labels) en boutons 36 px sous des libellés en capitales 10,5 px.
  Commentaire : carte bordée, avatar 20 px, nom 12 px, « · Auj. », corps 13 px.
  Activité : une ligne 11,5 px pâle, « **Claude** · Statut → Done · Auj. ».
- **App de bureau** (Tauri) : barre de titre verre fort 36 px, logo 18 px, « Zorg » 12 px,
  `v0.8.0` mono 10 px à 60 %, boutons fenêtre 46 px à icônes filaires 10 px.
- **Mobile** : barre d'onglets du bas en verre, 6 entrées, libellés 10 px, pilule active 28×48.
- **CLI** `zorg` : `ticket show` imprime `#128 Titre` en gras, une ligne pâle
  `statut: … · priorité: … · …`, puis le corps. Erreurs en rouge `✗`.
- **MCP** : outils `create_ticket`, `show_ticket`, `update_ticket`, `add_comment`…
  Réponses en markdown : `Créé : **ZORG-128** Titre`.
- Icônes : `lucide-react`, trait 2 px.

## CortX : fenêtre Terminal

Source : `frontend/src/styles/theme-halcyon.css`, `components/terminal/SessionRail.tsx`,
`components/layout/TitleBar.tsx`, `components/ui/sonner.tsx`, `crates/cortx-tui`.

Même système Halcyon que Zorg. Le terminal utilise le thème fourni **Halcyon Dark** :

| Rôle | Valeur |
|---|---|
| Fond terminal | `#0f1b1f`, texte `#e5f1f1`, curseur barre `#2dd4bf` |
| ANSI | noir `#16262b`, rouge `#ff7a88`, vert `#2dd4bf`, jaune `#f5b73a`, bleu `#48b9f5`, magenta `#c792ea`, cyan `#5fd7e6`, blanc `#c9d8d8` |
| Agent au travail | violet `#a78bfa` (point pulsé) |
| Service lancé | vert pulsé `--st-done` |
| En attente | ambre `#f5b73a`, « Waiting for you » |

- Barre de titre 36 px verre fort : logo 18 px, « Terminal », pilule **beta**, `v0.15.10` ;
  au centre le sélecteur de portée (pilules 20 px : Global, Agents n, projets avec point 6 px).
- Rail des sessions 240 px : en-tête « Sessions » + résumé « 3 · 1 agent · 1 running » ;
  sections projet en capitales ; lignes 40 px (icône 14 px, nom 12,5 px, seconde ligne 10,5 px mono) ;
  agent = icône `Sparkles` en accent ; pied « + New terminal ».
- Blocs de commande façon Warp : barre de 3 px à gauche (verte si succès), séparateur 1 px.
- Toast en bas à droite, 360 px, verre fort : icône `CircleCheck` verte, titre `build · zorg`,
  corps `bun run build finished in 3.8s`.
- Police du terminal 13 px, interligne 1,2.
- CLI : `cortx service start zorg web` → `Started service 'web' (PID 18432).`

## Claude Code dans le terminal

- Lancé par l'alias `cc` (généré par CortX) ; en-tête « ✻ Claude Code ».
- Outils affichés `● Bash(…)`, résultat `⎿ …`, `● Update(fichier)` avec un diff.
- Skill `zorg-tickets` (« Skill chargé : Zorg tickets »).
- **Statusline** (deux lignes, séparateur `  │  ` gris, palette One Dark) :
  `📁 ~/Projects/zorg` bleu `#61afef` · `🌿 main ✱2` jaune `#e5c07b` · `🤖 Opus 5.5` violet `#c678dd`
  · `⚡ high` jaune · `🧠 ▓▓▓▓░░░░░░ 41% · 82k/200k` vert `#98c379` · `💰 $1.12` vert ;
  ligne 2 : `⏳ 5h 34% ↻20:20` · `⏱️ 12m` · `📝 +46 -3` · `🔥 91%` orange `#d19a66`.
- Garde-fous : hook `pre-commit` qui relit chaque fichier indexé (secrets, adresses e-mail,
  fichiers sensibles) ; commits signés en SSH avec une clé gardée dans 1Password, qui demande
  l'autorisation (« Autoriser »).

## claude.ai (téléphone)

Recréation générique de l'app mobile, en sombre : fond `#262624`, surfaces `#30302e`,
texte `#faf9f5`, atténué `#a6a39b`, bulle utilisateur `#141413`, accent argile `#d97757`
(bouton d'envoi), logo étincelle de Claude (`assets/images/claude.png`).
Composeur arrondi « Répondre à Claude… », micro, bouton d'envoi carré arrondi.
Le connecteur Zorg apparaît comme un appel d'outil repliable « Zorg · create_ticket ».

## 1Password

Boîte de dialogue sombre générique « Demande de clé SSH », texte
« git veut signer un commit avec votre clé « Git signing ». », boutons « Refuser » (neutre)
et « Autoriser » (bleu `#1a73e8`). Pas de logo exact : une marque simplifiée (cercle et fente).

## Skills de documents et de schémas

- **documents** : feuille A4 claire, page de garde, sommaire, sections numérotées.
- **diagrams** : zones encadrées à titre en capitales, blocs trapus à contour net, liens
  orthogonaux avec libellés, légende.

## Toolbox (le site)

Accent du film : l'ambre du logo Toolbox, `#ffc107` / `#ffd454`. Police du site : Inter
(seulement pour les sous-titres HTML, qui vivent dans la page).
