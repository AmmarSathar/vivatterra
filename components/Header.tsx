'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const COVER_MS = 850; // two 0.4 s tweens + small buffer

export default function Header() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let isHidden = false;
    const THRESHOLD = 8;
    let kill: (() => void) | undefined;

    void import('gsap').then(({ gsap }) => {
      function onScroll() {
        const y = window.scrollY;
        const delta = y - lastY;
        if (Math.abs(delta) < THRESHOLD) return;
        const shouldHide = y > 80 && delta > 0;
        if (shouldHide !== isHidden) {
          isHidden = shouldHide;
          gsap.to(headerRef.current, {
            yPercent: shouldHide ? -100 : 0,
            duration: 0.45,
            ease: shouldHide ? 'power2.in' : 'power3.out',
            overwrite: true,
          });
        }
        lastY = y;
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      kill = () => window.removeEventListener('scroll', onScroll);
    });

    return () => kill?.();
  }, []);

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
    <header ref={headerRef} className="site-header">
      <div className="site-header-inner">
        <div className="site-header-col site-header-col--left">
          <Link href="/about" className="site-header-link" onClick={(e) => navigate(e, '/about')}>
            Our Mission
          </Link>
        </div>

        <div className="site-header-col site-header-col--center">
          <Link href="/" className="site-header-tt" aria-label="vivaTTerra — home" onClick={(e) => navigate(e, '/')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/TT-logo-white.svg" alt="" className="site-header-tt-img" draggable={false} />
          </Link>
        </div>

        <div className="site-header-col site-header-col--right">
          <Link href="/about?tab=contact" className="site-header-link" onClick={(e) => navigate(e, '/about?tab=contact')}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
