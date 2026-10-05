'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n';

function RealFoodInner() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let kill: (() => void) | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const section = sectionRef.current!;
      const head = headRef.current!;
      const text = textRef.current!;
      const text2 = text2Ref.current!;

      void document.fonts.ready.then(() => {
        const ctx = gsap.context(() => {
          gsap.set([head, text, text2], { opacity: 1 });

          // Responsive line splits: SplitText re-splits on resize (autoSplit)
          // and the reveal is scrubbed as the card travels up into view.
          SplitText.create([head, text, text2], {
            type: 'words,lines',
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
                  start: 'clamp(top 65%)',
                  toggleActions: 'play none none reverse',
                },
              }),
          });
        }, section);

        ScrollTrigger.refresh();
        kill = () => ctx.revert();
      });
    });

    return () => kill?.();
  }, []);

  return (
    <section className="realfood-static" ref={sectionRef}>
      <div className="container-narrow">
        <h2 className="realfood-static-heading" ref={headRef} style={{ opacity: 0 }}>
          {t('home.realfood.title')}
        </h2>
        <p className="realfood-static-text" ref={textRef} style={{ opacity: 0 }}>
          {t('home.realfood.text')}
        </p>
        <p className="realfood-static-text" ref={text2Ref} style={{ opacity: 0 }}>
          {t('home.realfood.text2')}
        </p>
      </div>
    </section>
  );
}

/** Remounts on language change so SplitText re-splits the new copy cleanly. */
export default function RealFood() {
  const { lang } = useI18n();
  return <RealFoodInner key={lang} />;
}
