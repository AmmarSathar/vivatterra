'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    let destroy: (() => void) | undefined;

    void Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.08 });

      // Expose globally so PageTransition can call scrollTo(0) on route change
      window.__lenis = lenis;

      // Keep ScrollTrigger in sync with Lenis scroll position
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis through GSAP's ticker for frame-perfect sync
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      destroy = () => {
        lenis.destroy();
        gsap.ticker.remove(tick);
        delete window.__lenis;
      };
    });

    return () => destroy?.();
  }, []);

  return null;
}
