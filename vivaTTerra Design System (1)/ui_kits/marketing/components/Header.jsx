// Header.jsx — sticky top navigation with wordmark
function Wordmark({ className = '' }) {
  return (
    <span className={`brand ${className}`}>viva<span className="wm-tt">TT</span>erra</span>
  );
}

function Header({ active = 'model', onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'model',     label: 'The model' },
    { id: 'producers', label: 'Producers' },
    { id: 'products',  label: 'Products' },
    { id: 'journal',   label: 'Journal' },
    { id: 'about',     label: 'About' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); onNav && onNav('home'); }}>
          viva<span className="wm-tt">TT</span>erra
        </a>
        <ul>
          {items.map(it => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={active === it.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); onNav && onNav(it.id); }}
              >{it.label}</a>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={() => onNav && onNav('contact')}>
          Get involved <span className="btn-arrow">→</span>
        </button>
      </div>
    </nav>
  );
}

Object.assign(window, { Header, Wordmark });
