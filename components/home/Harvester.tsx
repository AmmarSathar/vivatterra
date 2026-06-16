'use client';

import { useReveal } from '@/hooks/useReveal';

const PHOTOS = [
  'acai 2.jpg',
  'acai_forest.avif',
  'Bolivian Acai Euterpe precaratoria.jpg',
  'carmen pecha image.jpg',
  'Figura-1-Mapa-de-la-zona-del-aprovechamiento-de-Caiman-yacare-Se-muestran-las.png',
];

export default function Harvester() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="harvester-section">
      <div className="container-narrow">
        <p className="harvester-eyebrow">
          <span>The Hands Behind the Harvest</span>
        </p>

        <div className="harvester-gallery">
          {PHOTOS.map((name) => (
            <figure className="harvester-photo" key={name}>
              <img
                src={encodeURI(`/Photo/fan-view/${name}`)}
                alt=""
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <figure className="harvester">
          <blockquote className="harvester-quote">
            Wild açaí has been part of life in this territory for
            generations&mdash;Carmen is one of the people who makes this
            supply chain possible.
          </blockquote>

          <figcaption className="harvester-attribution">
            <span className="harvester-name">Carmen Pecha</span>
            <span className="harvester-meta">
              Harvester &middot; Tacana I Indigenous Territory, Bolivia
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
