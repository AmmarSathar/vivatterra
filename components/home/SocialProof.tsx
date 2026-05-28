'use client';

import { useReveal } from '@/hooks/useReveal';

export default function SocialProof() {
  const ref = useReveal();

  return (
    <section ref={ref} className="section">
      <div className="container-narrow">
        <div className="section-header">
          <div className="eyebrow">Early partners</div>
          <h2>What early partners are saying.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                background: 'var(--vt-cream)',
                borderRadius: 'var(--r-lg)',
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '16px',
                  lineHeight: 1.65,
                  color: 'var(--vt-stone-700)',
                  margin: 0,
                  maxWidth: 'none',
                }}
              >
                Testimonial from café or wellness buyer — coming soon.
              </p>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--vt-ink-900)', margin: '0 0 2px' }}>
                  Partner name
                </p>
                <p style={{ fontSize: '12px', color: 'var(--vt-stone-500)', margin: 0 }}>
                  Business · City
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
