'use client';

import { useEffect, useRef, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useI18n } from '@/lib/i18n';

export default function OurFirstProduct() {
  const { lang, t, rich } = useI18n();
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
  }, [ref, lang]);

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
        aria-label={t('home.product.toggleAria')}
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
        {/* Keyed so a language change swaps in fresh, unsplit heading nodes. */}
        <div className="section-header on-deep" ref={headerRef} key={lang}>
          <div className="eyebrow eyebrow-on-deep">{t('home.product.eyebrow')}</div>
          <h2>{t('home.product.title')}</h2>
          <p className="ofp-swipe-hint" aria-hidden="true">
            {t('home.product.swipe')} <span>&rarr;</span>
          </p>
        </div>

        <div
          className="ofp-details"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="ofp-card" ref={cardRef}>
            <h3 className="ofp-details-title">{t('home.product.detailsTitle')}</h3>
            <dl className="ofp-detail-list">
            <div className="ofp-detail-row">
              <dt>{t('home.product.species')}</dt>
              <dd>{rich('home.product.speciesValue')}</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>{t('home.product.harvestedBy')}</dt>
              <dd>{t('home.product.harvestedByValue')}</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>{t('home.product.partner')}</dt>
              <dd>{t('home.product.partnerValue')}</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>{t('home.product.origin')}</dt>
              <dd>{t('home.product.originValue')}</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>{t('home.product.processing')}</dt>
              <dd>{t('home.product.processingValue')}</dd>
            </div>
            <div className="ofp-detail-row">
              <dt>{t('home.product.format')}</dt>
              <dd>{t('home.product.formatValue')}</dd>
            </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
