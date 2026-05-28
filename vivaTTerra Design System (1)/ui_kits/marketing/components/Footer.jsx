// Footer.jsx
function Footer() {
  const cols = [
    {
      h: 'The model',
      links: ['Theory of change', 'Value chains', 'Channel allocation', 'Infrastructure'],
    },
    {
      h: 'Producers',
      links: ['Carmen Pecha · Bolivia', 'Cooperative network', 'Sourcing standards', 'Become a partner'],
    },
    {
      h: 'For investors',
      links: ['Differentiation brief', 'Current stage', 'Capital allocation', 'Contact'],
    },
  ];
  return (
    <footer className="footer" id="about">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand">viva<span className="wm-tt">TT</span>erra</div>
            <p className="blurb">Building value-added agroforestry supply chains. Two systems — ecology and economy — grafted into one.</p>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <h5>{c.h}</h5>
              <ul>
                {c.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-meta">
          <span>© 2026 vivaTTerra · A social-purpose enterprise</span>
          <span>La Paz, Bolivia · Founded 2024</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
