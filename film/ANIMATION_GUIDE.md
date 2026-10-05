# Guide d'animation

Règles de la maison. Elles s'appliquent à chaque plan, chaque composition et chaque correction.

## Contrat de rendu

- Le film est une **fonction pure du temps** : `window.seek(t)` dessine l'image `t`, rien d'autre.
- Interdits en mode rendu : `setTimeout`, `requestAnimationFrame`, transitions et animations CSS,
  état qui s'accumule d'une image à l'autre, `Math.random`. L'aléa passe par `rng(seed)` (mulberry32).
- Toute valeur animée se calcule depuis `t` : `spring()`, `track()`, `swap()`, `seg()` (dans `src/engine/motion.js`).
- Une image rendue deux fois donne le **même hash** (contrôle `tools/determinism.mjs`).
- 60 i/s, 4 sous-images accumulées dans la page pour le flou de mouvement (moyenne en flottant).
- Le temps est **bouclé** : `t` et `t + DUREE` donnent la même image.

## Palette du film

| Rôle | Valeur | Usage |
|---|---|---|
| Nuit | `#050b0d` → `#0b161a` | fond du monde 3D (dôme et sol) |
| Encre | `#e4f1f1` | titrage dans le monde |
| Accent du film | `#ffc107` (ambre Toolbox), clair `#ffd454` | le fil de la boucle, le mot mis en avant, le sceau de signature |
| Lumière d'appoint | sarcelle `#2dd4bf`, argile `#d97757` | contre-jours colorés, jamais sur l'UI |

Les UI gardent **leurs propres couleurs** (voir `style_guide.md`) et ne sont jamais teintées.
L'accent ambre est le seul ajouté par le film.

## Typographie

- **Titrage : Outfit** (la police de titrage de Zorg et CortX), 600–700, interlettrage −0,03 em,
  toujours **ferré à gauche**, posé dans l'espace 3D.
- **Interface : Plus Jakarta Sans** (la police d'interface de Zorg et CortX).
- JetBrains Mono n'apparaît que **dans** les terminaux et le code (police propre au terminal), jamais comme titrage.
- Taille minimale à l'écran : 22 px dans la vidéo 9:16 (≈ 7 px sur un téléphone de 360 px).
  Ce qui doit être lu passe à 34 px ou plus.

## Mouvement

- **Ressorts en forme close**, pas d'easing générique :
  - interface vive (boutons, puces, coches) : k 320, d 30 ;
  - défaut (cartes, fenêtres) : k 170, d 26 ;
  - lourd (titrage, caméra de proximité) : k 140, d 24 ;
  - jamais de rebond visible au-delà de 4 % (pas d'élastique).
- La **caméra** suit une spline de Hermite **fermée** (tangentes de Catmull-Rom en temps) :
  position et vitesse continues, y compris au raccord de la boucle.
- Une forme qui change d'état **se transforme** (taille, rayon, remplissage, position) au lieu d'être coupée.
  Les textes changent à l'intérieur d'une forme qui se transforme : sortie 0,1 s avant, entrée 0,08 s après.
- Les apparitions se font par **masque**, **montée** ou **transformation**, jamais par un simple fondu.
  Un fondu court est toléré seulement en accompagnement d'un mouvement.
- Les changements d'état tombent **sur les temps** (grille à 120 BPM, un temps = 0,5 s, une mesure = 2 s).
  Les grandes bascules tombent sur les premiers temps de mesure.
- Un nouveau gain visuel toutes les 2 à 4 s. Une idée par plan.

## Cadrage et lisibilité

- **Le sujet de chaque plan est entier, centré, avec de l'air autour.** Un plan nomme son sujet (un écran
  entier, ou une zone d'un écran : la zone de saisie, le bloc d'outils qui vient de s'écrire) et la caméra
  calcule sa distance pour qu'il tienne dans 80 × 72 % du cadre en 16:9, 86 × 60 % en 9:16
  (`src/camera.js`). Le bas du cadre reste aux sous-titres (décalage d'objectif de 5 % et 9 %).
- Un zoom est permis pour lire un détail, à condition que ce détail soit entier (la zone de saisie, la
  section commentaires) et que le zoom soit assumé.
- **La caméra se pose** sur chaque plan (vitesse nulle aux bornes), le temps de lire, avec une poussée lente
  de 5 % au plus. Les déplacements entre plans sont des courbes douces, sans rotation marquée : direction
  de visée à ±16° de l'écran au plus.
- Pendant un trajet (la carte qui vole, la fenêtre CortX qui se forme, le commit qui part), la caméra
  accompagne l'objet : elle le cadre à chaque image.
- **Netteté.** Le sujet est aussi net qu'une capture d'écran :
  - sortie en 2560 × 1440 (16:9, réduite en 1920 × 1080 au Lanczos pour les écrans plus petits) et
    1080 × 1920 (9:16) ; la scène est rendue suréchantillonnée (× 1,5 en 16:9, × 2 en 9:16) puis réduite
    par un filtre Lanczos-2 dans la dernière passe ;
  - chaque écran est peint dans une texture d'au moins 2 × sa plus grande taille à l'image, mesurée en
    posant toute la timeline au chargement (déterministe), avec mipmaps et filtrage anisotrope maximal ;
  - pas de profondeur de champ sauf en appui discret (gros plan d'ouverture, lignes de code), grain
    très léger, et l'interface est repeinte une fois par image (pas de traînée dans le texte) ;
  - l'obturateur suit la vitesse de la caméra (calculée à l'instant t, donc déterministe) : 72° et 4
    sous-images sur un plan posé, jusqu'à 360° et 12 sous-images sur un mouvement très rapide.

## Aucun clignotement

- Rien ne doit flasher ni scintiller (accessibilité). Plaques mates (rugosité ≥ 0,5, reflets
  d'environnement atténués), interface toujours devant sa plaque en profondeur (polygonOffset), plan
  proche de la caméra à 0,25 pour garder la précision de profondeur dans les plans larges.
- Contrôle automatique `tools/flicker.py`, d'après la définition du « flash général » de WCAG 2.3.1,
  par zone d'une grille 8 × 8 : aucune variation de luminance relative ≥ 10 % qui s'inverse dans les
  3 images suivantes, et aucune oscillation entretenue (4 alternances de suite ≥ 1 %). Zéro alerte
  exigée sur les 4 variantes.
- En 9:16, tout texte à lire mesure au moins ~27 px dans la vidéo (9 px sur un téléphone de 360 px).

## Profondeur et lumière

- Un seul monde 3D continu : chaque scène est une **station** posée sur une boucle. La caméra voyage
  entre les stations sans couper ; le final révèle toute la boucle.
- Écrans : plans émissifs, non affectés par la lumière ni par la tonalité, coins arrondis en SDF.
- Bloom **sélectif** : seuil au-dessus du blanc de l'UI ; seuls le fil ambre et les sceaux le dépassent.
- Profondeur de champ réglée sur la distance au sujet du plan ; jamais sur le texte à lire.
- Grain fin à graine fixe par image, vignette légère.

## Looks interdits

- titre centré sur un dégradé ;
- tout qui apparaît en fondu ;
- easing élastique, rebonds marqués ;
- halos ou lueurs sur les éléments d'interface ;
- avalanches de particules pour masquer un mouvement faible ;
- temps morts (plus de 1,5 s sans nouvel événement) ;
- étiquettes ou cadres dans les coins de l'image ;
- flou ou fondu sur le raccord de la boucle ;
- RGB split, lens flares, ondes de choc, chrome en dégradé.

## Données

Toutes les données sont fictives : ticket ZORG-128, cartes du tableau inventées, PID, hash de commit,
durées, coûts. Aucun nom réel, aucun e-mail, aucun chemin de dossier personnel, aucun montant réel.
Pas de Codex à l'écran.
