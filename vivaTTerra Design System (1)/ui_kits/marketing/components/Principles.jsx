// Principles.jsx — three integrated functions (3.1, 3.2, 3.3 from the brief)
function PrincipleCard({ num, title, body, bullets }) {
  return (
    <article className="principle">
      <div className="num">{num}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      {bullets && (
        <ul>
          {bullets.map(b => <li key={b}>{b}</li>)}
        </ul>
      )}
    </article>
  );
}

function Principles() {
  return (
    <section className="section" id="model">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Section 3 · the model</div>
          <h2>Three integrated functions, designed to compound.</h2>
          <p>
            vivaTTerra is structured as a single operating model with three
            reinforcing functions. Each one only works because the other two exist.
          </p>
        </div>
        <div className="principles">
          <PrincipleCard
            num="3.1"
            title="Value-added supply chains at origin"
            body="Sourcing from ecologically rich agroforestry systems, with local processing that captures value before export."
            bullets={['Agroforestry-system sourcing', 'Local processing & transformation', 'Repeatable purchasing relationships']}
          />
          <PrincipleCard
            num="3.2"
            title="Intelligent market allocation"
            body="The same core ingredient routes across diversified channels — maximizing value per unit of production."
            bullets={['Foodservice and derived products', 'Packaged retail', 'Bulk & direct-to-consumer']}
          />
          <PrincipleCard
            num="3.3"
            title="Systems-driven infrastructure"
            body="Capital builds repeatable systems — quality, traceability, logistics — that future products inherit."
            bullets={['Quality assurance & food safety', 'Traceability & transparency', 'Logistics & export readiness']}
          />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Principles, PrincipleCard });
