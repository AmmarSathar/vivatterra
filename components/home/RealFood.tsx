'use client';

import { useRef, useEffect } from 'react';

export default function RealFood() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let kill: (() => void) | undefined;

    void Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ]).then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const textEl    = textRef.current!;
      const sectionEl = sectionRef.current!;
      const vw        = window.innerWidth;

      const split = new SplitText(textEl, { type: 'words', wordsClass: 'hscroll-word' });
      const words = split.words as HTMLElement[];

      gsap.set(words,  { opacity: 0.12 });
      gsap.set(textEl, { x: vw });

      const textWidth = textEl.scrollWidth;

      const anim = gsap.fromTo(
        textEl,
        { x: vw },
        {
          x: -textWidth,
          ease: 'none',
          onUpdate() {
            const spotX = vw / 2;
            words.forEach(w => {
              const r    = w.getBoundingClientRect();
              const cx   = r.left + r.width / 2;
              const dist = Math.abs(cx - spotX);
              const t    = Math.max(0, 1 - dist / (vw * 0.38));
              gsap.set(w, { opacity: 0.12 + 0.88 * t * t });
            });
          },
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );

      kill = () => { anim.kill(); split.revert(); };
    });

    return () => kill?.();
  }, []);

  return (
    <section ref={sectionRef} className="hscroll-section">
      <div className="hscroll-sticky">
        <p ref={textRef} className="hscroll-text">
          VivaTTerra exists for one reason: to scale local&nbsp;+&nbsp;value-added agroforestry
          products on land that is at risk of being cleared for extractive land uses such as
          industrial agriculture, mining, or logging.
        </p>
      </div>
    </section>
  );
}
