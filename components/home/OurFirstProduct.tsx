'use client';

import { useReveal } from '@/hooks/useReveal';

export default function OurFirstProduct() {
  const ref = useReveal();

  return (
    <section ref={ref} className="section section-deep">
      <div className="container-narrow">
        <div className="section-header on-deep">
          <div className="eyebrow eyebrow-on-deep">Our first product</div>
          <h2>Wild-Harvested Açaí Powder</h2>
        </div>

        <div className="harvester">
          <h3 className="harvester-title">The Hands Behind the Harvest</h3>

          <div className="harvester-portrait" aria-hidden="true">
            <span>Portrait</span>
          </div>

          <p className="harvester-name">Carmen Pecha</p>
          <p className="harvester-meta">
            Harvester, Tacana I Indigenous Territory, Bolivia
          </p>

          <div className="transition-quote">
            <p>
              Wild açaí has been part of life in this territory for generations. Carmen is one of
              the people who makes this supply chain possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
