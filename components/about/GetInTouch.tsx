import ContactForm from '@/components/ContactForm';

export default function GetInTouch() {
  return (
    <div className="tab-content">
      <section className="section">
        <div className="container-narrow">
          <div className="section-header">
            <div className="eyebrow">Express interest</div>
            <h2>Tell us who you are.</h2>
            <p className="lead">
              Fill out the form below. It takes under a minute. We will follow up by email with product
              details, current pricing, and next steps. No commitment required at this stage.
            </p>
          </div>

          <ContactForm />

          <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--line)' }}>
            <h3>Prefer to reach us directly?</h3>
            <p>
              Write to us at{' '}
              <a href="mailto:hello@vivatterra.com">hello@vivatterra.com</a>. We are a small team and
              we read everything.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
