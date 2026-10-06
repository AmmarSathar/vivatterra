'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useReveal } from '@/hooks/useReveal';
import { useI18n } from '@/lib/i18n';

const COVER_MS = 850; // matches the header's page-transition cover

// Contact page pathway for buyers / cafés / wellness businesses (preselects the inquiry type).
const REGISTER_HREF = '/contact?inquiry=buyer';

/**
 * "What we are preparing to offer": a concise, transparent product card that
 * sits between "Why Açaí?" and the closing call to action. It states what is
 * known (origin), what is planned (format) and what is still being finalized
 * (processing and packaging), and never presents the product as for sale.
 */
export default function ProductSpecs() {
  const ref = useReveal<HTMLElement>();
  const router = useRouter();
  const { t } = useI18n();

  const go = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(REGISTER_HREF);
        return;
      }
      window.dispatchEvent(new CustomEvent('vt:cover'));
      setTimeout(() => router.push(REGISTER_HREF), COVER_MS);
    },
    [router]
  );

  const specs = [
    { k: t('prep.format.label'), v: t('prep.format.value') },
    { k: t('prep.origin.label'), v: t('home.product.harvestedByValue') },
    { k: t('prep.processing.label'), v: t('prep.processing.value') },
  ];

  return (
    <section ref={ref} className="prep-section" id="product">
      <div className="prep-card">
        <div className="prep-main">
          <div className="prep-eyebrow">{t('prep.eyebrow')}</div>
          <h2 className="prep-title">{t('prep.title')}</h2>
          <p className="prep-status">{t('prep.status')}</p>
          <p className="prep-intro">{t('prep.intro')}</p>
        </div>

        <div className="prep-side">
          <dl className="prep-specs">
            {specs.map(({ k, v }) => (
              <div key={k} className="prep-spec">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <Link href={REGISTER_HREF} className="prep-cta" onClick={go}>
            {t('prep.cta')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
