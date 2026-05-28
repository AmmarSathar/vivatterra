// TheoryOfChange.jsx — interactive 5-step causal chain
const TOC_STEPS = [
  {
    id: 'sovereignty',
    label: 'Land sovereignty',
    detail: (
      <>
        <span className="editorial">Sovereignty defines who controls decisions.</span> When
        producers have legal and customary control over their land, they can choose long-term
        continuity over short-term extraction.
      </>
    ),
  },
  {
    id: 'ecology',
    label: 'Ecosystem health',
    detail: (
      <>
        <span className="editorial">Healthy ecosystems are the operating system.</span> They
        produce higher-quality, more resilient outputs and lower long-term supply volatility.
      </>
    ),
  },
  {
    id: 'markets',
    label: 'Market alignment',
    detail: (
      <>
        <span className="editorial">Markets must be structured to recognize health.</span> vivaTTerra
        builds the channels and systems that reward differentiated, value-added products.
      </>
    ),
  },
  {
    id: 'livelihoods',
    label: 'Stable livelihoods',
    detail: (
      <>
        <span className="editorial">Producers capture greater value per unit of land.</span> Income
        becomes more predictable and less volume-dependent — no pressure to expand land use.
      </>
    ),
  },
  {
    id: 'resilience',
    label: 'Long-term resilience',
    detail: (
      <>
        <span className="editorial">Both people and landscapes withstand shocks.</span> Stable
        rural livelihoods enable intergenerational knowledge transfer, community cohesion, and
        collective action.
      </>
    ),
  },
];

function TheoryOfChange() {
  const [activeIdx, setActive] = React.useState(0);
  return (
    <section className="section section-deep" id="theory" style={{ background: 'var(--vt-ink)' }}>
      <div className="container">
        <div className="section-header on-deep">
          <div className="eyebrow" style={{ color: 'var(--vt-sage-300)' }}>
            <span style={{ background: 'var(--vt-sage-300)' }}></span>
            Section 4 · theory of change
          </div>
          <h2>A clear causal logic, end to end.</h2>
          <p>
            Land stewardship defines who controls decisions; those decisions shape ecosystems;
            ecosystems determine what markets can value; market alignment governs livelihood
            stability. Click any step.
          </p>
        </div>
        <div className="toc-wrap">
          <div className="toc">
            {TOC_STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`toc-step ${activeIdx === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="num">0{i + 1}</div>
                <div className="label">{s.label}</div>
                <div className="arrow">↓</div>
              </div>
            ))}
          </div>
          <div className="toc-detail">{TOC_STEPS[activeIdx].detail}</div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TheoryOfChange });
