import Link from 'next/link';

export default function OurStory() {
  return (
    <div className="tab-content">
      <section className="section">
        <div className="container-narrow">
          <div className="section-header">
            <div className="eyebrow">Who we are</div>
            <h2>We started with a simple observation.</h2>
            <p className="lead">
              Forests are cleared because, for the people living beside them, that is the decision that
              makes economic sense. The problem is rarely ignorance. It is the existing dominant economic
              structure.
            </p>
          </div>
          <p>
            vivaTTerra was built on the premise that this can change — not through pressure alone, but
            through markets. Specifically, through supply chains that make intact forests and regenerative
            land use economically competitive with extraction.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container-narrow">
          <h2>What the name means</h2>
          <p>
            The name comes from two Latin roots: <em>vivat</em> — long live, may it live — and{' '}
            <em>terra</em> — earth, land, soil.
          </p>
          <p className="emphasis-line">Together: let the land live.</p>
          <p>
            It is not a slogan. It is the operating principle behind every sourcing decision, every
            supplier relationship, and every product we bring to market.
          </p>
          <p>
            The double TT is symbolic for grafting — a horticultural technique in which two plants are
            joined so they grow as one. This represents vivaTTerra&apos;s mission that ecosystem health and a
            viable economy are inseparable and must grow together.
          </p>
          <p>
            Consumer choice matters more than we tend to believe. Every purchase is a signal that shapes
            how products are made, how land is used, and who captures value. At its core, vivaTTerra is
            about that connection — producers who care for the land make these foods possible, and
            consumers who choose them help sustain that care.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <h2>How we work</h2>
          <p>
            We work directly with the producers and processors of the products we source. We are a small,
            operationally focused team bootstrapping this infrastructure carefully and incrementally —
            prioritizing strong relationships, product integrity, and long-term viability over rapid
            expansion.
          </p>
          <p>
            What we are building is more than a product supply chain: it is consistent sourcing capacity,
            deeper producer partnerships, and the commercial relationships necessary to grow this from a
            validated operation into durable market infrastructure.
          </p>
          <p>
            That infrastructure is the first step toward the broader vivaTTerra platform: a marketplace
            for important food products built on end-to-end data integrity, designed to provide technical
            support to producers and complete transparency to consumers.
          </p>

          <div className="section-cta">
            <h3>We want to hear from you.</h3>
            <Link href="/about?tab=contact" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>
              Get in touch <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
