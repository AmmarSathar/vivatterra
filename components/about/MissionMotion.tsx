'use client';

import { useEffect } from 'react';

/**
 * Scroll-triggered reveals for the Our Mission page. Each section's big title
 * animates in line-by-line (masked SplitText) and its body content fades/slides
 * up in a stagger.
 *
 * Robustness rules (a stuck-invisible hero bug lived here before):
 *  - Content is visible by default in CSS; JS only adds the entrance. If the JS
 *    never runs (reduced motion, load failure) the page still reads fine.
 *  - Blocks already in the first viewport on load play immediately as a timed
 *    entrance — never gated behind a ScrollTrigger whose start is already
 *    crossed (it may never fire) nor behind document.fonts.ready (autoSplit
 *    re-splits when fonts land, so we don't need to wait).
 *  - A safety pass force-completes every reveal shortly after setup, so a tween
 *    interrupted by a remount or a ScrollTrigger refresh can't leave text hidden.
 */
export default function MissionMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // StrictMode (dev) mounts twice. Without this guard the first mount's async
    // import resolves *after* its own cleanup, so two competing sets of `from`
    // tweens get built on the same elements and one can leave them hidden.
    let cancelled = false;
    let kill: (() => void) | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      // Blocks on the first screen — the safety pass force-reveals these.
      const inViewRoots: Element[] = [];

      const ctx = gsap.context(() => {
        const animateBlock = (
          root: Element,
          titleSelector: string,
          bodyEls: HTMLElement[]
        ) => {
          // In the first screen on load? Then play now; otherwise tie to scroll.
          const inView =
            root.getBoundingClientRect().top < window.innerHeight * 0.92;
          if (inView) inViewRoots.push(root);
          const scrollTrigger = inView
            ? undefined
            : {
                trigger: root,
                start: 'top 75%',
                once: true,
              };

          const title = root.querySelector<HTMLElement>(titleSelector);
          if (title) {
            SplitText.create(title, {
              type: 'lines',
              mask: 'lines',
              linesClass: 'mission-split-line',
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 115,
                  duration: 1,
                  stagger: 0.12,
                  ease: 'power4.out',
                  delay: inView ? 0.15 : 0,
                  scrollTrigger,
                }),
            });
          }

          if (bodyEls.length) {
            gsap.from(bodyEls, {
              y: 24,
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              delay: inView ? 0.3 : 0,
              scrollTrigger,
            });
          }
        };

        gsap.utils.toArray<HTMLElement>('.mission-row').forEach((row) => {
          animateBlock(
            row,
            '.mission-row-title',
            gsap.utils.toArray<HTMLElement>(
              row.querySelectorAll('.mission-row-body > *')
            )
          );
        });

        const close = document.querySelector('.mission-close');
        if (close) {
          animateBlock(
            close,
            '.mission-statement',
            gsap.utils.toArray<HTMLElement>(
              close.querySelectorAll('.mission-hero-lead, .btn')
            )
          );
        }
      });

      ScrollTrigger.refresh();

      // Safety net: first-screen content must end fully visible even if its
      // entrance was interrupted (StrictMode remount, ScrollTrigger refresh, a
      // dropped frame under load). Uses a wall-clock timer — not GSAP's ticker,
      // which can itself be throttled — and clears the masked-line transforms
      // and body fades back to their natural visible state.
      const safetyTimer = window.setTimeout(() => {
        inViewRoots.forEach((root) => {
          const els = root.querySelectorAll<HTMLElement>(
            '.mission-row-title, .mission-split-line, .mission-row-body > *, .mission-statement, .mission-hero-lead, .btn'
          );
          gsap.killTweensOf(els);
          gsap.set(els, { clearProps: 'transform,opacity,visibility' });
        });
      }, 1900);

      kill = () => {
        window.clearTimeout(safetyTimer);
        ctx.revert();
      };
    });

    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  return null;
}
