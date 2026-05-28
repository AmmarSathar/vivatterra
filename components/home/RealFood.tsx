'use client';

import { useReveal } from '@/hooks/useReveal';

export default function RealFood() {
  const ref = useReveal();

  return (
    <section ref={ref} className="section">
      <div className="container-narrow">
        <div className="section-header">
          <h2>Real food. From its native land.</h2>
          <p className="lead">Not all açaí is the same.</p>
        </div>

        <div className="realfood-grid">
          <div>
            <p>
              This is wild açaí grown in Bolivia&apos;s area of the Upper Amazon River Basin. This is a
              rare species of açaí (<em>Euterpe precatoria</em>) — highly prized against the commercially
              and industrially grown açaí that dominates global markets, because it has a naturally
              smoother yet richer flavour.
            </p>
            <p>That is what you tasted. That is what we source.</p>
          </div>

          <div className="callout-quote">
            <p>
              Purchase real food. Food that is grown in its native land. Food that makes people&apos;s
              health and quality of life better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
