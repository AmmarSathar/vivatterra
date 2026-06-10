'use client';

import { useState, type CSSProperties } from 'react';
import { useReveal } from '@/hooks/useReveal';

const CARDS = [
  'acai 2.jpg',
  'acai_forest.avif',
  'Bolivian Acai Euterpe precaratoria.jpg',
  'carmen pecha image.jpg',
  'Figura-1-Mapa-de-la-zona-del-aprovechamiento-de-Caiman-yacare-Se-muestran-las.png',
];

// CardDeck settings
const SPACING = 120; // horizontal gap between cards
const ROTATION = 10; // deg of tilt per step from centre
const ARC_DEPTH = 10; // vertical arc curvature
const SIZE_DECAY = 0.04; // scale lost per step from centre
const HOVER_SCALE = 1.05;
const HOVER_LIFT = 10; // px raised on hover
const PUSH_FORCE = 150; // how far neighbours slide away from the hovered card
const CARD_W = 360;
const CARD_H = 480;
const RADIUS = 48;

export default function Harvester() {
  const ref = useReveal<HTMLElement>();
  const [hovered, setHovered] = useState<number | null>(null);
  const center = (CARDS.length - 1) / 2;

  const cardStyle = (i: number): CSSProperties => {
    const d = i - center;
    let tx = d * SPACING;
    let ty = d * d * ARC_DEPTH;
    const rot = d * ROTATION;
    let scale = 1 - Math.abs(d) * SIZE_DECAY;
    let z = 100 - Math.round(Math.abs(d) * 10);

    if (hovered !== null) {
      if (i === hovered) {
        scale *= HOVER_SCALE;
        ty -= HOVER_LIFT;
        z = 200;
      } else {
        const dist = i - hovered;
        tx += Math.sign(dist) * (PUSH_FORCE / Math.abs(dist));
      }
    }

    return {
      width: CARD_W,
      height: CARD_H,
      borderRadius: RADIUS,
      zIndex: z,
      transform: `translate(calc(-50% + ${tx}px), ${ty}px) rotate(${rot}deg) scale(${scale})`,
    };
  };

  return (
    <section ref={ref} className="harvester-section">
      <div className="container-narrow">
        <div className="card-deck" onMouseLeave={() => setHovered(null)}>
          {CARDS.map((name, i) => (
            <div
              key={name}
              className="deck-card"
              style={cardStyle(i)}
              onMouseEnter={() => setHovered(i)}
            >
              <img src={encodeURI(`/Photo/fan-view/${name}`)} alt="" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="harvester">
          <h3 className="harvester-title">The Hands Behind the Harvest</h3>

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
