'use client';

import { useReveal } from '@/hooks/useReveal';

export default function WhereItsFrom() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="witf-section">
      <div className="witf-inner">
        <div className="witf-eyebrow">Origin</div>
        <h2 className="witf-headline">
          Ixiamas, Bolivia
          <span className="witf-subheadline">Tacana I Indigenous Territory</span>
        </h2>
        <p className="witf-body">
          Our açaí grows wild in the forest canopy of TCO Tacana I, between the
          municipalities of San Buenaventura and Ixiamas, in Bolivia&rsquo;s
          Amboró&ndash;Madidi biodiversity corridor. It isn&rsquo;t planted, and
          it isn&rsquo;t cleared for. It&rsquo;s harvested where it has always
          grown, by Tacana families managing these forests under their own
          institutions.
        </p>
      </div>
    </section>
  );
}
