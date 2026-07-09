'use client';

import { useReveal } from '@/hooks/useReveal';

export default function WhereItsFrom() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="witf-section">
      <div className="witf-inner">
        <div className="witf-eyebrow">Origin</div>
        <h2 className="witf-headline">
          Learn about the land that remains prosperous thanks to the açaí we offer.
          <span className="witf-subheadline">Tacana I Indigenous Territory</span>
        </h2>
        <p className="witf-body">
          The açaí we work with grows wild in the Amazon forest in Bolivia&rsquo;s
          Amboró&ndash;Madidi biodiversity corridor. Once sustainably harvested, it
          goes through pulping and freeze-drying in Ixiamas by Samay O2 &ndash;
          Amazon Recovery, the local partner building the region&rsquo;s processing
          infrastructure. The fruit stays close to the forest it came from, all the
          while providing substantial economic benefits to the local community.
        </p>
      </div>
    </section>
  );
}
