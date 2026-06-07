'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const COVER_MS = 850; // two 0.4 s tweens + small buffer

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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
      setMobileOpen(false);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href);
        return;
      }
      window.dispatchEvent(new CustomEvent('vt:cover'));
      setTimeout(() => router.push(href), COVER_MS);
    },
    [router]
  );

  const close = () => setMobileOpen(false);

  return (
    <>
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
            <button
              className="site-header-hamburger"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={`mobile-menu${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="mobile-menu-header">
          <Link href="/" className="brand" onClick={(e) => navigate(e, '/')}>
            viva<span className="wm-tt">TT</span>erra
          </Link>
          <button className="mobile-menu-close" aria-label="Close menu" onClick={close}>
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>
        <nav className="mobile-menu-nav">
          <Link href="/" className="mobile-menu-link" onClick={(e) => navigate(e, '/')}>Home</Link>
          <Link href="/about" className="mobile-menu-link" onClick={(e) => navigate(e, '/about')}>Our Mission</Link>
          <Link href="/about?tab=contact" className="mobile-menu-link" onClick={(e) => navigate(e, '/about?tab=contact')}>Contact</Link>
        </nav>
        <div className="mobile-menu-cta">
          <Link href="/about?tab=contact" className="btn btn-primary" onClick={(e) => navigate(e, '/about?tab=contact')}>
            Join the mission <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
