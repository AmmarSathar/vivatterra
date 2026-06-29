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
          <div className="eyebrow">Traceability</div>
          <h2>How the açaí got here</h2>
          <p>
            The forest management plan that governs this harvest didn&rsquo;t appear on its own.
            From 2012 to 2019, a Bolivian government initiative, backed by the UNDP and the
            Global Environment Facility, worked with Tacana communities in this corridor to
            formalise non-timber forest management &mdash; the legal and institutional groundwork
            that makes it possible to harvest açaí from standing forest rather than cleared
            land.<sup className="cite-ref">1</sup>
          </p>
          <p>
            That programme has since concluded. We are not affiliated with it, and we do not
            claim it as our supply chain. What it left behind &mdash; the management plan, and
            CIPTA&rsquo;s role in governing it &mdash; is what the harvest still runs on today.
          </p>
          <ol className="citations">
            <li>
              UNDP (2016). <em>Mid-Term Evaluation, Conservation of Biodiversity through
              Sustainable Forest Management by Local Communities</em> (PIMS 4197).{' '}
              <a
                href="https://erc.undp.org/evaluation/documents/download/9970"
                target="_blank"
                rel="noopener noreferrer"
              >
                erc.undp.org
              </a>
              {' '}· UNDP (2019). <em>Final Evaluation</em>, same project.
            </li>
          </ol>

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
