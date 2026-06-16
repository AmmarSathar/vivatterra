'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Entrance animation: title reveals line-by-line, fields stagger up, the
  // divider draws in, and the button rises.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let kill: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/SplitText')]).then(
      ([{ gsap }, { SplitText }]) => {
        gsap.registerPlugin(SplitText);
        void document.fonts.ready.then(() => {
          const ctx = gsap.context(() => {
            const tl = gsap.timeline({
              delay: 0.25,
              defaults: { ease: 'power3.out' },
            });

            const revealLines = (
              el: HTMLElement | null,
              position?: gsap.Position
            ) => {
              if (!el) return;
              const split = new SplitText(el, {
                type: 'lines',
                mask: 'lines',
                linesClass: 'gt-line',
              });
              tl.from(
                split.lines,
                { yPercent: 115, duration: 0.9, stagger: 0.1 },
                position
              );
            };

            revealLines(section.querySelector<HTMLElement>('.contact-intro'));
            revealLines(section.querySelector<HTMLElement>('.contact-title'), '-=0.6');

            tl.from(
              section.querySelectorAll('.contact-direct li'),
              { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
              '-=0.4'
            );

            tl.from(
              section.querySelectorAll('.gt-field'),
              { y: 26, autoAlpha: 0, duration: 0.7, stagger: 0.12 },
              '-=0.5'
            );
            tl.from(
              section.querySelectorAll('.gt-underline'),
              { scaleX: 0, transformOrigin: 'left center', duration: 0.6, stagger: 0.12 },
              '-=0.6'
            );
            tl.from(
              section.querySelector('.gt-divider'),
              { scaleX: 0, transformOrigin: 'left center', duration: 0.7 },
              '-=0.3'
            );
            tl.from(
              section.querySelector('.gt-submit'),
              { y: 20, autoAlpha: 0, duration: 0.6 },
              '-=0.4'
            );
          }, section);
          kill = () => ctx.revert();
        });
      }
    );

    return () => kill?.();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact-page" ref={sectionRef}>
      <div className="contact-shell">
        <p className="contact-intro">
          You received our 40&nbsp;g sample because we believe the product fits
          with your business. If you find this interesting and inspiring, we want
          to hear from you.
        </p>

        <div className="contact-inner">
          <div className="contact-left">
            <h1 className="contact-title">Go on, Give us a squeeze</h1>
            <ul className="contact-direct">
              <li>
                <a href="mailto:fabrizio@vivatterra.com">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  fabrizio@vivatterra.com
                </a>
              </li>
              <li>
                <a href="tel:+15144411977">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  514-441-1977
                </a>
              </li>
            </ul>
          </div>

        {submitted ? (
          <div className="gt-success">
            <h2>Thank you.</h2>
            <p>
              We received your message and will reply to{' '}
              <strong>{form.email || 'you'}</strong> within two business days.
            </p>
          </div>
        ) : (
          <form className="contact-form-gt" onSubmit={handleSubmit} noValidate>
            <div className="contact-row">
              <div className="gt-field">
                <label htmlFor="gt-name">
                  Name <span aria-hidden="true">✱</span>
                </label>
                <div className="gt-input-wrap">
                  <input
                    id="gt-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                  <span className="gt-underline" aria-hidden="true" />
                </div>
              </div>
              <div className="gt-field">
                <label htmlFor="gt-email">
                  Email <span aria-hidden="true">✱</span>
                </label>
                <div className="gt-input-wrap">
                  <input
                    id="gt-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@vivatterra.com"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                  <span className="gt-underline" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="gt-field">
              <label htmlFor="gt-message">Message</label>
              <div className="gt-input-wrap">
                <textarea
                  id="gt-message"
                  rows={5}
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                />
                <span className="gt-underline" aria-hidden="true" />
              </div>
            </div>

            <hr className="gt-divider" />

            {error && (
              <p className="gt-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="gt-submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Submit'}
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}
