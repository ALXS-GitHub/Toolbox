# Storyboard : « Une idée, un commit »

**Logline.** Une idée dictée sur un téléphone traverse, sans une seule coupe, tout mon
environnement : Zorg la range, Claude Code la prend dans CortX, la code, la fait vérifier
et signer, puis la documente. La caméra recule et révèle que tout ce trajet est une boucle,
au centre de laquelle s'écrit : Toolbox, mon écosystème.

**Format.** 56 s en boucle (28 mesures à 120 BPM). 16:9 en 1920×1080 et 9:16 en 1080×1920,
un rendu par langue (en, fr). Un seul monde 3D continu : chaque scène est une **station**
posée sur un anneau ; le **ticket** est l'objet qui voyage d'une station à l'autre.

**Fil conducteur visuel.** La carte du ticket ZORG-128 : bulle de chat, puis carte Zorg, puis ligne
de CLI, puis commit, puis document. Le fil ambre (l'accent du film) dessine son trajet.

**Cadre.** Chaque plan nomme son sujet ; la caméra le cadre entier, centré, avec de l'air (`src/camera.js`), se pose
le temps de lire et l'accompagne quand il voyage. Un décalage d'objectif remonte l'image de 5 % en 16:9 et de 9 %
en 9:16, pour laisser la bande basse aux sous-titres HTML.

**Son.** Musique originale synthétisée (`audio/music.py`), en ré mineur (Dm9, B♭maj7, Fmaj7, C6,
un accord par mesure). Les sons d'interface (`audio/sfx.py`) sont posés sur les repères de la
timeline (`src/timeline.js`, exportés dans `audio/cues.json`). Les temps : `audio/beats.json`.

Les sous-titres (une phrase par scène) sont du HTML synchronisé sur `currentTime`, traduit avec
le site. Dans l'image : seulement le texte des interfaces, les mots dictés et le final.

---

## Scène 1 : L'idée (0–10 s)

| Temps | Plan | Idée unique | Mouvement | Transition vers la suite | Son |
|---|---|---|---|---|---|
| 0,0–2,5 | **1a La voix** | L'idée naît à voix haute. | Plan rapproché sur le bloc de mots dictés, entier et centré : ils apparaissent un par un, par masque montant ; la forme d'onde (barres argile) les suit comme un curseur. Poussée lente. | Les mots rétrécissent et glissent dans le champ de saisie du téléphone (morphing typographique). | Pulsation de basse filtrée, un « tic » par mot. |
| 2,5–4,0 | **1b Le téléphone** | C'est claude.ai sur mon téléphone. | Recul : le téléphone entier, centré, légèrement de biais (6°). 3,5 : appui sur Envoyer. | Le texte du champ se transforme en bulle utilisateur qui monte. | 3,5 : clic + « pop » de la bulle. |
| 4,0–6,5 | **1c Claude répond** | Claude range l'idée via le connecteur Zorg. | Plan sur toute la conversation (bulle, appel d'outil, carte, réponse) : étincelle (4,0), « Zorg · create_ticket » (4,5), carte ZORG-128 (5,0), réponse en flux (5,5–6,5). | La carte se soulève de l'écran. | 4,5 : tic ; 5,0 : « pop » grave ; texte : cliquetis légers. |
| 6,5–8,0 | **1d L'envol** | Le ticket quitte le téléphone. | La carte se décolle (ombre portée sur l'écran) ; la caméra l'accompagne et la garde cadrée ; pendant le vol, elle se transforme du style claude.ai au style Zorg. | Travelling d'accompagnement. | Souffle montant. |
| 8,0–10,0 | **1e L'arrivée** | Il arrive dans le tableau. | Le tableau Zorg entre dans le champ ; la carte plonge dans la colonne Open (9,75), les autres cartes descendent sur ressort ; impact à 10,0. Plan posé sur la barre latérale et la colonne Open. | Raccord dans le mouvement. | 10,0 : impact (premier temps), le kick démarre. |

**9:16.** Les mots dictés tiennent sur cinq lignes ; le téléphone est cadré plein pied ; la carte
traverse l'image de bas en haut.

## Scène 2 : Le ticket (10–18 s)

| Temps | Plan | Idée unique | Mouvement | Transition | Son |
|---|---|---|---|---|---|
| 10,0–12,0 | **2a Le tableau** | Zorg tient toutes les tâches. | Plan posé sur la colonne Open et le nouveau ticket, bordé d'accent. | Recul. | Groove : kick, basse. |
| 12,0–15,0 | **2b Mêmes données** | Quatre surfaces, les mêmes données. | Les trois autres surfaces sortent de derrière le tableau, une par temps (12,5 bureau, 13,0 CLI, 13,5 MCP), en escalier diagonal (16:9) ou en grille 2 × 2 (9:16), chacune avec son libellé. Plan large qui les montre toutes, sans chevauchement. 14,0 : un fil ambre traverse la mention ZORG-128 de chaque surface. | Le CLI se détache, les autres se replient. | Un clic par couche ; 14,0 : « shhh » + carillon. |
| 15,0–18,0 | **2c Du CLI au terminal** | On passe sur l'ordinateur. | La caméra accompagne le plan CLI ; à 16,5 il se transforme en fenêtre CortX (barre de titre, rail des sessions qui se déplient). | Morphing CLI → CortX. | Souffle + filtre qui s'ouvre, 18,0 : premier temps. |

**9:16.** Le tableau est la vue mobile de Zorg (liste par statut, barre d'onglets en bas) ; les
quatre surfaces se rangent en grille 2 × 2.

## Scène 3 : L'agent (18–26 s)

| Temps | Plan | Idée unique | Mouvement | Transition | Son |
|---|---|---|---|---|---|
| 18,0–20,0 | **3a CortX** | Mon terminal, que j'ai écrit. | La fenêtre CortX entière ; frappe de `cc` (18,5), Entrée (19,0) : l'accueil de Claude Code et la statusline. | Zoom sur la zone de saisie. | Frappes ; 19,0 : accord. |
| 20,0–22,0 | **3b La consigne** | Je confie le ticket. | Zone de saisie et statusline, entières : frappe de « prends le ticket ZORG-128 », Entrée à 21,5 ; la session passe à « Working ». | Panoramique vers les lignes qui s'écrivent. | Frappes ; 21,5 : clic d'Entrée. |
| 22,0–24,0 | **3c La lecture** | Il lit tout via le CLI Zorg. | Cadre sur le bloc qui s'écrit : `● Skill(zorg-tickets)`, `● Bash(zorg ticket show ZORG-128)` → « 214 lignes lues ». 22,5–23,4 : la carte du ticket vient se ranger à côté de la fenêtre (au-dessus en 9:16) ; 23,5 : son statut passe de Open à In progress. | Plan fenêtre + carte. | 23,5 : « bloop ». |
| 24,0–26,0 | **3d Le diff** | Il modifie le code. | Fenêtre et carte : `● Update(apps/web/src/screens/Notes.tsx)` et son diff. 25,0 : les lignes ajoutées se soulèvent. | La caméra se rapproche des lignes. | Souffle, montée. |

**9:16.** Fenêtre CortX étroite (sans rail), police du terminal à 25 px, lignes repliées à la largeur ; la carte se range au-dessus de la fenêtre.

## Scène 4 : Le travail (26–38 s)

| Temps | Plan | Idée unique | Mouvement | Transition | Son |
|---|---|---|---|---|---|
| 26,0–28,5 | **4a Le code** | Les lignes du changement. | Les trois lignes ajoutées, en grand, alignées à gauche en une colonne centrée devant le terminal assombri et flouté. | Elles redescendent dans le terminal. | Arpège ; un « pop » par ligne. |
| 28,5–31,0 | **4b Serveur et build** | Il lance le serveur de dev et le build. | Fenêtre et carte : `cortx service start zorg web` → « Started service 'web' (PID 18432) », la session « web · zorg » apparaît dans le rail (point vert) ; `bun run build` → « built in 3.8s ». | Panoramique vers le portail. | 29,0 : tic ; 30,5 : « ding ». |
| 31,0–33,0 | **4c Le hook** | Le hook vérifie le contenu du commit. | Le panneau pre-commit (« vérifie ce que contient le commit ») au-dessus, la carte du commit qui entre dessous entre les deux montants du portail ; une lame balaie la carte trois fois, une coche s'allume à chaque passage : aucun secret (31,5), aucune adresse e-mail (32,0), aucun fichier sensible (32,5). | Le panneau cède la place à la demande 1Password. | Balayage filtré, trois tics montants. |
| 33,0–36,0 | **4d La signature** | 1Password autorise l'usage de la clé SSH qui signe le commit. | Même cadre : la demande 1Password monte à la place du panneau (33,0), sobre : « Autoriser git à utiliser la clé SSH « Git signing » ? », « git s'en sert pour signer le commit. », Refuser / Autoriser ; le curseur arrive (34,0) et clique sur « Autoriser » (35,0) ; la boîte se replie en sceau « Signé » qui frappe la carte du commit à 36,0. | Le sceau devient le badge « Signé · Vérifié ». | 35,0 : clic ; montée ; 36,0 : impact lourd. |
| 36,0–38,0 | **4e Signé** | Commit vérifié. | `7c1e9a2 · Signé · Vérifié` ; la caméra accompagne le commit vers le détail du ticket, où la carte du ticket le rejoint. | Travelling d'accompagnement. | Souffle. |

**9:16.** Même composition verticale (panneau au-dessus, commit dessous), qui convient aux deux formats.

## Scène 5 : La trace (38–46 s)

| Temps | Plan | Idée unique | Mouvement | Transition | Son |
|---|---|---|---|---|---|
| 38,0–41,0 | **5a Terminé** | Le ticket est fermé, avec la manière de vérifier. | La modale du ticket s'ouvre à partir de la carte, entière et centrée ; 38,5 : le statut In progress se transforme en Done ; 39,0 : ligne d'activité ; 39,5 : le commentaire de Claude s'écrit (en 9:16, gros plan sur la section commentaires). | Le document sort de derrière la modale. | 38,5 : « ding » ; frappe douce. |
| 41,0–46,0 | **5b Les skills** | Le travail devient un document et un schéma. | Le document (page de garde, sommaire, sections numérotées) sort à 41,5, la caméra l'accompagne et se pose sur lui ; puis le schéma (zones à titre en capitales, blocs, liens orthogonaux qui se tracent sur les temps), posé à côté (dessous en 9:16), plan posé sur lui. | Recul : on découvre l'anneau. | Pages : froissement ; liens : tics. |

**9:16.** Document et schéma empilés ; le schéma a sa propre mise en page verticale, en plus grand.

## Scène 6 : L'environnement (46–56 s)

| Temps | Plan | Idée unique | Mouvement | Transition | Son |
|---|---|---|---|---|---|
| 46,0–50,0 | **6a La boucle** | Tout est relié. | Plan large posé sur toutes les stations ; le fil ambre trace le trajet du ticket d'une station à l'autre et referme la boucle (49,5). | — | Montée d'arpège, une note par station. |
| 50,0–54,0 | **6b Toolbox** | Tout tient ensemble, et ça boucle. | L'anneau des stations reste en fond, assombri ; une impulsion ambre fait le tour de la boucle toutes les 2 s (idée → ticket → agent → commit → trace → idée). 50,5 : au centre de l'anneau naît le logo Toolbox en 3D (la mallette du site, extrudée), qui pivote vers nous sur un ressort lourd ; 51,0 : « Toolbox » monte par son masque à côté du logo (dessous en 9:16), puis, une demi-mesure plus tard (51,5), le sous-titre plus petit « Mon écosystème » (EN « My ecosystem ») ; en 9:16 le cadre se resserre sur le milieu de l'anneau pour un titre plus grand. | Le mot ressort par son masque, le logo se replie. | 50,5 : impact ; 51,0 : accent ; 51,5 : pop léger. |
| 54,0–56,0 | **6c Retour** | La boucle se referme. | La caméra plonge de l'anneau vers le téléphone, jusqu'à la pose exacte de 0,0 (même position, vitesse nulle) ; les écrans restent atténués pendant ce passage rapide et retrouvent leur pleine luminosité juste avant la jonction. | Raccord de boucle sans flou. | Reverse de cymbale vers le 0,0. |

**9:16.** L'anneau est vu de profil pour tenir en hauteur ; les trois lignes du final sont
empilées au tiers supérieur.

---

## Sous-titres (HTML)

| Fenêtre | Phrase |
|---|---|
| 0,6–9,6 | s1 : l'idée |
| 10,3–17,6 | s2 : le ticket |
| 18,3–25,6 | s3 : l'agent |
| 26,3–37,6 | s4 : le travail |
| 38,3–45,6 | s5 : la trace |
| 46,3–49,8 | s6 : l'environnement (puis le final dans l'image) |
