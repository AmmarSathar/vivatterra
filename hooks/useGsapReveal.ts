'use client';

import { useEffect, useRef } from 'react';

export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  stagger = 0.1,
  yOffset = 32
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let revert: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const targets = Array.from(
          el.querySelectorAll<HTMLElement>('[data-reveal]')
        );
        if (targets.length === 0) return;

        const ctx = gsap.context(() => {
          gsap.fromTo(
            targets,
            { opacity: 0, y: yOffset },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              stagger,
              scrollTrigger: { trigger: el, start: 'top 82%' },
            }
          );
        });
        revert = () => ctx.revert();
      }
    );

    return () => revert?.();
  }, [stagger, yOffset]);

  return ref;
}
