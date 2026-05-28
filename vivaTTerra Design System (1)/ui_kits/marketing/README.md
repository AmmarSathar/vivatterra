# Marketing UI Kit — vivaTTerra

A from-the-brand recreation of what the vivaTTerra marketing site
could look like, using only the foundations defined in `colors_and_type.css`.

No real site or codebase was provided — treat this as a *visual proposal*, not
a port of existing screens. The components are intentionally cosmetic-only
(no real form submission, no router) so they're easy to lift into a real build.

## Files
- `index.html` — full interactive homepage. Open this.
- `components/` — small JSX components, one per UI piece.
- All components mount into the page via Babel-in-browser.

## Sections shown
1. Sticky top nav with wordmark + primary CTA
2. Editorial hero with one large display headline + supporting paragraph + 2 CTAs
3. The three integrated functions (Section 3 of the business brief) as cards
4. Producer story — full-bleed forest surface with editorial serif pull-quote
5. Featured product — açaí powder, with provenance metadata
6. Theory-of-change diagram (text-driven causal chain)
7. Newsletter capture
8. Full-bleed forest footer

## What is NOT here (intentionally)
- A real router / multi-page navigation
- Real form submission
- A blog post template (would be the next surface to build)
- E-commerce checkout (would be the next surface)
- An admin / dashboard (out of scope for marketing)

Ask if you want any of these spun up.
