'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n, type MessageKey } from '@/lib/i18n';

/**
 * /carmen-pecha — the evidence behind "Why Açaí?". Long-form page telling the
 * story in order: where Carmen Pecha is → why the territory matters → the
 * land-use pressure → what is lost → forest-based livelihoods → açaí's role →
 * VivaTTerra's response. Maps open in a lightbox.
 */

type MapFigure = {
  src: string;
  width: number;
  height: number;
  altKey: MessageKey;
  captionKey: MessageKey;
  sourceKey: MessageKey;
};

const MAP_EASBA: MapFigure = {
  src: '/Photo/maps/tco-tacana-map-easba.jpg',
  width: 981,
  height: 1047,
  altKey: 'carmen.map1.alt',
  captionKey: 'carmen.map1.caption',
  sourceKey: 'carmen.map1.source',
};

const MAP_TERRITORY: MapFigure = {
  src: '/Photo/maps/tco-takana-territory.jpg',
  width: 502,
  height: 544,
  altKey: 'carmen.map2.alt',
  captionKey: 'carmen.map2.caption',
  sourceKey: 'carmen.map2.source',
};

const OPENDEMOCRACY_URL =
  'https://www.opendemocracy.net/es/cultivo-ca%C3%B1a-azucar-deforesta-territorio-indigena-amazonia-boliviana/';

function MapFigureView({
  map,
  onOpen,
}: {
  map: MapFigure;
  onOpen: (m: MapFigure) => void;
}) {
  const { t } = useI18n();
  return (
    <figure className="wa-figure wa-reveal">
      <button type="button" className="wa-map-btn" onClick={() => onOpen(map)} aria-label={t('carmen.enlargeAria')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={map.src}
          width={map.width}
          height={map.height}
          alt={t(map.altKey)}
          className="wa-map"
          loading="lazy"
          draggable={false}
        />
      </button>
      <figcaption className="wa-figcaption">
        <span className="wa-caption">{t(map.captionKey)}</span>
        <span className="wa-source">{t(map.sourceKey)}</span>
      </figcaption>
    </figure>
  );
}

export default function CarmenPechaStory() {
  const { t, rich } = useI18n();
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
        {/* SECTION 1: Carmen Pecha as a productive standing-forest economy */}
        <section className="wa-sec">
          <header className="wa-header wa-reveal">
            <div className="wa-eyebrow">{t('carmen.eyebrow')}</div>
            <h1 className="wa-title">{t('carmen.title')}</h1>
          </header>

          <div className="wa-split">
            <div className="wa-col">
              <p className="wa-body wa-reveal">{t('carmen.s1.p1')}</p>
              <p className="wa-body wa-reveal">{rich('carmen.s1.p2')}</p>
              <p className="wa-body wa-reveal">{rich('carmen.s1.p3')}</p>
              <p className="wa-body wa-reveal">{t('carmen.s1.p4')}</p>
            </div>

            <MapFigureView map={MAP_TERRITORY} onOpen={setLightbox} />
          </div>
        </section>

        {/* SECTION 2: the competing land-use model */}
        <section className="wa-sec">
          <header className="wa-header wa-reveal">
            <h2 className="wa-h3">{t('carmen.s2.title')}</h2>
          </header>

          <div className="wa-split wa-split--flip">
            <MapFigureView map={MAP_EASBA} onOpen={setLightbox} />
            <div className="wa-col">
              <p className="wa-body wa-reveal">{t('carmen.s2.p1')}</p>
              <p className="wa-body wa-reveal">{rich('carmen.s2.p2')}</p>
              <p className="wa-body wa-reveal">{t('carmen.s2.p3')}</p>
              <div className="wa-compare wa-reveal">
                <div className="wa-compare-item wa-compare-item--forest">
                  <span className="wa-compare-label">{t('carmen.compare.forest.label')}</span>
                  <span>{t('carmen.compare.forest.text')}</span>
                </div>
                <div className="wa-compare-item">
                  <span className="wa-compare-label">{t('carmen.compare.conversion.label')}</span>
                  <span>{t('carmen.compare.conversion.text')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: VivaTTerra's response */}
        <section className="wa-sec wa-response">
          <h2 className="wa-h3 wa-reveal">{t('carmen.response.title')}</h2>
          <p className="wa-statement wa-reveal">{t('carmen.response.statement')}</p>
          <p className="wa-body wa-reveal">{t('carmen.response.p')}</p>
          <div className="wa-reveal">
            <a href={OPENDEMOCRACY_URL} target="_blank" rel="noopener noreferrer" className="wa-link">
              {t('carmen.response.link')}
              <span aria-hidden="true"> ↗</span>
            </a>
            <p className="wa-source wa-source--block">{t('carmen.response.cite')}</p>
          </div>
        </section>
      </div>

      {lightbox &&
        createPortal(
          <div
            className="wa-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t('carmen.lightboxAria')}
            onClick={() => setLightbox(null)}
            data-lenis-prevent
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt={t(lightbox.altKey)} className="wa-lightbox-img" />
            <button
              type="button"
              className="wa-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label={t('carmen.closeAria')}
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
