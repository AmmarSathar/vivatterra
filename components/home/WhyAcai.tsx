'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Snowflake, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const COVER_MS = 850; // matches the header's page-transition cover

/**
 * Card 4 — "Why Açaí?" Concept only: açaí → forest intact → local economic
 * value, then nutrition + preserved quality. The evidence lives on /carmen-pecha.
 */
export default function WhyAcai() {
  const { t } = useI18n();
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
        <h2 className="why-title">{t('home.why.title')}</h2>

        <ol className="why-flow" aria-label={t('home.why.flowAria')}>
          <li>{t('home.why.flow1')}</li>
          <li>{t('home.why.flow2')}</li>
          <li>{t('home.why.flow3')}</li>
        </ol>

        <p className="why-statement">{t('home.why.statement')}</p>
        <p className="why-body">{t('home.why.body')}</p>

        <div className="why-pair">
          <div className="why-point">
            <Sparkles size={26} strokeWidth={1.25} aria-hidden="true" />
            <h3>{t('home.why.nutrientTitle')}</h3>
            <p>{t('home.why.nutrientBody')}</p>
          </div>
          <div className="why-point">
            <Snowflake size={26} strokeWidth={1.25} aria-hidden="true" />
            <h3>{t('home.why.preservedTitle')}</h3>
            <p>{t('home.why.preservedBody')}</p>
          </div>
        </div>

        <Link href="/carmen-pecha" className="why-link" onClick={go}>
          {t('home.why.link')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
