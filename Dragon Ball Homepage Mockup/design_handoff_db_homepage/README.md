# Handoff : Homepage "Dragon Ball Universe"

## Overview
Refonte de la homepage du projet `dragon-ball-cards` (React + Vite + Tailwind) dans un style
"streaming premium" : hero cinématographique plein écran avec Shenron en arc et les 7 dragon
balls flottantes, puis 3 rangées horizontales de cartes personnages, et un footer discret.

## À propos des fichiers de design
`Dragon Ball Universe - Homepage.dc.html` est une **référence de design réalisée en HTML/CSS** :
un prototype qui montre le rendu et le comportement visés, **pas du code de production à copier
tel quel**. La tâche est de recréer ce design dans le codebase existant (`dragon-ball-cards`),
avec ses patterns : composants React fonctionnels dans `src/components`, classes Tailwind,
`react-router-dom` pour la navigation, données via `src/services/dragonBallApi.js`. Les
animations doivent passer par **Framer Motion** (spring / physique), pas par les keyframes CSS
utilisées dans le prototype.

Le prototype se lit dans un navigateur, mais utilise une syntaxe de template propre à l'outil de
design (`<sc-for>`, `<sc-if>`, `{{ }}`). Ne pas chercher à porter cette syntaxe : lire les
valeurs de style et la structure, et écrire du JSX idiomatique.

## Fidélité
**High-fidelity.** Couleurs, typographie, tailles, rayons, ombres et halos sont définitifs.
À recréer au pixel près. Toutes les valeurs exactes sont listées plus bas.

## Fichiers du codebase concernés
| Fichier | Action |
| --- | --- |
| `src/components/Hero.jsx` | Réécriture complète (nouveau hero Shenron + boules) |
| `src/components/CharacterRow.jsx` | Ajustements : header de rangée, boutons de scroll, paddings |
| `src/components/RowCard.jsx` | Réécriture du style de carte (glow doré, placeholder) |
| `src/pages/Home.jsx` | Ajout de la navbar fixe + footer, retrait du `mt-8` |
| `src/utils/characterCategories.js` | Inchangé (mêmes catégories, mêmes titres FR) |
| `src/assets/shenron.png` | Inchangé, réutilisé dans le hero |
| `tailwind.config.js` | Ajout des tokens listés en fin de document |

---

## Écran : Homepage (desktop, largeur mini 1440px)

Ordre vertical : navbar fixe (overlay) → hero 820px → rangées de cartes → footer.
Fond global de la page : `#05070e`.

### 1. Navbar (fixed, overlay sur le hero)
- `position: fixed; top/left/right: 0; z-index: 60`
- Padding : `22px 56px`. `display:flex`, `align-items:center`, `justify-content:space-between`
- Fond : `linear-gradient(180deg, rgba(5,7,14,.88) 0%, rgba(5,7,14,.45) 55%, rgba(5,7,14,0) 100%)`
  \+ `backdrop-filter: blur(6px)`
- **Gauche** (`flex, gap:12px, align-items:center`) :
  - Pastille dragon ball : 26×26px, `border-radius:50%`,
    `radial-gradient(circle at 32% 28%, #ffe9a8 0%, #ffb43d 30%, #e88a12 66%, #8a4206 100%)`,
    `box-shadow: 0 0 18px rgba(250,204,21,.45)`
  - Texte « Dragon Ball » : 15px / 700 / `letter-spacing:.22em` / uppercase / `#f4f4f6`
- **Droite** (`flex, gap:34px, align-items:center`) :
  - Lien « Accueil » : 13.5px / 500 / `letter-spacing:.06em` / `#e9e9ed`; hover `#facc15`
  - Bouton recherche : 36×36px, cercle, `border:1px solid rgba(233,233,237,.14)`,
    `background: rgba(255,255,255,.03)`, icône loupe 17px (`stroke-width:1.8`,
    cercle r=6.5 en 11,11 + trait 16,16 → 20.5,20.5), couleur `#e9e9ed`.
    Hover : bordure `rgba(250,204,21,.55)`, icône `#facc15`,
    `box-shadow: 0 0 20px rgba(250,204,21,.18)`, transition `all .25s ease`.

### 2. Hero
- `position:relative; height:820px; overflow:hidden`
- Fond : `radial-gradient(120% 80% at 50% 8%, #131b33 0%, #0a0e1a 46%, #05070e 100%)`

**Couches, de l'arrière vers l'avant :**

1. **Halo doré principal** — `absolute; top:-180px; left:50%; translateX(-50%); width:1500px;
   height:900px`,
   `radial-gradient(closest-side, rgba(250,204,21,.20) 0%, rgba(250,190,60,.10) 42%, rgba(250,204,21,0) 78%)`,
   `filter: blur(20px)`. Animation `breathe` : opacité 0.5 → 0.78 → 0.5, 11s, `ease-in-out`, infinie.
2. **Halo secondaire** — `top:120px; left:50%; translateX(-50%); width:820px; height:420px`,
   `radial-gradient(closest-side, rgba(255,214,120,.16), rgba(255,214,120,0) 72%)`, `blur(30px)`.
3. **Shenron** (`src/assets/shenron.png`, 537×465, PNG transparent) —
   `absolute; top:-40px; left:50%; margin-left:-760px; width:1520px; opacity:.62`.
   - Teinte dorée : `filter: sepia(1) saturate(3.1) hue-rotate(-8deg) brightness(1.06)
     contrast(1.04) drop-shadow(0 0 50px rgba(250,204,21,.35))`
   - Intégration en arc / effacement des boules d'origine de l'image :
     `mask-image: radial-gradient(78% 66% at 50% 34%, #000 42%, rgba(0,0,0,.55) 66%, rgba(0,0,0,0) 84%)`
     (prévoir aussi `-webkit-mask-image`)
   - `pointer-events:none`. Dérive lente `drift` : `translate3d(0,0,0) scale(1)` →
     `translate3d(-18px,-10px,0) scale(1.012)` → retour, 24s, `ease-in-out`, infinie.
4. **Voile de lisibilité** — `inset:0`,
   `linear-gradient(180deg, rgba(5,7,14,.55) 0%, rgba(5,7,14,0) 26%, rgba(5,7,14,.30) 62%, rgba(5,7,14,.92) 100%)`,
   `pointer-events:none`.
5. **Les 7 dragon balls** (voir ci-dessous).
6. **Bloc titre** — `absolute; left:0; right:0; bottom:96px; z-index:20;
   flex column; align-items:center; gap:20px; pointer-events:none`
   - Kicker « Sept boules · un souhait » : 11.5px / 600 / `letter-spacing:.42em` / uppercase /
     `rgba(250,204,21,.72)`
   - H1 « Dragon Ball Universe » : 92px / `line-height:.94` / 800 / `letter-spacing:-.03em`,
     centré, dégradé de texte
     `linear-gradient(180deg,#ffffff 26%,#fde68a 74%,#e0a80f 100%)` en `background-clip:text`
     \+ `color:transparent` + `filter: drop-shadow(0 8px 40px rgba(250,204,21,.22))`
   - Sous-titre, `max-width:620px`, centré, 15px / `line-height:1.6` /
     `rgba(233,233,237,.62)` / `text-wrap:pretty` :
     « L'encyclopédie des guerriers, des dieux et des menaces de l'univers. Fiches détaillées,
     races, affiliations et transformations. »

#### Les 7 dragon balls
Chaque boule = un conteneur positionné (qui porte le flottement) contenant :
- **Lueur** : `absolute; inset:-46%; border-radius:50%`,
  `radial-gradient(closest-side, rgba(255,176,54,.28→.36), rgba(255,176,54,0) 70%)`,
  `filter: blur(6–7px)` (opacité et blur croissants avec la taille de la boule)
- **Sphère** : `border-radius:50%`,
  `radial-gradient(circle at 32% 26%, #fff0c4 0%, #ffc357 24%, #f2941d 58%, #9d4a07 100%)`,
  `box-shadow: inset -7px -9px 16px rgba(110,45,0,.55), inset 6px 7px 12px rgba(255,240,196,.30), 0 0 24px rgba(250,180,40,.35)`
  (l'inset et le glow externe scalent avec le diamètre : de `inset -6px -8px 14px` / `0 0 20px`
  pour 42px à `inset -8px -10px 18px` / `0 0 30px` pour 66px)
- **Reflet spéculaire** : `left:22%; top:18%; width:26%; height:20%; border-radius:50%`,
  `radial-gradient(closest-side, rgba(255,255,255,.5), rgba(255,255,255,0))`, `blur(2px)`
- **Étoiles** : divs `background:#cf2e18`, taille 17–22% du diamètre (plus la boule a d'étoiles,
  plus elles sont petites), et
  `clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)`

Positions (en % du hero), tailles, et animation de flottement — **désynchronisées, trajectoires
non-linéaires différentes pour chacune** :

| Étoiles | left | top | Ø | keyframe | durée | delay |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 10.5% | 52% | 56px | `fa` | 9s | 0 |
| 2 | 21% | 69% | 46px | `fb` | 11.5s | -2.5s |
| 3 | 32% | 44% | 66px | `fc` | 13s | -5s |
| 4 | 46% | 73% | 42px | `fd` | 10s | -1.2s |
| 5 | 59% | 56% | 52px | `fe` | 12.5s | -3.8s |
| 6 | 73% | 67% | 60px | `ff` | 14s | -6.4s |
| 7 | 85.5% | 42% | 48px | `fg` | 10.8s | -8s |

Dispositions internes des étoiles (positions `left/top` en % de la sphère, avec `width=height=S`) :
- 1 étoile (S=22%) : 39/39
- 2 (S=22%) : 27/27 · 53/53
- 3 (S=21%) : 39/20 · 23/57 · 56/57
- 4 (S=20%) : 26/26 · 54/26 · 26/54 · 54/54
- 5 (S=19%) : 25/25 · 56/25 · 40.5/40.5 · 25/56 · 56/56
- 6 (S=18%) : 29/19 · 55/19 · 29/41 · 55/41 · 29/63 · 55/63
- 7 (S=17%) : 30/17 · 54/17 · 19/41.5 · 41.5/41.5 · 64/41.5 · 30/66 · 54/66

**Portage Framer Motion (attendu) :** remplacer les 7 keyframes CSS par des `motion.div` animés
en spring. Approche recommandée — pour chaque boule, une amplitude (x: ±6→17px, y: -7→-27px) et
une phase propres, jouées en boucle avec
`transition={{ type:"spring", stiffness: 12–22, damping: 9–14, mass: 1.2, repeat: Infinity,
repeatType: "mirror", delay: <phase> }}`, ou un `useAnimationFrame` avec deux sinusoïdes de
périodes premières entre elles (ex. x sur 9s, y sur 13s) pour garder des trajectoires non
circulaires. Point clé : **aucune boule ne doit être en phase avec une autre**.
Respecter `prefers-reduced-motion` en figeant le flottement.

### 3. Rangées de personnages
Conteneur : `position:relative; z-index:30; margin-top:-40px; padding-bottom:40px`
(le `-40px` fait remonter la première rangée dans le fondu du hero).

Rangées affichées, dans cet ordre, depuis `categorize()` : **Guerriers Z**, **Vilains**,
**Fusions** (les 3 premières non vides ; « Dieux & Anges » existe en 4ᵉ mais n'est pas affichée
par défaut — cf. prop `maxRows`).

**Header de rangée** (`padding: 0 56px; margin-bottom:18px`, `flex`, `align-items:flex-end`,
`justify-content:space-between`) :
- Gauche, `flex gap:14px align-items:center` :
  - Barre d'accent : `width:3px; height:20px; border-radius:2px`,
    `linear-gradient(180deg,#facc15,rgba(250,204,21,0))`
  - Titre H2 : 21px / 600 / `letter-spacing:-.01em` / `#f4f4f6`
  - Compteur « N fiches » : 12px / 500 / `rgba(233,233,237,.35)`
- Droite : 2 boutons ronds 32×32px, `border:1px solid rgba(233,233,237,.12)`,
  `background:rgba(255,255,255,.02)`, chevrons 15px `stroke-width:2`
  (`M15 19l-7-7 7-7` / `M9 5l7 7-7 7`), couleur `rgba(233,233,237,.7)`.
  Hover : bordure `rgba(250,204,21,.5)`, icône `#facc15`, transition `all .2s ease`.
  Action : `scrollBy({ left: ±700, behavior:"smooth" })` sur le scroller de la rangée
  (dans le codebase, garder le `useRef` déjà présent dans `CharacterRow.jsx` plutôt qu'un
  `querySelector`).

**Scroller** : `display:flex; gap:16px; overflow-x:auto; padding:14px 56px 22px;
scroll-behavior:smooth`, scrollbar masquée (utilitaire `.no-scrollbar` déjà présent dans
`src/index.css`).

**Carte** (`<Link to={/character/:id}>`) :
- `flex:none; width:212px; aspect-ratio:3/4; border-radius:12px; overflow:hidden`
- Fond : `linear-gradient(165deg,#161c2c 0%,#0c111c 100%)`,
  `border:1px solid rgba(233,233,237,.07)`, `box-shadow:0 8px 24px rgba(0,0,0,.45)`
- Halo interne derrière le personnage : `left:50%; top:44%; translate(-50%,-50%);
  150×150px; border-radius:50%`,
  `radial-gradient(closest-side, rgba(250,204,21,.14), rgba(250,204,21,0) 72%)`, `blur(8px)`
- Image : `absolute inset:0; width/height:100%; object-fit:contain;
  padding:14px 14px 42px; filter: drop-shadow(0 10px 22px rgba(0,0,0,.55))`, `loading="lazy"`
- **Placeholder si pas d'image** (ne jamais rendre un `<img>` sans `src`) : zone
  `top:0; bottom:42px`, centrée, initiale du nom en 64px / 800 / `letter-spacing:-.04em`,
  dégradé de texte `linear-gradient(180deg, rgba(253,230,138,.55), rgba(224,168,15,.12))`
- Voile bas : `inset:0`,
  `linear-gradient(180deg, rgba(5,7,14,0) 42%, rgba(5,7,14,.72) 78%, rgba(5,7,14,.95) 100%)`
- Badge « Fusion » (si `id ∈ [15,65,66]`) : `top:10px; right:10px`, 9px / 700 /
  `letter-spacing:.14em` / uppercase, texte `#0a0e1a` sur `#facc15`,
  `padding:3px 7px; border-radius:999px`
- Bloc texte : `left/right:0; bottom:0; padding:14px 14px 15px`
  - Nom : 14px / 600 / `letter-spacing:-.01em` / `#f4f4f6`, `truncate`, `translate="no"`
  - Race : 11.5px / 500 / `letter-spacing:.04em` / `rgba(250,204,21,.62)`, `truncate`,
    `margin-top:3px`, `translate="no"`
- **Hover** : `transform: translateY(-6px) scale(1.03)`,
  `box-shadow: 0 0 0 1px rgba(250,204,21,.45), 0 0 34px rgba(250,204,21,.22), 0 18px 40px rgba(0,0,0,.6)`,
  `border-color: rgba(250,204,21,.4)`.
  Transition : `transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease, border-color .3s ease`.
  En Framer Motion : `whileHover={{ y:-6, scale:1.03 }}` avec
  `transition={{ type:"spring", stiffness:320, damping:26 }}`.

### 4. Footer
- `padding:26px 56px; background:#02040a; border-top:1px solid rgba(233,233,237,.06)`
- Une seule ligne, 11.5px / `letter-spacing:.03em` / `rgba(233,233,237,.32)` :
  « Projet étudiant non officiel · Données fournies par dragonball-api.com ·
  Dragon Ball © Bird Studio / Shueisha / Toei Animation »

---

## Interactions & comportements
- Navbar fixe en overlay, toujours visible ; pas de changement d'état au scroll dans ce design.
- Rangées : scroll horizontal natif + boutons ±700px en `smooth`.
- Cartes : hover décrit ci-dessus ; clic → `/character/:id` (route existante).
- Hero : halo qui respire (11s), Shenron qui dérive (24s), 7 boules qui flottent en
  trajectoires désynchronisées. Rien de bloquant, tout est décoratif → `pointer-events:none`.
- Focus clavier : anneau `2px solid #facc15`, `outline-offset:2px` sur liens, boutons et cartes.
- `prefers-reduced-motion: reduce` → figer les 3 animations du hero.

## State management
Identique à l'existant, aucun nouveau besoin :
- `characters`, `loading`, `error` dans `Home.jsx` via `getAllCharacters()`
- Rangées dérivées par `categorize(characters)` (`src/utils/characterCategories.js`)
- Le prototype expose 2 réglages qui peuvent devenir des props/constantes :
  `showRace` (bool, défaut `true`) et `maxRows` (int 1–4, défaut `3`)
- Le prototype embarque un jeu de données de secours si l'API échoue ; dans l'app, garder
  l'écran d'erreur existant.

## Design tokens
Couleurs
| Rôle | Valeur |
| --- | --- |
| Fond page | `#05070e` |
| Fond hero (centre → bord) | `#131b33` → `#0a0e1a` → `#05070e` |
| Fond footer | `#02040a` |
| Surface carte | `#161c2c` → `#0c111c` |
| Bordure carte / UI | `rgba(233,233,237,.07)` · `rgba(233,233,237,.12–.14)` |
| Texte principal | `#f4f4f6` |
| Texte secondaire | `rgba(233,233,237,.62)` |
| Texte faible | `rgba(233,233,237,.32–.35)` |
| Accent (or) | `#facc15` |
| Accent clair (dégradés de titre) | `#fde68a` · `#e0a80f` |
| Dragon ball | `#fff0c4` · `#ffc357` · `#f2941d` · `#9d4a07` |
| Étoile | `#cf2e18` |
| Glow doré | `rgba(250,204,21,.14 / .18 / .22 / .35 / .45)` |

Espacements horizontaux : gouttière de page `56px`; gap cartes `16px`; gap rangées `52px`.
Rayons : carte `12px`, badge `999px`, boutons/pastilles `50%`.
Typo : Inter (400–800). Échelle utilisée : 92 / 21 / 15 / 14 / 13.5 / 12 / 11.5 / 9px.
Ombres : `0 8px 24px rgba(0,0,0,.45)` (carte), `0 18px 40px rgba(0,0,0,.6)` (carte hover).

### Ajouts suggérés à `tailwind.config.js`
```js
theme: { extend: {
  colors: {
    ink:   { 900: '#02040a', 800: '#05070e', 700: '#0a0e1a', 600: '#131b33' },
    card:  { from: '#161c2c', to: '#0c111c' },
    ball:  { 100: '#fff0c4', 200: '#ffc357', 400: '#f2941d', 700: '#9d4a07', star: '#cf2e18' },
  },
  backgroundImage: {
    'hero-ground': 'radial-gradient(120% 80% at 50% 8%, #131b33 0%, #0a0e1a 46%, #05070e 100%)',
    'ball-sphere': 'radial-gradient(circle at 32% 26%, #fff0c4 0%, #ffc357 24%, #f2941d 58%, #9d4a07 100%)',
  },
}}
```

## Assets
- `assets/shenron.png` (fourni dans ce dossier) — provient de `src/assets/shenron.png` du
  codebase, PNG 537×465 à fond transparent. Aucune retouche bitmap : la teinte dorée et le
  masque en arc sont faits en CSS.
- Artwork des personnages : URLs distantes renvoyées par
  `https://dragonball-api.com/api/characters?limit=100` (champ `image`).
- Icônes (loupe, chevrons) : SVG inline, `stroke` en `currentColor`. Le design system du projet
  recommande Phosphor Icons — les remplacer par `MagnifyingGlass`, `CaretLeft`, `CaretRight` si
  la lib est disponible.
- `nimbus.png` / `nimbus-b.png` ne sont pas utilisés par ce design.

## Fichiers de ce bundle
- `Dragon Ball Universe - Homepage.dc.html` — le prototype haute-fidélité (référence visuelle)
- `assets/shenron.png` — l'asset du hero
- `README.md` — ce document
