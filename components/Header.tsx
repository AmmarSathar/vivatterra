'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '@/lib/i18n';

const COVER_MS = 850; // two 0.4 s tweens + small buffer

export default function Header() {
  const { t } = useI18n();
  const router = useRouter();
  const navigate = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href);
        return;
      }
      window.dispatchEvent(new CustomEvent('vt:cover'));
      setTimeout(() => router.push(href), COVER_MS);
    },
    [router]
  );

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-header-col site-header-col--left">
          <Link href="/about" className="site-header-link" onClick={(e) => navigate(e, '/about')}>
            {t('nav.about')}
          </Link>
        </div>

        <div className="site-header-col site-header-col--center">
          <Link href="/" className="site-header-tt" aria-label={t('nav.homeAria')} onClick={(e) => navigate(e, '/')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/TT-logo-white.svg" alt="" className="site-header-tt-img" draggable={false} />
          </Link>
        </div>

        <div className="site-header-col site-header-col--right">
          <Link href="/contact" className="site-header-link" onClick={(e) => navigate(e, '/contact')}>
            {t('nav.contact')}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
