'use client';

import { Children, useEffect, useRef } from 'react';

/**
 * Pinned card-stack (Framer-style). Each child section is a "card" that pins via
 * native CSS `position: sticky` at a stepped top offset, so earlier cards peek
 * above the active one and the whole stack stays in view. Each card is sized to
 * end at the viewport bottom, so no card is ever clipped. As the next card
 * scrolls up over it, a pinned card scales down to recede behind the active one;
 * the front card stays flat. Runs on a dark background.
 */
export default function CardStack({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  // Even vertical step between stacked cards (px from the top).
  const topOffset = (i: number) => 60 + 40 * i;
  // Gap left below the active card so its bottom clears the viewport edge.
  const BOTTOM_GAP = 20;

  useEffect(() => {
    const wrappers = Array.from(
      wrapperRef.current!.querySelectorAll<HTMLElement>('.stack-card-wrapper')
    );
    const cards = Array.from(
      wrapperRef.current!.querySelectorAll<HTMLElement>('.stack-card')
    );

    // Size each card to fit the viewport below its sticky offset.
    const applySizes = () => {
      wrappers.forEach((wrapper, i) => {
        wrapper.style.setProperty('--stack-top', `${topOffset(i)}px`);
        cards[i].style.setProperty(
          '--stack-card-h',
          `${window.innerHeight - topOffset(i) - BOTTOM_GAP}px`
        );
      });
    };
    applySizes();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('resize', applySizes);
      return () => window.removeEventListener('resize', applySizes);
    }

    let kill: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const root = wrapperRef.current!;

        const ctx = gsap.context(() => {
          const last = wrappers.length - 1;

          wrappers.forEach((wrapper, i) => {
            const card = cards[i];

            // The front card never recedes.
            if (i === last) return;

            // The back card (RealFood) enters full-bleed: 100% / 80% = 1.25.
            const fromScale = i === 0 ? 1.25 : 1;
            // Non-front cards recede in even 5% steps as they pin.
            const toScale = 0.8 + 0.05 * i;
            // Number of further cards that pin after the next one.
            const stepsAfter = last - i - 1;

            // Two-phase recede driven by one scrubbed timeline:
            //  1) settle from fromScale to toScale exactly when the NEXT card
            //     pins, so the stack stays evenly spaced;
            //  2) keep drifting back subtly (1.5% per remaining card) until the
            //     LAST card pins, so settled cards never look frozen.
            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: wrapper,
                start: 'top ' + topOffset(i),
                endTrigger: wrappers[last],
                end: 'top ' + topOffset(last),
                scrub: true,
                id: 'recede-' + (i + 1),
              },
            });
            tl.fromTo(
              card,
              { scale: fromScale },
              { scale: toScale, transformOrigin: 'top center', duration: 1 }
            );
            if (stepsAfter > 0) {
              tl.to(card, {
                scale: toScale - 0.015 * stepsAfter,
                duration: stepsAfter,
              });
            }
          });
        }, root);

        const onResize = () => {
          applySizes();
          ScrollTrigger.refresh();
        };
        window.addEventListener('resize', onResize);

        ScrollTrigger.refresh();
        kill = () => {
          ctx.revert();
          window.removeEventListener('resize', onResize);
        };
      }
    );

    return () => kill?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="card-stack">
      {items.map((child, i) => (
        <div className="stack-card-wrapper" key={i}>
          <div className="stack-card">{child}</div>
        </div>
      ))}
    </div>
  );
}
