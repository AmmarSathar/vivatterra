'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-driven text fill: the statement starts dimmed/greyed and each word
 * fills to full cream as you scroll through the section (scrubbed). Poppins Bold.
 * No-ops to fully-lit text under prefers-reduced-motion.
 */
export default function RealFoodPower() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    const text = section?.querySelector<HTMLElement>('.rfp-text');
    if (!section || !text) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      text.style.color = 'var(--vt-cream)';
      return;
    }

    let kill: (() => void) | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);

      void document.fonts.ready.then(() => {
        const ctx = gsap.context(() => {
          SplitText.create(text, {
            type: 'words',
            wordsClass: 'rfp-word',
            autoSplit: true,
            onSplit: (self) =>
              gsap.to(self.words, {
                color: 'var(--vt-cream)',
                ease: 'none',
                stagger: 1,
                scrollTrigger: {
                  trigger: section,
                  start: 'top 75%',
                  end: 'bottom 60%',
                  scrub: true,
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
    <section ref={ref} className="rfp-section">
      <p className="rfp-text">
        <span className="rfp-line">Real food holds real power.</span>{' '}
        <span className="rfp-line">
          This statement only holds if we give it real value.
        </span>
      </p>
    </section>
  );
}
