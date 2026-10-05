'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();
  const NAV = [
    { label: t('footer.home'), href: '/' },
    { label: t('footer.mission'), href: '/about' },
    { label: t('footer.contact'), href: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 — Brand */}
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/footer-wordmark.svg"
              alt="VivaTTerra"
              className="footer-logo"
            />
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          {/* Column 2 — Navigation */}
          <nav className="footer-col" aria-label={t('footer.navAria')}>
            <h5>{t('footer.navigation')}</h5>
            <ul>
              {NAV.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <div className="footer-col">
            <h5>{t('footer.contact')}</h5>
            <ul className="footer-contact">
              <li>
                <a href="mailto:fabrizio@vivatterra.com">
                  <svg
                    className="footer-ico"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  fabrizio@vivatterra.com
                </a>
              </li>
              <li>
                <a href="tel:+15144411977">
                  <svg
                    className="footer-ico"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  514-441-1977
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-meta">
          <span>{t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  );
}
