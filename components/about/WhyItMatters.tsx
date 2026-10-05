import Link from 'next/link';

export default function WhyItMatters() {
  return (
    <div className="tab-content">
      <section className="section">
        <div className="container-narrow">
          <div className="callout-quote">
            <p>
              Biodiversity makes land rich, because the land holds ecological value. This transforms land
              from being a resource, up for extraction, to an ecosystem with a thriving economy.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <h2>Why açaí is the right starting point</h2>
          <p>
            Wild açaí (<em>Euterpe precatoria</em>) is native to the forests of the Amazon basin. It
            grows naturally under forest canopy and has been harvested by riverside communities for
            generations. When sourced from intact agroforestry systems, it is one of the few high-value
            products that is genuinely better when the forest is left standing: agronomically,
            economically, and ecologically.
          </p>
          <p>
            It is also a product with proven global demand, established use cases in cafés and wellness
            environments, and a quality differential legible to professional buyers. That combination,
            ecological alignment and commercial viability, is what makes it the right first product for
            vivaTTerra.
          </p>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container-narrow">
          <h2>What your purchase actually supports</h2>
          <p>
            Every 250 g bag of vivaTTerra wild açaí powder traces back through four distinct local
            industries in the producing region: harvesting, pulping, freeze-drying, and pulverizing.
          </p>
          <p>
            Each step captures value locally. Together, they constitute a regional economy built around
            a standing, living forest. That economic depth is what makes the system resilient. When local
            livelihoods depend on the forest intact, the forest stays intact.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <h2>This isn&rsquo;t an abstract argument.</h2>
          <p>
            In the same stretch of forest our açaí comes from, a different crop tells the other
            half of the story. Since 2016, a state-backed sugarcane operation has cleared thousands
            of hectares inside Tacana territory, pushing out the wild palm stands, açaí and
            majo among them, that families there had always depended on.<sup className="cite-ref">2</sup>{' '}
            Most communities took the deal because the pandemic cut off the tourism income they had
            been counting on instead. Independent reporting has found many are now carrying years of
            land-clearing debt against harvests that often don&rsquo;t cover even half their annual
            expenses.
          </p>
          <p>
            This is the choice agroforestry economics has to outcompete: not
            &ldquo;cane is bad,&rdquo; but &ldquo;cane is what&rsquo;s available when nothing else
            pays enough.&rdquo; That&rsquo;s the gap we exist to close.
          </p>
          <ol className="citations">
            <li>
              Gil, K. &amp; Acu&ntilde;a, R. (2021).{' '}
              <em>&ldquo;El cultivo de ca&ntilde;a de az&uacute;car deforesta territorio
              ind&iacute;gena en la Amazon&iacute;a boliviana.&rdquo;</em>{' '}
              openDemocracy / La Brava, with the Pulitzer Center&rsquo;s Rainforest Journalism Fund.
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container-narrow">
          <h2>What this means if you are a buyer</h2>
          <p>
            Sourcing from vivaTTerra does not require you to compromise on quality or justify a premium
            that your customers won&apos;t understand.
          </p>
          <p>
            What it does mean is that your purchasing decision is legible further up the chain, to
            producers managing land regeneratively, to communities whose livelihoods are tied to those
            systems, and to the land itself.
          </p>
          <p>
            We think that is worth something. We also think the product has to earn its place on its own
            merits. You received the sample for exactly that reason.
          </p>

          <div className="section-cta">
            <p className="lead" style={{ maxWidth: '48ch' }}>
              We are building something designed to last. Make real impact with us.
            </p>
            <Link href="/about?tab=contact" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>
              Get in touch <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
