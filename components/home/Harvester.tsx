'use client';

export default function Harvester() {
  return (
    <section className="harvester-section">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Photo/background-images/acai-backdrop.webp"
        alt="The hands behind the harvest"
        className="harvester-canvas"
        draggable={false}
      />
      <div className="harvester-overlay">
        <div className="harvester-overlay-inner">
          <h2 className="harvester-title">The Hands Behind the Harvest</h2>
          <p className="harvester-attr">
            Harvested by the <strong>Carmen Pecha</strong> community
          </p>
          <p className="harvester-quote">
            Carmen Pecha is a Tacana community in the Ixiamas municipality,
            organized under CIPTA &mdash; the Tacana people&rsquo;s own
            governing council. Its families harvest açaí under a forest
            management plan they built and maintain themselves.
          </p>
          <p className="harvester-placeholder">
            Photo of the harvest, with consent &middot; a named harvester&rsquo;s
            own words, once available
          </p>
        </div>
      </div>
    </section>
  );
}
