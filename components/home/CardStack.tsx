'use client';

import { Children, useEffect, useRef } from 'react';

/**
 * Pinned card-stack: each child section is treated as a "card". As you scroll,
 * each card pins in place while the next scrolls up over it; pinned cards scale
 * down and tilt back (rotationX) so they recede behind the active one. The last
 * card stays flat. Runs on a dark background.
 */
export default function CardStack({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let kill: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const root = wrapperRef.current!;

        const ctx = gsap.context(() => {
          const wrappers = gsap.utils.toArray<HTMLElement>('.stack-card-wrapper');
          const cards = gsap.utils.toArray<HTMLElement>('.stack-card');

          const last = wrappers.length - 1;
          // Even vertical step between stacked cards (px from the top).
          const topOffset = (i: number) => 60 + 40 * i;

          wrappers.forEach((wrapper, i) => {
            const card = cards[i];

            // Pin every card at its stepped offset so they stack evenly.
            ScrollTrigger.create({
              trigger: wrapper,
              start: 'top ' + topOffset(i),
              endTrigger: root,
              end: 'bottom 550',
              pin: wrapper,
              pinSpacing: false,
              id: 'pin-' + (i + 1),
            });

            // The front card never recedes.
            if (i === last) return;

            // The back card (RealFood) enters full-bleed: 100% / 80% = 1.25.
            const fromScale = i === 0 ? 1.25 : 1;
            // Non-front cards recede in even 5% steps as they pin.
            const toScale = 0.8 + 0.05 * i;

            // Finish receding exactly when the NEXT card reaches its pin point,
            // so the whole stack is settled and evenly spaced at the front.
            gsap.fromTo(
              card,
              { scale: fromScale },
              {
                scale: toScale,
                transformOrigin: 'top center',
                ease: 'none',
                scrollTrigger: {
                  trigger: wrapper,
                  start: 'top ' + topOffset(i),
                  endTrigger: wrappers[i + 1],
                  end: 'top ' + topOffset(i + 1),
                  scrub: true,
                  id: 'scale-' + (i + 1),
                },
              }
            );
          });
        }, root);

        ScrollTrigger.refresh();
        kill = () => ctx.revert();
      }
    );

    return () => kill?.();
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
