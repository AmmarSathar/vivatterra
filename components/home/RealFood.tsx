'use client';

import { useEffect, useRef } from 'react';

export default function RealFood() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

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
      const text = textRef.current!;

      void document.fonts.ready.then(() => {
        const ctx = gsap.context(() => {
          gsap.set(text, { opacity: 1 });

          // Responsive line splits: SplitText re-splits on resize (autoSplit)
          // and the reveal is scrubbed as the card travels up into view.
          SplitText.create(text, {
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
        <p className="realfood-static-text" ref={textRef} style={{ opacity: 0 }}>
          We exists for one reason.<br />
          <span className="realfood-static-muted">
            To scale local&nbsp;+&nbsp;value-added agroforestry products on land that is at
            risk of being cleared for extractive land uses such as industrial agriculture,
            mining, or logging.
          </span>
        </p>
      </div>
    </section>
  );
}
