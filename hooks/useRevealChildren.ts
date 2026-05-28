'use client';

import { useEffect, useRef } from 'react';

export function useRevealChildren<T extends HTMLElement = HTMLElement>(stagger = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let revert: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.fromTo(
            Array.from(el.children),
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              stagger,
              scrollTrigger: { trigger: el, start: 'top 85%' },
            }
          );
        });
        revert = () => ctx.revert();
      }
    );

    return () => revert?.();
  }, [stagger]);

  return ref;
}
