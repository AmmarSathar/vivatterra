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
            <strong>Carmen Pecha</strong> &mdash; Harvester, Tacana I Indigenous
            Territory, Bolivia
          </p>
          <p className="harvester-quote">
            Wild açaí has been part of life in this territory for generations.
            Carmen is one of the people who makes this supply chain possible.
          </p>
        </div>
      </div>
    </section>
  );
}
