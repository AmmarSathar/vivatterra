'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const ORIGIN = [
  { k: 'Territory',  v: 'Tacana I, Bolivia' },
  { k: 'Species',    v: 'Euterpe precatoria' },
  { k: 'Method',     v: 'Freeze-dried at origin' },
  { k: 'Harvest',    v: '2024 season' },
];

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const ctasRef    = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let revert: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.fromTo(
            [eyebrowRef.current, headingRef.current, bodyRef.current, ctasRef.current],
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12 }
          );
          gsap.fromTo(
            panelRef.current,
            { opacity: 0, x: 28 },
            { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out', delay: 0.18 }
          );
        });
        revert = () => ctx.revert();
      }
    );

    return () => revert?.();
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div ref={eyebrowRef} className="eyebrow">
              100% all natural açaí powder
            </div>
            <h1 ref={headingRef}>
              Gifts from <span className="accent">living ecosystems.</span>
            </h1>
            <p ref={bodyRef} className="hero-lead-serif">
              Agroforestry just makes sense — land made up of native trees with native food
              crops growing around them. It is just how nature was intended to be.
            </p>
            <div ref={ctasRef} className="ctas">
              <Link href="/about?tab=contact" className="btn btn-primary">
                Join the mission <span className="btn-arrow">→</span>
              </Link>
              <Link href="/about" className="btn btn-ghost">
                Our story <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>

          <div ref={panelRef} className="hero-panel">
            <div className="hero-panel-label">Origin provenance</div>
            <div className="hero-panel-stats">
              {ORIGIN.map(({ k, v }) => (
                <div key={k}>
                  <div className="hero-stat-k">{k}</div>
                  <div className="hero-stat-v">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
