// Newsletter.jsx
function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [sent, setSent]   = React.useState(false);
  const submit = (e) => { e.preventDefault(); if (email.includes('@')) setSent(true); };

  return (
    <section className="section" id="journal">
      <div className="container">
        <div className="newsletter">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>The journal</div>
            <h3>Quarterly notes from the supply chain.</h3>
            <p>Three to four dispatches a year — producer updates, harvest notes, and the systems work behind them. No promotional copy.</p>
          </div>
          <form onSubmit={submit}>
            <div className="input-row">
              <input
                type="email"
                placeholder="you@cooperative.org"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSent(false); }}
              />
              <button className="btn btn-primary" type="submit">
                {sent ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </div>
            <div className="micro">
              {sent
                ? "You're on the list. Look for the next dispatch after the 2026 harvest."
                : "We send 3–4 dispatches a year. Unsubscribe any time."}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Newsletter });
