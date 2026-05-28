# vivaTTerra — Design System

> Where producers steward the land, consumers play an equally vital role in sustaining it.

vivaTTerra is a social-purpose, market-building enterprise. It builds value-added
agroforestry supply chains that reward ecological integrity *and* economic viability
in a single operating model. Producers sell the fruits of their labour; consumers
become aware of the tangible impact of their purchasing decisions.

The double **TT** in the wordmark is a visual metaphor for **grafting** — the
horticulture technique of joining two plants so they grow as one. Grafting *is*
the brand: two systems (ecology + economy, producer + consumer) joined into one
continuous living thing.

The first product carrying this model is freeze-dried açaí powder from Carmen
Pecha Bolivia (TCO Tacana 1 territory), sourced from agroforestry palms, processed
locally, and allocated across diversified channels (foodservice, retail, bulk, DTC).

---

## Sources used to build this system

| Source | Type | Path |
|---|---|---|
| `VivaTTerra Business Motivation.docx` | Business brief — positioning, theory of change, POC product | `uploads/` |
| `vivaTTerra-logo.png` | Wordmark logo, deep forest on cream | `uploads/`, copied to `assets/` |
| **Lato** | Single brand sans, loaded from Google Fonts CDN. Carries everything. | `colors_and_type.css` `@import` |
| Brand colors (in brief) | `#4B6040`, `#8CA47A`, `#f2e9d6` primary · `#bb734a`, `#2f2840` secondary | encoded in `colors_and_type.css` |

No codebase, Figma, or existing UI was provided — so the UI kit is a from-the-brand
recreation rather than a port of existing screens. Treat it as a starting visual
language, not as ground truth.

---

## Index — what's in this folder

```
README.md                   ← you are here
SKILL.md                    ← Claude Skill manifest (for use in Claude Code)
colors_and_type.css         ← all CSS variables (colors, type, spacing, radii, shadows, motion)
assets/
  vivaTTerra-logo.png       ← primary wordmark (forest on cream)
fonts/
  README.md                 ← font hosting notes (Lato via Google Fonts CDN)
preview/                    ← Design-System tab cards (one HTML per token group)
ui_kits/
  marketing/                ← Marketing-site UI kit (homepage, product, story, footer)
    index.html              ← interactive homepage
    README.md
    components/             ← reusable JSX components
```

---

## CONTENT FUNDAMENTALS

vivaTTerra's copy reads like a quiet, well-researched manifesto — closer to an
NGO white paper than a consumer brand. Specific traits, drawn from the
business motivation document:

**Voice & tone**
- **Considered, never breathless.** Sentences are long, complete, and assume an
  attentive reader. No exclamation marks. No hype words ("amazing", "revolutionary").
- **Systems-literate.** Words like *operating model*, *value chain*, *theory of
  change*, *channel diversification*, *traceability*, *infrastructure* appear
  naturally. The brand respects its audience's intelligence.
- **Ecological-economic dual register.** Almost every claim sits on both legs
  (ecological integrity ↔ economic viability; ecosystem health ↔ market alignment).
  Avoid copy that hits only one.
- **Earnest, not preachy.** State the mechanism, let the reader draw the moral
  conclusion. e.g. say *"healthy ecosystems produce higher-quality, more resilient
  outputs"* — don't say *"saving the planet feels good!"*

**Person & address**
- **First person plural** for the brand: *we*, *our*, *vivaTTerra is…*
- **"You" is rare** and reserved for direct consumer-facing moments
  (product copy, checkout, "thank you for…"). Most institutional copy is
  third-person observational.
- **"Producer"** > "farmer". **"Steward"** > "owner". Specific terminology matters.

**Casing**
- **Sentence case** for titles and buttons ("Our theory of change", not "Our Theory Of Change").
- **Wordmark is lowercase except the grafted TT**: `vivaTTerra`. Always spell it
  that way in body copy — it's the whole metaphor.
- **Eyebrows** (small uppercase labels above headings) use ALL CAPS with wide
  letter-spacing (`--tracking-eyebrow`). One per section, max.

**Numbering**
- The brief uses **decimal section numbers** (`3.0 Solution`, `3.1 Value-Added
  Supply Chains`). Carry this into long-form documents / pitch decks for a
  white-paper feel. Marketing pages should *not* use section numbers.

**Emoji & ornament**
- **No emoji.** Anywhere. Use real iconography, photography, or typographic accents.
- **No exclamation marks.** Use the period.
- Em-dashes are welcome — they fit the considered tone.

**Examples (verbatim from source)**
- *"Conventional commodity markets reward volume, short-term output, an asymmetric
  pricing power exercised by large incumbents."* — long, observational, no judgment word.
- *"Capital is framed as enabling infrastructure."* — passive, principled.
- *"Treating impact as economic infrastructure, not a marketing overlay."* —
  declarative differentiator; the whole brand fits in this sentence.

**What to avoid**
- "Sustainability journey", "eco-friendly", "save the planet", "guilt-free"
- Inflated single-word claims ("Pure.", "Real.", "Honest.")
- Consumer-brand emoji bullets and rainbow gradients
- Anything that frames impact as a *feature* rather than an *operating model*

---

## VISUAL FOUNDATIONS

The brand operates on a deliberately small set of moves. The discipline is
the point — like a farm crop rotation, every element is in the system for a
specific reason.

### Color
- **Three primary colors carry 95% of surfaces:** deep forest `#4B6040`, soft
  sage `#8CA47A`, and warm cream `#F2E9D6`. The cream-on-paper feel is
  non-negotiable — it's what separates the brand from "tech green" CPG.
- **Terracotta `#BB734A`** is the *only* warm accent. Use it for harvest /
  product / single CTA emphasis — never as a primary surface, never alongside
  another warm color. One terracotta moment per screen.
- **Deep aubergine `#2F2840`** is the text color on light, and the highest-
  contrast dark surface (footers, modals). It reads almost-black but warmer.
- **No pure white, no pure black.** Off-whites are paper (`#FBF7EE`) or
  cream (`#F2E9D6`); darks are forest or aubergine.

### Typography
- **Lato** is the single brand sans — it carries display, headings, eyebrows,
  buttons, body, and every UI label. A humanist sans, free on Google Fonts.
- **Light (300)** at display sizes (48px+) — the wordmark's airy voice.
- **Regular (400)** for body, lead paragraphs, and H1.
- **Bold (700)** for H2 / H3 / H4, eyebrows, buttons, and inline emphasis.
  Lato has no 500 / 600 cuts — the tokens `--fw-medium` and `--fw-semibold` are
  promoted to 700 so synthesized weights don't sneak in.
- **Source Serif 4** is a tertiary editorial face for pull quotes, producer
  stories, and long-form pieces. Use sparingly — usually italic — to mark
  *narrative* vs *interface*.
- **Tracking**: tight on display (-0.02em), neutral on body, *wide* on eyebrows
  (0.18em). The wide-tracked uppercase eyebrow is a signature device.
- **Balance & pretty**: `text-wrap: balance` on all headings, `text-wrap: pretty`
  on body paragraphs.

### Spacing & rhythm
- **8-pt base grid.** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 — defined
  as `--space-1` through `--space-32`.
- **Generous vertical rhythm.** Sections breathe at 96–128px on desktop;
  density is *not* the goal. The brand should feel like a well-laid-out
  printed annual report.

### Backgrounds & surfaces
- **Solid color first, image second.** Most surfaces are flat color. Photography
  appears as full-bleed editorial moments (a producer's hands, a palm canopy, a
  bowl of açaí) — never as small decorative imagery.
- **No gradients as backgrounds.** A single very soft cream → paper wash is
  allowed at the top of a hero, nothing more chromatic.
- **No emoji-card grids, no purple-pink CTAs.** Ever.
- **Photography color vibe**: warm-leaning, slightly desaturated, natural light,
  documentary. *Never* high-contrast lifestyle stock.

### Borders & lines
- **Hairlines only.** 1px lines in `--line-soft` (12% forest) for normal
  separators, `--line` (22%) for stronger ones. No 2px+ borders on UI.
- **No left-accent-bar cards.** It's an AI-design tell — avoid.

### Corner radii
- **Restrained.** UI buttons + inputs are `--r-md` (8px). Cards are `--r-lg`
  (14px). Pills (filters, tags) are `--r-pill`. Hero images and editorial blocks
  stay sharp (radius 0) for a printed feel.
- The wordmark itself has no rounded forms — radii in UI shouldn't fight it.

### Shadows & elevation
- **Soft, warm shadows tinted toward aubergine** — never neutral gray, never
  cool blue. Tokens: `--shadow-xs / sm / md / lg`. Most surfaces use `--shadow-sm`
  or none; only floating overlays (menus, modals) take `--shadow-lg`.
- **No inner glows, no neumorphism.**

### Motion
- **Easing is `cubic-bezier(0.22, 0.61, 0.36, 1)` (`--ease-out-soft`).**
  Things settle, they don't snap.
- **Durations**: 80ms for state flips, 160ms for hovers, 240ms for component
  changes, 400ms for page-level reveals.
- **No bouncy springs, no parallax cliché.** Cross-fades + tiny y-translations
  (4–8px) only. Reduced motion is honored.

### Hover & press states
- **Hover on dark buttons**: lift to `--vt-forest-700` (slightly lighter green),
  plus `--shadow-md`. No scale.
- **Hover on light buttons**: tint background to `--vt-sage-100`.
- **Hover on links**: color shifts from forest to clay (`--link-hover`).
- **Press**: tactile micro-darken (one step in the palette), no scale-down.
- **Focus rings**: 2px solid `--vt-clay` offset 2px. Visible, warm, accessible.

### Transparency & blur
- Used **only** for overlays on top of full-bleed photography (e.g. a hero
  caption sitting on a forest image needs a 30–40% aubergine wash for legibility).
- **No frosted-glass cards in flat UI.** No blurred surfaces over solid
  backgrounds — that's an iOS trope, not a vivaTTerra trope.

### Cards
- **Card = surface (`#FFFFFF` or `--vt-cream-200`) + `--r-lg` radius + `--shadow-sm`
  + 24–32px internal padding.** No border by default. A 1px `--line-soft` border
  is allowed when sitting on white.
- **Producer / product cards** have a 4:5 image at top, sharp corners on the
  image (clipped by the card radius), and a small `caption` line below the title
  with origin info ("Tacana 1, Bolivia").

### Iconography
- See **ICONOGRAPHY** below.

### Fixed elements & layout
- **Top nav** is sticky, 72px tall, cream background with a hairline bottom
  border that appears on scroll.
- **Footer** is full-bleed forest with cream text and a generous 96–128px top
  padding — treat it as a landing surface, not a residual.
- **Max content width**: 1240px. **Editorial column width**: 680px (~68ch).

---

## ICONOGRAPHY

vivaTTerra has **no custom icon library yet**, and the brief's restraint suggests
it should never accumulate one. The system uses **Lucide** (open-source, MIT,
linear stroke icons at 1.5–2px weight) as the working icon set. Lucide's clean
geometric outlines pair naturally with Lato and don't fight the wordmark's
calm energy.

### Rules
- **Stroke weight: 1.75px** (Lucide default at size 24).
- **Color**: inherit from text color (`currentColor`). Never branded-green
  unless the icon is making a deliberate accent point.
- **Size scale**: 16px (inline), 20px (UI default), 24px (nav / large CTA),
  40–56px (feature icons).
- **No filled icons.** Linear only. The brand reads thin and considered;
  filled icons read consumer-app.
- **No emoji as icons.** Anywhere.
- **No flag, certificate, or "leaf" cliché icons** for sustainability claims.
  Use *real* product / process imagery instead.

### Loading
The marketing UI kit loads Lucide from CDN:
```html
<script src="https://unpkg.com/lucide@latest"></script>
```
Then renders icons inline:
```html
<i data-lucide="leaf"></i>
<script>lucide.createIcons();</script>
```

If the brand later needs custom icons (e.g. an açaí palm, a grafting glyph,
a Carmen Pecha territory mark), commission them as SVGs at 24×24 with 1.75px
stroke and drop them into `assets/icons/`. **Do not let me invent them** —
hand-rolled SVG illustrations from an LLM are a tell.

### Unicode & glyphs
- The em-dash `—` is used liberally in copy.
- Bullet `·` (middle dot) for inline metadata separators: `Tacana 1 · Bolivia · 2024`.
- No decorative unicode glyphs (✦, ❋, etc.) — they break the brand's quietness.

### Logo
- **Primary**: `assets/vivaTTerra-logo.png` — full wordmark, forest on cream.
- Always preserve the lowercase `viva` + uppercase grafted `TT` + lowercase `erra`.
  Never re-typeset the wordmark in another font.
- Minimum width: 120px on screen.
- Clear-space: at least the height of the wordmark on all sides.

### The grafted TT, in body copy
The brand name is regularly typeset in running text — `vivaTTerra`, sometimes
`VivaTTerra` at sentence start. The wordmark itself is **always set in Poppins
Regular** (matching the logo file), with both T crossbars overlapping into one
continuous bar. Three ways to apply it:

1. **Wrap the whole word + the pair** (canonical):
   ```html
   <span class="wordmark">viva<span class="wm-tt">TT</span>erra</span>
   ```
   `.wordmark` switches to Poppins and applies the right tracking; `.wm-tt`
   squeezes the TT pair with a negative letter-spacing (`--wm-tt-graft: -0.30em`,
   tuned for Poppins Regular) so the crossbars overlap into one continuous bar.
   The TT pair stays at the parent's natural cap-height — the visual lift over
   the surrounding lowercase comes from Poppins's built-in cap-vs-x-height
   ratio, not from font-size scaling.
2. **Just the pair** in body copy (`vivaTTerra` inline in Lato): wrap only the
   TT with `<span class="wm-tt">TT</span>`. The graft still works; the
   surrounding letters stay in body type.
3. **Auto-wrap**: include `<script src="/path/to/wordmark.js"></script>` once
   in your page. It walks text nodes and wraps every `TT` it finds, so the
   treatment applies regardless of surrounding case — `vivaTTerra`,
   `VivaTTerra`, `VIVATTERRA` all graft correctly. Idempotent and
   MutationObserver-aware. Add `class="no-graft"` to opt out an element.

The wordmark itself (logo asset) is unaffected — it ships as a fixed PNG/SVG.

---

## How to use

1. Link `colors_and_type.css` at the top of any HTML you build.
2. Reach for semantic vars (`--bg`, `--fg-1`, `--accent`) before brand-name vars
   (`--vt-forest`). Brand-name vars are escape hatches.
3. When in doubt, do less. Pull out a color, not add one. Pull out a font weight,
   not add one. The brand reads correct when it's spare.
4. Browse `preview/` cards to see each token group rendered.
5. Open `ui_kits/marketing/index.html` for an end-to-end example.
