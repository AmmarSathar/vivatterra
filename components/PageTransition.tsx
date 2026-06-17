'use client';

import { useEffect } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    window.dispatchEvent(new CustomEvent('vt:reveal'));
  }, []);

  return <>{children}</>;
}
