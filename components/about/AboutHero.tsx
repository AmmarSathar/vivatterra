'use client';

import { useEffect, useRef } from 'react';

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = containerRef.current;
    if (!el) return;

    let kill: (() => void) | undefined;
    void import('gsap').then(({ gsap }) => {
      const ctx = gsap.context(() => {
        const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-hero]'));
        gsap.fromTo(
          targets,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.12 }
        );
      });
      kill = () => ctx.revert();
    });

    return () => kill?.();
  }, []);

  return (
    <div className="about-hero section-deep">
      <div className="container-narrow" ref={containerRef}>
        <div className="eyebrow eyebrow-on-deep" data-hero style={{ opacity: 0 }}>
          Mission
        </div>
        <h1 className="about-hero-h1" data-hero style={{ opacity: 0 }}>
          Treating impact as economic infrastructure, not a marketing overlay.
        </h1>
        <p className="about-hero-body" data-hero style={{ opacity: 0 }}>
          vivaTTerra is a social purpose enterprise building markets for locally processed
          agroforestry products from living ecosystems — and what that means for the land,
          the communities, and your business.
        </p>
      </div>
    </div>
  );
}
