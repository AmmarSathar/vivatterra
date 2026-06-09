'use client';

import { useEffect, useRef } from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  duration?: number;
}

export default function GradientText({
  children,
  className = '',
  colors,
  duration = 4,
}: GradientTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;

    let kill: (() => void) | undefined;
    void import('gsap').then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { backgroundPosition: '0% 50%' },
          {
            backgroundPosition: '100% 50%',
            duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        );
      });
      kill = () => ctx.revert();
    });
    return () => kill?.();
  }, [duration]);

  const palette = colors ?? [
    'var(--vt-forest)',
    'var(--vt-sage)',
    'var(--vt-clay)',
    'var(--vt-sage)',
    'var(--vt-forest)',
  ];

  return (
    <span
      ref={ref}
      className={className}
      style={{
        background: `linear-gradient(90deg, ${palette.join(', ')})`,
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
}
