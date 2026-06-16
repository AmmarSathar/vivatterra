'use client';

import { useEffect } from 'react';

/**
 * Scroll-triggered reveals for the Our Mission page. For every section the big
 * title animates in line-by-line (masked SplitText) and the body content
 * fades/slides up in a stagger — giving the full-viewport panels a fluid feel on
 * scroll, including on mobile. No-ops under prefers-reduced-motion.
 */
export default function MissionMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let kill: (() => void) | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);

      void document.fonts.ready.then(() => {
        const ctx = gsap.context(() => {
          const animateBlock = (
            root: Element,
            titleSelector: string,
            bodyEls: HTMLElement[]
          ) => {
            const title = root.querySelector<HTMLElement>(titleSelector);

            if (title) {
              SplitText.create(title, {
                type: 'lines',
                mask: 'lines',
                linesClass: 'mission-split-line',
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.lines, {
                    yPercent: 120,
                    duration: 0.9,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                      trigger: root,
                      start: 'top 78%',
                      toggleActions: 'play none none reverse',
                    },
                  }),
              });
            }

            if (bodyEls.length) {
              gsap.from(bodyEls, {
                y: 28,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.09,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: root,
                  start: 'top 72%',
                  toggleActions: 'play none none reverse',
                },
              });
            }
          };

          gsap.utils.toArray<HTMLElement>('.mission-row').forEach((row) => {
            animateBlock(
              row,
              '.mission-row-title',
              gsap.utils.toArray<HTMLElement>(row.querySelectorAll('.mission-row-body > *'))
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
        kill = () => ctx.revert();
      });
    });

    return () => kill?.();
  }, []);

  return null;
}
