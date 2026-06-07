'use client';

import { useEffect, useRef } from 'react';

// Three path states — identical command structure (M V Q V z) so GSAP attr
// tween can interpolate numeric values without MorphSVGPlugin.
const HIDDEN = 'M 0 100 V 100 Q 50 100 100 100 V 100 z'; // flat line at bottom — invisible
const WAVE   = 'M 0 100 V 50 Q 50 0 100 50 V 100 z';    // convex arc covers ~half screen
const COVER  = 'M 0 100 V 0 Q 50 0 100 0 V 100 z';      // full screen coverage

// Module-level flag: reveal only runs if cover animation preceded it.
// Prevents the reveal from playing on initial hard page load.
let hasCovered = false;

export default function TransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<SVGPathElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const path    = pathRef.current;
    if (!overlay || !path) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let gsapRef: typeof import('gsap')['gsap'] | null = null;

    void import('gsap').then(({ gsap }) => {
      gsapRef = gsap;
      gsap.set(path, { attr: { d: HIDDEN } });
    });

    function cover() {
      if (!gsapRef || !overlay || !path) return;
      hasCovered = true;
      overlay.style.visibility    = 'visible';
      overlay.style.pointerEvents = 'all';

      const tl = gsapRef.timeline();
      tl.to(path, { attr: { d: WAVE },  duration: 0.4, ease: 'power2.in'  })
        .to(path, { attr: { d: COVER }, duration: 0.4, ease: 'power2.out' });
    }

    function reveal() {
      if (!gsapRef || !overlay || !path) return;
      if (!hasCovered) return; // first hard load — skip curtain
      hasCovered = false;

      gsapRef.set(path, { attr: { d: COVER } });
      overlay.style.visibility    = 'visible';
      overlay.style.pointerEvents = 'all';

      gsapRef.timeline({
        onComplete() {
          if (overlay) {
            overlay.style.visibility    = 'hidden';
            overlay.style.pointerEvents = 'none';
          }
        },
      })
        .to(path, { attr: { d: WAVE },   duration: 0.4, ease: 'power2.in'  })
        .to(path, { attr: { d: HIDDEN }, duration: 0.4, ease: 'power2.out' });
    }

    window.addEventListener('vt:cover',  cover  as EventListener);
    window.addEventListener('vt:reveal', reveal as EventListener);
    return () => {
      window.removeEventListener('vt:cover',  cover  as EventListener);
      window.removeEventListener('vt:reveal', reveal as EventListener);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="vt-transition-overlay"
      aria-hidden="true"
      style={{ visibility: 'hidden', pointerEvents: 'none' }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        className="vt-transition-svg"
      >
        <defs>
          <linearGradient id="vt-curtain-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0.15" stopColor="#2F2840" />
            <stop offset="0.85" stopColor="#4B6040" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="url(#vt-curtain-grad)"
          d={HIDDEN}
        />
      </svg>
    </div>
  );
}
