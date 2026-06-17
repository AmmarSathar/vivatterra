'use client';

import { useEffect, useRef, useState } from 'react';
import DarkVeil from './shared/DarkVeil';
import GradientText from './shared/GradientText';

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const discRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('vt-splash-seen')) return;
    sessionStorage.setItem('vt-splash-seen', '1');
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }

    let kill: (() => void) | undefined;
    void import('gsap').then(({ gsap }) => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ onComplete: () => setVisible(false) });

        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.45, ease: 'power1.out' }
        );

        tl.fromTo(
          discRef.current,
          { scale: 0.75, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out' },
          '<0.15'
        );

        tl.to(discRef.current, { y: -60, opacity: 0, duration: 0.55, ease: 'power2.in' }, '+=0.6');
        tl.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: 'power1.in' }, '<0.1');
      });
      kill = () => ctx.revert();
    });

    return () => kill?.();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
      }}
    >
      <DarkVeil
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />

      <div
        ref={discRef}
        style={{
          position: 'relative',
          width: 'min(320px, 70vw)',
          aspectRatio: '1',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 45%, rgba(75,96,64,0.3) 0%, rgba(47,40,64,0.2) 100%)',
          border: '1px solid rgba(242,233,214,0.14)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-wordmark)',
            fontSize: 'clamp(26px, 5.5vw, 40px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          <GradientText
            colors={[
              'var(--vt-forest)',
              'var(--vt-sage)',
              'var(--vt-clay)',
              'var(--vt-sage)',
              'var(--vt-forest)',
            ]}
            duration={3}
          >
            viva
            <span
              style={{
                letterSpacing: 'var(--wm-tt-graft)',
                marginRight: 'calc(-1 * var(--wm-tt-graft))',
                fontKerning: 'none',
              }}
            >
              TT
            </span>
            erra
          </GradientText>
        </span>
      </div>
    </div>
  );
}
