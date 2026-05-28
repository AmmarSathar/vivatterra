// Story.jsx — producer pull-quote on a deep forest surface
function Story() {
  return (
    <section className="section section-deep" id="producers">
      <div className="container">
        <div className="story">
          <div className="photo"></div>
          <div>
            <div className="eyebrow" style={{ color: 'var(--vt-sage-300)', marginBottom: 24 }}>
              <span style={{ background: 'var(--vt-sage-300)' }}></span>
              From the cooperative
            </div>
            <p className="pullquote">
              "We've worked these palms for three generations. The forest tells you when it's ready to give."
            </p>
            <div className="attribution">
              <span className="nm">Doña Marta Pecha</span>
              <span className="meta">Carmen Pecha cooperative · TCO Tacana 1 · Bolivia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Story });
