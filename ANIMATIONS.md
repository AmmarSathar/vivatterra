# vivaTTerra — Animation Inventory

## Splash Screen

| Element | Animation | Tech |
|---|---|---|
| Dark overlay | Fade in (opacity 0→1, 0.45s) | GSAP |
| Lid disc | Scale + fade in (0.75→1, expo.out, 1.8s), then float away + fade out | GSAP |
| Wordmark inside disc | Horizontal gradient shimmer (forest→sage→clay→sage→forest, loops forever) | GSAP (`backgroundPosition`) |

---

## Header

| Element | Animation | Tech |
|---|---|---|
| Sticky border | Fades in on scroll > 8px | CSS transition |
| "viva" span | Slides left + collapses (maxWidth→0) at scroll ≥ 80px ("Pi mode") | GSAP |
| "erra" span | Slides right + collapses at scroll ≥ 80px | GSAP |
| Nav underline | Grows right-to-left on hover/active | CSS `::after` transition |
| Mobile drawer | Slides down + fades in on open; slides up + fades out on close | GSAP |

---

## Home — ScrollOrb (fixed bottom-right)

| Element | Animation | Tech |
|---|---|---|
| Orb opacity | 7% → 62% as page scrolls top to bottom (scrub) | GSAP ScrollTrigger |
| Dotted circle | Rotates 0° → 360° tied to scroll progress (scrub) | GSAP ScrollTrigger |

---

## Home — Hero

| Element | Animation | Tech |
|---|---|---|
| Eyebrow label | Fades + slides up (y 14→0, 0.55s) on load | GSAP timeline |
| H1 headline | Character-by-character typewriter with natural timing variance | `setTimeout` loop |
| Cursor `\|` | CSS blink (step-end, 0.65s), then fades out after typing completes | CSS keyframes |
| Subtitle | Fades + slides up, starts ~2.4s (after typewriter) | GSAP timeline |
| Body copy | Fades + slides up, overlapping subtitle | GSAP timeline |
| CTA buttons | Fades + slides up | GSAP timeline |
| Scroll arrow | Fades in, then bounces up/down forever (sine.inOut, repeats) | GSAP |
| "Join Mission" button | Lifts up + deeper shadow on hover | Inline `onMouseEnter` CSS |
| "Explore" button | Background tint on hover | Inline `onMouseEnter` CSS |

---

## Home — Real Food

| Element | Animation | Tech |
|---|---|---|
| Text block | Slides in from left (x −36→0, 0.9s) on scroll | GSAP ScrollTrigger |
| Image block | Slides in from right (x +36→0, 0.9s) on scroll | GSAP ScrollTrigger |
| Quote callout | Fades + slides up (y 24→0, 0.72s) on scroll | GSAP ScrollTrigger |
| Quote callout | Lifts up + shadow on hover | Inline `onMouseEnter` CSS |

---

## Home — Our First Product

| Element | Animation | Tech |
|---|---|---|
| Text block | Slides in from left (x −40→0, 1.0s) on scroll | GSAP ScrollTrigger |
| Image block | Slides in from right (x +40→0, 1.0s, 0.1s delay) on scroll | GSAP ScrollTrigger |

---

## Home — Product Specs

| Element | Animation | Tech |
|---|---|---|
| Section header | Fades + slides up (y 28→0, 0.8s) on scroll | GSAP ScrollTrigger |
| Table rows | Stagger fade + slide up (y 16→0, 0.07s stagger) on scroll | GSAP ScrollTrigger |
| Table rows | Background tint on hover | Inline `onMouseEnter` CSS |
| Side cards container | Slides in from right (x +36→0, 0.85s) on scroll | GSAP ScrollTrigger |
| Each card | Lifts up + shadow on hover | Inline `onMouseEnter` CSS |

---

## Home — Social Proof

| Element | Animation | Tech |
|---|---|---|
| Section header | Fades + slides up (y 24→0, 0.8s) on scroll | GSAP ScrollTrigger |
| Testimonial cards | Stagger fade + slide up (y 32→0, 0.13s stagger) on scroll | GSAP ScrollTrigger |
| Each card | Lifts up + deeper shadow on hover | Inline `onMouseEnter` CSS |

---

## Home — Lead Form / Contact

| Element | Animation | Tech |
|---|---|---|
| Section header | Fades + slides up (y 28→0, 0.85s) on scroll | GSAP ScrollTrigger |
| Form panel | Fades + slides up (y 36→0, 0.85s, 0.14s delay) on scroll | GSAP ScrollTrigger |

---

## Footer

| Element | Animation | Tech |
|---|---|---|
| Stat counters (8, 12, 4) | Count up from 0 on scroll into view (1.4s, power2.out) | GSAP ScrollTrigger |
| Nav links | Color fade on hover | Inline `onMouseEnter` CSS |
| Email link | Color fade to clay on hover | Inline `onMouseEnter` CSS |

---

## Page Transitions (all routes)

| Element | Animation | Tech |
|---|---|---|
| Page enter | Fades + slides up (y 24→0, 0.42s) | GSAP |
| Page exit | Fades + slides up-out (y −18, 0.38s), scroll resets to top | GSAP |

---

## About — Hero

| Element | Animation | Tech |
|---|---|---|
| Eyebrow, H1, body (`[data-hero]`) | Stagger fade + slide up (y 28→0, 0.12s stagger) on page load | GSAP |

---

## About — Tab Switching

| Element | Animation | Tech |
|---|---|---|
| Tab panel | Fades + slides up-out (y −8), then fades + slides in (y 16→0) on tab change | GSAP |
| Tab underline indicator | Color + border-color fade on active/hover | CSS transition |

---

## About — Our Story

| Element | Animation | Tech |
|---|---|---|
| `[data-reveal]` elements | Stagger fade + slide up (y 32→0, 0.08s stagger) on scroll | `useGsapReveal` hook |
| "Let the Land Live" heading | Clip-path wipe reveal (inset bottom 100%→0%) on scroll | GSAP ScrollTrigger |
| TT quote lines | Stagger slide up from hidden overflow (y 110%→0%, 0.1s stagger) on scroll | GSAP ScrollTrigger |
| Sticky image | Scale + fade in (0.96→1) on scroll | GSAP ScrollTrigger |
| Sticky image | Parallax upward drift (y 0→−40) tied to scroll | GSAP scrub |
| "How We Work" cards | Stagger fade + slide up (y 28→0, 0.15s stagger) on scroll | GSAP ScrollTrigger |
| CTA button | Color fade on hover | Inline `onMouseEnter` CSS |

---

## About — Why It Matters

| Element | Animation | Tech |
|---|---|---|
| `[data-reveal]` elements | Stagger fade + slide up on scroll | `useGsapReveal` hook |
| Left column | Slides in from left (x −40→0, 1.0s) on scroll | GSAP ScrollTrigger |
| Right column | Slides in from right (x +40→0, 1.0s, 0.15s delay) on scroll | GSAP ScrollTrigger |
| Impact list items | Stagger fade + slide up (y 24→0, 0.12s stagger) on scroll | GSAP ScrollTrigger |
| Açaí mini-cards | Stagger fade + slide up (y 20→0, 0.1s stagger) on scroll | GSAP ScrollTrigger |
| Pull quote | Fades + slides up (y 32→0, 0.9s) on scroll | GSAP ScrollTrigger |
| Açaí mini-cards | Lifts up + shadow on hover | Inline `onMouseEnter` CSS |
| "Get in Touch" button | Background changes from clay → forest on hover | Inline `onMouseEnter` CSS |

---

## About — Get in Touch

| Element | Animation | Tech |
|---|---|---|
| Form panel | Fades + slides up (y 36→0, 0.9s) on scroll | GSAP ScrollTrigger |

---

## Global / Shared Components

| Component | Animation | Tech |
|---|---|---|
| `DarkVeil` | Continuous WebGL CPPN shader (time-driven, hue shift, warp, scanlines, noise) | OGL / WebGL RAF loop |
| `ClickSpark` | Radial line sparks burst outward on click, fade over 400ms | Canvas RAF loop |
| `GradientText` | Animated background-position sweep on a gradient (loops, yoyo) | GSAP |
| `useGsapReveal` hook | Reusable `[data-reveal]` fade+slide-up on scroll | GSAP ScrollTrigger |

---

## Shelf — Saved for Later

### GSAP SplitText Opacity Spotlight (horizontal scroll)

Text scrolls right-to-left across the screen while an opacity spotlight travels with it — words near the horizontal center of the viewport are fully bright, words far from center are dim (opacity 0.12). Gives the illusion that a light source is fixed in space while the text moves through it.

**How it works:**
- Outer `<section>` is `height: 300vh` (tall scroll track)
- Inner sticky `<div>` is `position: sticky; top: 0; height: 100vh` — pins the text while the page scrolls
- GSAP `fromTo` translates the `<p>` from `x: vw` → `x: -textWidth` with `scrub: true` (no GSAP pin, avoids Lenis conflicts)
- `SplitText` splits into words; `onUpdate` on the **tween** (not ScrollTrigger) runs after the transform is applied so `getBoundingClientRect()` returns live positions
- Each word opacity = `0.12 + 0.88 * t²` where `t = max(0, 1 − dist / (vw * 0.38))` and `dist` is the word centre's distance from `vw / 2`

**Key CSS classes:**
```css
.hscroll-section  { height: 300vh; }
.hscroll-sticky   { position: sticky; top: 0; height: 100vh; overflow: hidden;
                    display: flex; align-items: center; }
.hscroll-text     { font-weight: 600; font-size: clamp(64px, 9.5vw, 152px);
                    line-height: 1; white-space: nowrap; will-change: transform; }
.hscroll-word     { display: inline-block; margin-right: 0.22em; }
```

**Core GSAP logic:**
```js
const split = new SplitText(textEl, { type: 'words', wordsClass: 'hscroll-word' });
gsap.set(split.words, { opacity: 0.12 });
gsap.set(textEl, { x: vw });

gsap.fromTo(textEl, { x: vw }, {
  x: -textEl.scrollWidth,
  ease: 'none',
  onUpdate() {
    const spotX = vw / 2;
    split.words.forEach(w => {
      const r = w.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - spotX);
      const t = Math.max(0, 1 - dist / (vw * 0.38));
      gsap.set(w, { opacity: 0.12 + 0.88 * t * t });
    });
  },
  scrollTrigger: { trigger: sectionEl, start: 'top top', end: 'bottom bottom', scrub: true },
});
```

**Notes:**
- Works with Lenis because it uses CSS sticky, not GSAP pin
- Poppins is not a variable font — use `opacity` spotlight, not `font-variation-settings`
- `onUpdate` must be on the tween, not on ScrollTrigger, so it fires post-transform
