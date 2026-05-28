// Hero.jsx — editorial hero with display headline + 2 CTAs
function Hero({ onPrimary, onSecondary }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="eyebrow">A market for the living</div>
        <h1>
          Where producers steward the land, <span className="accent">consumers sustain it.</span>
        </h1>
        <p>
          vivaTTerra is a social-purpose enterprise building value-added agroforestry
          supply chains — integrating ecological integrity and economic viability into
          a single operating model. We treat impact as economic infrastructure, not a
          marketing overlay.
        </p>
        <div className="ctas">
          <button className="btn btn-primary" onClick={onPrimary}>
            Read our theory of change <span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-ghost" onClick={onSecondary}>
            Meet the producers <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
