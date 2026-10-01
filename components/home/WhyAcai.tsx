'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Snowflake, Sparkles } from 'lucide-react';

const COVER_MS = 850; // matches the header's page-transition cover

/**
 * Card 4 — "Why Açaí?" Concept only: açaí → forest intact → local economic
 * value, then nutrition + preserved quality. The evidence lives on /carmen-pecha.
 */
export default function WhyAcai() {
  const router = useRouter();

  const go = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push('/carmen-pecha');
        return;
      }
      window.dispatchEvent(new CustomEvent('vt:cover'));
      setTimeout(() => router.push('/carmen-pecha'), COVER_MS);
    },
    [router]
  );

  return (
    <section className="why-section" data-lenis-prevent>
      <div className="why-inner">
        <h2 className="why-title">Why Açaí?</h2>

        <ol className="why-flow" aria-label="How açaí keeps the forest standing">
          <li>Açaí</li>
          <li>Forest remains intact</li>
          <li>Local economic value</li>
        </ol>

        <p className="why-statement">Economic value without clearing the forest.</p>
        <p className="why-body">
          Açaí creates economic value from a living forest. Unlike land uses that depend on
          clearing forest to generate income, it is harvested from naturally occurring and
          managed palms while the ecosystem stays intact &mdash; so local communities earn
          from the forest&rsquo;s continued health, not its conversion.
        </p>

        <div className="why-pair">
          <div className="why-point">
            <Sparkles size={26} strokeWidth={1.25} aria-hidden="true" />
            <h3>Naturally nutrient-rich</h3>
            <p>Açaí is naturally rich in antioxidants, fiber and unsaturated fats.</p>
          </div>
          <div className="why-point">
            <Snowflake size={26} strokeWidth={1.25} aria-hidden="true" />
            <h3>Preserved close to where it grows</h3>
            <p>
              Processed close to origin in Ixiamas and freeze-dried to retain its nutritional
              qualities, flavor and character.
            </p>
          </div>
        </div>

        <Link href="/carmen-pecha" className="why-link" onClick={go}>
          Why Carmen Pecha? <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
