'use client';

import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

export default function OurFirstProduct() {
  const ref = useReveal<HTMLElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  // Staggered line reveal for the two heading lines as the card scrolls in.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let kill: (() => void) | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const header = headerRef.current;
      const section = ref.current;
      if (!header || !section) return;

      void document.fonts.ready.then(() => {
        const ctx = gsap.context(() => {
          const targets = header.querySelectorAll<HTMLElement>('.eyebrow, h2');
          SplitText.create(targets, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'line',
            autoSplit: true,
            onSplit: (instance) =>
              gsap.from(instance.lines, {
                yPercent: 120,
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'clamp(top 75%)',
                  toggleActions: 'play none none reverse',
                },
              }),
          });
        }, header);

        ScrollTrigger.refresh();
        kill = () => ctx.revert();
      });
    });

    return () => kill?.();
  }, [ref]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (e.pointerType !== 'mouse') return; // no tilt on touch — keep swipe clean
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
  };

  const resetTilt = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section
      ref={ref}
      className={`section section-deep ofp-section${mode === 'light' ? ' ofp-mode-light' : ''}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={mode === 'light'}
        aria-label="Switch product view between dark and light"
        className="ofp-mode-toggle"
        onClick={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))}
      >
        <span className="ofp-toggle-knob">
          {mode === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
            </svg>
          )}
        </span>
      </button>

      <div className="container-narrow">
        <div className="section-header on-deep" ref={headerRef}>
          <div className="eyebrow eyebrow-on-deep">Our first product</div>
          <h2>Wild-Harvested Açaí Powder</h2>
          <p className="ofp-swipe-hint" aria-hidden="true">
            Swipe for details <span>&rarr;</span>
          </p>
        </div>

        <div
          className="ofp-details"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="ofp-card" ref={cardRef}>
            <h3 className="ofp-details-title">Product Details</h3>
            <dl className="ofp-detail-list">
            <div className="ofp-detail-row">
              <dt>Species</dt>
              <dd>
                Açaí <em>(Euterpe precatoria)</em>
              </dd>
            </div>
            <div className="ofp-detail-row">
              <dt>Harvested By</dt>
              <dd>Carmen Pecha, Tacana I Indigenous Territory, Bolivia</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>Origin</dt>
              <dd>Wild-harvested in the Bolivian Amazon Rainforest</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>Processing</dt>
              <dd>Freeze-dried and finely milled near the harvest site in Ixiamas, Bolivia</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>Project Partner</dt>
              <dd>Samay O2 Amazon Recovery</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>Available Format</dt>
              <dd>250 g bag</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>Certification</dt>
              <dd>Certified Organic</dd>
            </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
