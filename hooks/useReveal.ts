'use client';

import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement = HTMLElement>(delay = 0) {
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
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            }
          );
        });
        revert = () => ctx.revert();
      }
    );

    return () => revert?.();
  }, [delay]);

  return ref;
}
