'use client';

import { useReveal } from '@/hooks/useReveal';
import Link from 'next/link';

const SPECS = [
  { k: 'Form',             v: 'Freeze-dried powder' },
  { k: 'Ingredients',      v: '100% Wild açaí (Euterpe precatoria)' },
  { k: 'Project Partner',  v: 'Samay O2 – Amazon Recovery' },
  { k: 'Origin',           v: 'Ixiamas, TCO Tacana I, Amboró–Madidi corridor, Bolivia' },
  { k: 'Processing',       v: 'Freeze-dried and pulverized close to origin, in Ixiamas, Bolivia' },
  { k: 'Available format', v: '250 g bag' },
  { k: 'Order quantity',   v: 'Flexible: choose the quantity that fits your volume' },
  { k: 'Minimum order',    v: 'Contact us' },
  { k: 'Pricing',          v: 'Contact us for current pricing' },
];

export default function ProductSpecs() {
  const ref = useReveal();

  return (
    <section ref={ref} className="section section-cream" id="product">
      <div className="container">
        <div className="product">
          <div className="photo">
            <div className="powder" />
          </div>

          <div className="info">
            <div className="eyebrow">First implementation</div>
            <h3>Freeze-dried wild açaí powder</h3>
            <p>
              Wild açaí pulp is nearly 90% water. Through freeze-drying, the freshly harvested fruit is
              frozen at extremely low temperatures before the ice is removed under vacuum through
              sublimation. What remains is the fruit in its most concentrated form: pure, stable, and
              shelf-ready.
            </p>

            <ul className="meta-list">
              {SPECS.map(({ k, v }) => (
                <li key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="mailto:hello@vivatterra.com" className="btn btn-warm">
                Request a sample <span className="btn-arrow">→</span>
              </a>
              <Link href="/about" className="btn btn-secondary">
                Why agroforestry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
