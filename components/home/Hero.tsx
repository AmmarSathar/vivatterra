'use client';

import { useEffect, useRef } from 'react';
import { TreePine } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t } = useI18n();
  const wordRef  = useRef<HTMLImageElement>(null);
  const tagRef   = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let kill: (() => void) | undefined;
    void import('gsap').then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(wordRef.current,  { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.4 });
        gsap.fromTo(tagRef.current,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 1.05 });
        gsap.fromTo(arrowRef.current, { opacity: 0 }, {
          opacity: 1,
          duration: 0.6,
          ease: 'power1.out',
          delay: 1.9,
          onComplete: () => {
            gsap.to(arrowRef.current, { y: -10, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true });
          },
        });
      });
      kill = () => ctx.revert();
    });
    return () => kill?.();
  }, []);

  return (
    <section className="hero-fs">

      {/* Background */}
      <div className="hero-fs-media" aria-hidden="true">
        <div className="hero-fs-gradient" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Photo/background-images/forest-backdrop.webp"
          alt=""
          className="hero-fs-video"
          draggable={false}
        />
        <div className="hero-fs-overlay" />
      </div>

      {/* Centered wordmark */}
      <div className="hero-fs-content">
        {/* The page's single H1: wordmark (alt text) plus tagline. display:contents keeps the layout identical. */}
        <h1 className="hero-fs-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={wordRef}
          src="/vivaTTerra-logo-hero.svg"
          alt="vivaTTerra"
          className="hero-fs-logo"
          style={{ opacity: 0 }}
          draggable={false}
        />
        <span ref={tagRef} className="hero-fs-tagline" style={{ opacity: 0 }}>
          {t('hero.tagline')}
        </span>
        </h1>
      </div>

      {/* Scroll cue */}
      <div ref={arrowRef} className="hero-fs-scroll-cue" style={{ opacity: 0 }} aria-hidden="true">
        <TreePine size={28} strokeWidth={1.25} style={{ transform: 'rotate(180deg)' }} />
      </div>

    </section>
  );
}
