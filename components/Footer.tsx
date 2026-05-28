import Link from 'next/link';

const COLS = [
  {
    heading: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Mission', href: '/about' },
      { label: 'Get in touch', href: '/about?tab=contact' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'hello@vivatterra.com', href: 'mailto:hello@vivatterra.com' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand">
              viva<span className="wm-tt">TT</span>erra
            </div>
            <p className="blurb">
              Let the land live. Building markets for agroforestry products from living ecosystems.
            </p>
          </div>
          {COLS.map(col => (
            <div key={col.heading}>
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-meta">
          <span>© 2026 VivaTTerra. All rights reserved.</span>
          <span>Carmen Pecha, Tacana I Territory · Bolivia</span>
        </div>
      </div>
    </footer>
  );
}
