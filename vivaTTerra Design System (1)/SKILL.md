---
name: vivatterra-design
description: Use this skill to generate well-branded interfaces and assets for vivaTTerra — a social-purpose agroforestry supply-chain enterprise. Contains essential design guidelines, colors (forest / sage / cream / clay / ink), a single-typeface system built on Lato, the vivaTTerra wordmark, a marketing UI kit, and a content/voice guide. Use it for production work or throwaway prototypes, mocks, slides, and brand-aligned artifacts.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy
assets out and create static HTML files for the user to view. Always link
`colors_and_type.css` from your HTML and lean on its semantic tokens (`--bg`,
`--fg-1`, `--accent`) before brand-name tokens (`--vt-forest`).

If working on production code, you can copy assets and read the rules in
README.md, especially the **VISUAL FOUNDATIONS**, **CONTENT FUNDAMENTALS**, and
**ICONOGRAPHY** sections, to become an expert in designing for this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design — a deck, a marketing page, a pitch artifact, a producer
story page, a product spec — ask a few focused questions, and act as an expert
designer who outputs HTML artifacts *or* production code, depending on the need.

## What's in this skill

- `README.md` — full brand context, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — all CSS variables (colors, type, spacing, radii, shadows, motion).
- `assets/vivaTTerra-logo.png` — primary wordmark, forest on cream.
- `preview/` — visual specimen cards (one HTML per token group).
- `ui_kits/marketing/` — full interactive marketing homepage with reusable JSX components.
- `fonts/README.md` — font hosting notes (Lato via Google Fonts CDN).

## Quick principles
- Sentence case. No emoji. No exclamation marks. Em-dashes welcome.
- Three primary colors do 95% of the work: deep forest, soft sage, warm cream.
- Clay is the *only* warm accent — one moment per screen.
- Type system is **single-face Lato**. Light (300) at display sizes — the brand voice is calm, considered, white-paper-confident. Regular (400) for body / H1. Bold (700) for H2–H4, eyebrows, buttons, and inline emphasis. Lato has no 500/600 cuts; tokens promote to 700.
- Lucide icons, 24/1.75, linear-only, currentColor.
- The wordmark is `vivaTTerra` — lowercase except the grafted TT. Always.
