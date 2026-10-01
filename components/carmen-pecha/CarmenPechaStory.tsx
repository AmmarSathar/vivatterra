'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * /carmen-pecha — the evidence behind "Why Açaí?". Long-form page telling the
 * story in order: where Carmen Pecha is → why the territory matters → the
 * land-use pressure → what is lost → forest-based livelihoods → açaí's role →
 * VivaTTerra's response. Maps open in a lightbox.
 */

type MapFigure = { src: string; width: number; height: number; alt: string };

const MAP_EASBA: MapFigure = {
  src: '/Photo/maps/tco-tacana-map-easba.jpg',
  width: 981,
  height: 1047,
  alt: 'Map of TCO Tacana 1 in light green, showing Carmen Pecha among four villages in the central area and purple areas of EASBA sugarcane expansion',
};

const MAP_TERRITORY: MapFigure = {
  src: '/Photo/maps/tco-takana-territory.jpg',
  width: 502,
  height: 544,
  alt: 'Map of TCO Takana I divided into three management zones, with Carmen Pecha in the central area near Ixiamas, bordering Madidi National Park and the Pilón Lajas Biosphere Reserve',
};

const OPENDEMOCRACY_URL =
  'https://www.opendemocracy.net/es/cultivo-ca%C3%B1a-azucar-deforesta-territorio-indigena-amazonia-boliviana/';

function MapFigureView({
  map,
  caption,
  source,
  onOpen,
}: {
  map: MapFigure;
  caption?: string;
  source: string;
  onOpen: (m: MapFigure) => void;
}) {
  return (
    <figure className="wa-figure wa-reveal">
      <button type="button" className="wa-map-btn" onClick={() => onOpen(map)} aria-label="Enlarge map">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={map.src}
          width={map.width}
          height={map.height}
          alt={map.alt}
          className="wa-map"
          loading="lazy"
          draggable={false}
        />
      </button>
      <figcaption className="wa-figcaption">
        {caption && <span className="wa-caption">{caption}</span>}
        <span className="wa-source">{source}</span>
      </figcaption>
    </figure>
  );
}

export default function CarmenPechaStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [lightbox, setLightbox] = useState<MapFigure | null>(null);

  // Progressive reveal as each block scrolls into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setAnimate(true);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll('.wa-reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <div ref={rootRef} className={`wa-page${animate ? ' wa-animate' : ''}`}>
      <div className="wa-inner">
        {/* Title */}
        <header className="wa-header wa-reveal">
          <div className="wa-eyebrow">Origin</div>
          <h1 className="wa-title">Why Carmen Pecha?</h1>
          <p className="wa-lede">
            The forest itself can remain productive. Revenue does not have to mean clearing
            the land and replacing the ecosystem with an industrial monoculture.
          </p>
        </header>

        {/* 1 — Where Carmen Pecha is (+ map 2) */}
        <div className="wa-block wa-split wa-split--flip">
          <MapFigureView
            map={MAP_TERRITORY}
            source="Source: Miranda, G., Estívariz, A., & Wallace, R. B. (2010). Resultados de la primera cosecha manejada de Caiman yacare en la TCO Takana (Norte de Bolivia)."
            onOpen={setLightbox}
          />
          <div className="wa-col wa-col--center">
            <h2 className="wa-h3 wa-reveal">Where Carmen Pecha is</h2>
            <p className="wa-body wa-reveal">
              Carmen Pecha is one of four villages located in the central area of the Tacana
              Indigenous Territory, TCO Tacana 1, in Bolivia&rsquo;s northern Amazon.
            </p>
            <p className="wa-body wa-reveal">
              TCO Takana I is divided into three management zones, with Carmen Pecha located
              in the central area near Ixiamas. The territory borders Madidi National Park and
              the Pil&oacute;n Lajas Biosphere Reserve, forming an important corridor for
              biodiversity conservation.
            </p>
          </div>
        </div>

        {/* 2 — Land-use pressure (+ map 1) */}
        <div className="wa-block wa-split">
          <div className="wa-col">
            <h2 className="wa-h3 wa-reveal">Land-use pressure in TCO Tacana 1</h2>

            <div className="wa-stats wa-reveal">
              <div className="wa-stat">
                <span className="wa-stat-num">124</span>
                <span className="wa-stat-unit">hectares</span>
              </div>
              <span className="wa-stat-arrow" aria-hidden="true">→</span>
              <div className="wa-stat">
                <span className="wa-stat-num">4,573</span>
                <span className="wa-stat-unit">hectares</span>
              </div>
            </div>

            <p className="wa-body wa-reveal">
              During the 2010s, EASBA &mdash; Empresa Azucarera San Buenaventura &mdash;
              expanded its sugarcane cultivation from{' '}
              <strong className="wa-fig">124 hectares</strong> to{' '}
              <strong className="wa-fig">4,573 hectares</strong>. Much of this expansion
              occurred without proper consultation with surrounding Tacana communities.
            </p>
            <p className="wa-body wa-reveal">
              Teresa Su&aacute;rez Tayo, from the Tacana community of Tres Hermanos, reported
              that while her community was preparing for its anniversary celebration,{' '}
              <strong className="wa-fig">400 hectares</strong> of land were unexpectedly
              cleared.
            </p>
          </div>

          <MapFigureView
            map={MAP_EASBA}
            caption="TCO Tacana 1 is shown in light green. Carmen Pecha is one of four villages in the central area of the territory. Purple areas indicate EASBA sugarcane expansion."
            source="Source: Google Earth Pro, EASBA and CIPTA-CIMTA"
            onOpen={setLightbox}
          />
        </div>

        {/* 3 — What is lost */}
        <div className="wa-block wa-narrow">
          <h2 className="wa-h3 wa-reveal">The impact of industrial land use</h2>
          <p className="wa-body wa-reveal">
            Sugarcane expansion represents an industrial land-use model dependent on forest
            clearance, industrial processing and significant long-term investment.
          </p>
          <p className="wa-body wa-reveal">
            Forest loss affects more than biodiversity. It can also contribute to the
            disappearance of native seed varieties and forest patches traditionally managed
            for food and medicine.
          </p>
        </div>

        {/* 4 — Forest-based livelihoods */}
        <div className="wa-block wa-narrow">
          <h2 className="wa-h3 wa-reveal">Forest-based livelihoods</h2>
          <p className="wa-body wa-reveal">
            Much of the local economy in TCO Tacana 1 is instead connected to{' '}
            <span className="wa-em">
              forest-based activities that do not require large-scale land-use conversion
            </span>
            , including fishing, tourism, hunting, native-honey collection and agroforestry
            products such as majo and açaí.
          </p>
        </div>

        {/* 5 — Açaí's role */}
        <div className="wa-block wa-narrow">
          <h2 className="wa-h3 wa-reveal">Where açaí fits</h2>
          <p className="wa-body wa-reveal">
            Açaí is one of these forest-based products. It is harvested from naturally
            occurring and locally managed palms while the surrounding forest stays standing,
            so the forest itself remains productive and the income does not depend on its
            conversion.
          </p>
          <p className="wa-body wa-reveal">
            Carmen Pecha is a Tacana community in the Ixiamas municipality, organized under
            CIPTA &mdash; the Tacana people&rsquo;s own governing council. Its families
            harvest açaí under a forest management plan they built and maintain themselves.
          </p>
        </div>

        {/* 6 — VivaTTerra's response */}
        <div className="wa-block wa-response">
          <h2 className="wa-h3 wa-reveal">VivaTTerra&rsquo;s response</h2>
          <p className="wa-statement wa-reveal">
            VivaTTerra supports local forest-based management in TCO Tacana 1 through the
            purchase of açaí sourced from Carmen Pecha.
          </p>
          <div className="wa-reveal">
            <a href={OPENDEMOCRACY_URL} target="_blank" rel="noopener noreferrer" className="wa-link">
              Read the openDemocracy investigation
              <span aria-hidden="true"> ↗</span>
            </a>
            <p className="wa-source wa-source--block">
              Gil, K., &amp; Acuña, R. (2021). El cultivo de caña de azúcar deforesta
              territorio indígena en la Amazonía boliviana. openDemocracy.
            </p>
          </div>
        </div>
      </div>

      {lightbox &&
        createPortal(
          <div
            className="wa-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged map"
            onClick={() => setLightbox(null)}
            data-lenis-prevent
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt={lightbox.alt} className="wa-lightbox-img" />
            <button
              type="button"
              className="wa-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close enlarged map"
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
