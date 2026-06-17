'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const COVER_MS = 850; // matches the header's page-transition cover

/**
 * Oversized "Join the mission" call-to-action band — big headline on the left,
 * circular line-art arrow button on the right. Sits directly above the footer.
 * Leads to the contact form, using the same green cover transition as the header.
 */
export default function JoinCTA({
  href = '/contact',
  text = 'Join the mission.',
}: {
  href?: string;
  text?: string;
}) {
  const router = useRouter();

  const navigate = useCallback(
    (e: React.MouseEvent) => {
      // Let external / mailto links behave normally.
      if (!href.startsWith('/')) return;
      e.preventDefault();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href);
        return;
      }
      window.dispatchEvent(new CustomEvent('vt:cover'));
      setTimeout(() => router.push(href), COVER_MS);
    },
    [router, href]
  );

  return (
    <section className="join-cta">
      <Link className="join-cta-link" href={href} onClick={navigate}>
        <span className="join-cta-inner">
          <span className="join-cta-text">{text}</span>
          <span className="join-cta-arrow" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </span>
      </Link>
    </section>
  );
}
