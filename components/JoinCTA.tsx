/**
 * Oversized "Join the mission" call-to-action band — big headline on the left,
 * circular line-art arrow button on the right. Sits directly above the footer.
 */
export default function JoinCTA({
  href = 'mailto:fabrizio@vivatterra.com',
  text = 'Join the mission.',
}: {
  href?: string;
  text?: string;
}) {
  return (
    <section className="join-cta">
      <a className="join-cta-link" href={href}>
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
      </a>
    </section>
  );
}
