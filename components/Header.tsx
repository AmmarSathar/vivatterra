'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Mission' },
  { href: '/about?tab=contact', label: 'Get in touch' },
];

function isActive(href: string, pathname: string): boolean {
  if (href.includes('contact')) return false;
  return pathname === href.split('?')[0];
}

export default function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link href="/" className="brand" onClick={close}>
            viva<span className="wm-tt">TT</span>erra
          </Link>

          <ul>
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={isActive(href, pathname) ? 'active' : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/about?tab=contact" className="btn btn-primary nav-cta">
            Join the mission <span className="btn-arrow">→</span>
          </Link>

          <button
            className="nav-hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      <div
        className={`mobile-menu${mobileOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="mobile-menu-header">
          <Link href="/" className="brand" onClick={close}>
            viva<span className="wm-tt">TT</span>erra
          </Link>
          <button className="mobile-menu-close" aria-label="Close menu" onClick={close}>
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="mobile-menu-link" onClick={close}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-cta">
          <Link href="/about?tab=contact" className="btn btn-primary" onClick={close}>
            Join the mission <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
