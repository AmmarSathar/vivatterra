# Fonts

## Lato — single brand sans (Google Fonts CDN) ✓
Lato is the **only** brand sans. It carries display, headings, eyebrows, body, and
all UI labels. Loaded from the Google Fonts CDN via `@import` at the top of
`../colors_and_type.css`. To self-host, drop the `.ttf` / `.woff2` files here
and replace the `@import` line with `@font-face` blocks.

**Shipped weights** (the rest will be browser-synthesized — avoid):
- 100 Hairline · 300 Light · 400 Regular · 700 Bold · 900 Black
- Italic at 400 and 700.

**In use:**
- **300 Light** — display sizes (48px+), the wordmark's voice.
- **400 Regular** — body, lead, H1, captions.
- **700 Bold** — H2 / H3 / H4, eyebrows, buttons, inline emphasis.
- 900 Black — reserved for the strongest accents.

## Source Serif 4 — editorial italic (CDN)
A tertiary editorial face for pull-quotes and producer stories. Use sparingly,
usually italic. Marks *narrative* vs *interface*.

## CSS reference
`colors_and_type.css` exposes:
```css
--font-sans:    'Lato', ui-sans-serif, system-ui, …;
--font-body:    var(--font-sans);
--font-display: var(--font-sans);
--font-serif:   'Source Serif 4', 'Source Serif Pro', Georgia, …;
--font-mono:    ui-monospace, 'SF Mono', Menlo, …;

--fw-light:    300;
--fw-regular:  400;
--fw-medium:   700;   /* promoted — Lato has no 500 */
--fw-semibold: 700;   /* promoted — Lato has no 600 */
--fw-bold:     700;
--fw-black:    900;
```
