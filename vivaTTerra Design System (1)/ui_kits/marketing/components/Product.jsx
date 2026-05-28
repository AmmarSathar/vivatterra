// Product.jsx — featured product card with provenance
function Product({ onBuy }) {
  const meta = [
    { k: 'Origin',    v: 'TCO Tacana 1, Bolivia' },
    { k: 'Producer',  v: 'Carmen Pecha cooperative' },
    { k: 'Method',    v: 'Freeze-dried at origin' },
    { k: 'System',    v: 'Agroforestry palms' },
    { k: 'Harvest',   v: '2024' },
  ];
  return (
    <section className="section section-cream" id="products">
      <div className="container">
        <div className="product">
          <div className="photo">
            <div className="powder"></div>
          </div>
          <div className="info">
            <div className="eyebrow">First implementation</div>
            <h3>Freeze-dried açaí powder</h3>
            <p>
              A shelf-stable, high-value ingredient — sourced from agroforestry palms,
              processed locally to capture value at origin, and allocated across diversified
              channels with differentiated pricing.
            </p>
            <ul className="meta-list">
              {meta.map(m => (
                <li key={m.k}>
                  <span className="k">{m.k}</span>
                  <span className="v">{m.v}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-warm" onClick={onBuy}>
                Request a sample <span className="btn-arrow">→</span>
              </button>
              <button className="btn btn-secondary">Download spec sheet</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Product });
