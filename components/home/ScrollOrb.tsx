'use client';

import { useEffect, useRef } from 'react';

export default function ScrollOrb() {
  const orbRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let revert: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const common = {
            ease: 'none' as const,
            scrollTrigger: {
              start: 0,
              end: 'max',
              scrub: true,
            },
          };
          gsap.fromTo(orbRef.current, { opacity: 0.07 }, { opacity: 0.62, ...common });
          gsap.fromTo(ringRef.current, { rotation: 0 }, { rotation: 360, ...common });
        });
        revert = () => ctx.revert();
      }
    );

    return () => revert?.();
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '64px',
        height: '64px',
        opacity: 0.07,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <svg
        ref={ringRef}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="var(--vt-forest)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
