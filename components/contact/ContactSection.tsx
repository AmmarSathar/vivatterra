'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useI18n, type MessageKey } from '@/lib/i18n';

type Inquiry = 'buyer' | 'origin' | 'strategic';
const INQUIRIES: Inquiry[] = ['buyer', 'origin', 'strategic'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server messages we know how to show in the visitor's language.
const SERVER_ERRORS: Record<string, MessageKey> = {
  'Name and email are required.': 'contact.err.required',
  'Please enter a valid email address.': 'contact.err.email',
};

export default function ContactSection() {
  const { lang, t, rich } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiry, setInquiry] = useState<Inquiry | ''>('');
  // Arriving from a "Register interest" link: ?inquiry=buyer preselects the pathway.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('inquiry');
    if (q && (INQUIRIES as string[]).includes(q)) setInquiry(q as Inquiry);
  }, []);

  const [errorKey, setErrorKey] = useState<MessageKey | ''>('');

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Entrance animation: title reveals line-by-line, fields stagger up, the
  // divider draws in, and the button rises. The whole page is above the fold,
  // so the timeline plays immediately on load.
  //
  // Robustness (the page must never load with invisible text):
  //  - Content is visible by default in CSS; JS only adds the entrance.
  //  - A cancel guard stops a StrictMode-orphaned import from building a second
  //    competing set of `from` tweens on the same elements.
  //  - A wall-clock safety pass force-reveals everything shortly after setup, so
  //    an interrupted entrance (remount, dropped frame) can't leave text hidden.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let kill: (() => void) | undefined;

    void Promise.all([import('gsap'), import('gsap/SplitText')]).then(
      ([{ gsap }, { SplitText }]) => {
        if (cancelled) return;
        gsap.registerPlugin(SplitText);

        // Run on real elapsed time, not frame count. Without this GSAP's default
        // lag-smoothing stretches the entrance when frames drop (slow device /
        // heavy load), so the timeline crawls and the masked text stays hidden
        // far longer than its nominal ~1.3s.
        gsap.ticker.lagSmoothing(0);

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            delay: 0.2,
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
              { yPercent: 115, duration: 0.7, stagger: 0.08 },
              position
            );
          };

          revealLines(section.querySelector<HTMLElement>('.contact-title'));

          tl.from(
            section.querySelectorAll('.contact-direct li'),
            { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.08 },
            '-=0.4'
          );

          tl.from(
            section.querySelectorAll('.gt-field'),
            { y: 26, autoAlpha: 0, duration: 0.5, stagger: 0.1 },
            '-=0.4'
          );
          tl.from(
            section.querySelectorAll('.gt-underline'),
            { scaleX: 0, transformOrigin: 'left center', duration: 0.5, stagger: 0.1 },
            '-=0.45'
          );
          tl.from(
            section.querySelector('.gt-divider'),
            { scaleX: 0, transformOrigin: 'left center', duration: 0.5 },
            '-=0.35'
          );
          tl.from(
            section.querySelector('.gt-submit'),
            { y: 20, autoAlpha: 0, duration: 0.5 },
            '-=0.35'
          );
        }, section);

        // Safety net: a fixed, early, wall-clock timer (not GSAP's ticker, which
        // can be throttled). The entrance finishes well under 2s, so by 2.2s any
        // element still hidden was interrupted (StrictMode remount, dropped
        // frame) — kill whatever is mid-flight and clear the hiding props so
        // nothing can be left invisible. A completed entrance is unaffected.
        const safetyTimer = window.setTimeout(() => {
          const els = section.querySelectorAll<HTMLElement>(
            '.contact-title, .gt-line, .contact-direct li, .gt-field, .gt-underline, .gt-divider, .gt-submit'
          );
          gsap.killTweensOf(els);
          gsap.set(els, { clearProps: 'transform,opacity,visibility' });
        }, 2200);

        kill = () => {
          window.clearTimeout(safetyTimer);
          ctx.revert();
        };
      }
    );

    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorKey('');
    if (!form.name.trim() || !form.email.trim()) {
      setErrorKey('contact.err.required');
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setErrorKey('contact.err.email');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, inquiryType: inquiry }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorKey(SERVER_ERRORS[data.error ?? ''] ?? 'contact.err.generic');
        return;
      }
      setSubmitted(true);
    } catch {
      setErrorKey('contact.err.generic');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact-page" ref={sectionRef}>
      <div className="contact-shell">
        <div className="contact-inner">
          <div className="contact-left">
            {/* Keyed so a language change swaps in a fresh, unsplit title node. */}
            <h1 className="contact-title" key={lang}>{t('contact.title')}</h1>
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
            <h2>{t('contact.successTitle')}</h2>
            <p>{rich('contact.successBody', { email: form.email || t('contact.successFallback') })}</p>
          </div>
        ) : (
          <form className="contact-form-gt" onSubmit={handleSubmit} noValidate>
            <div className="gt-audience" role="group" aria-label={t('contact.audience.aria')}>
              <p className="gt-audience-prompt">{t('contact.audience.prompt')}</p>
              <button
                type="button"
                className="gt-audience-primary"
                aria-pressed={inquiry === 'buyer'}
                onClick={() => setInquiry(inquiry === 'buyer' ? '' : 'buyer')}
              >
                <span className="gt-audience-kicker">{t('contact.audience.buyer.kicker')}</span>
                <span className="gt-audience-cta">
                  {t('contact.audience.buyer.cta')} <span aria-hidden="true">→</span>
                </span>
                <span className="gt-audience-desc">{t('contact.audience.buyer.desc')}</span>
              </button>
              <div className="gt-audience-secondary">
                {(['origin', 'strategic'] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    className="gt-audience-option"
                    aria-pressed={inquiry === k}
                    onClick={() => setInquiry(inquiry === k ? '' : k)}
                  >
                    <span className="gt-audience-title">{t(`contact.audience.${k}.title` as MessageKey)}</span>
                    <span className="gt-audience-desc">{t(`contact.audience.${k}.desc` as MessageKey)}</span>
                  </button>
                ))}
              </div>
              {inquiry && (
                <p className="gt-subject" role="status">
                  <span>{t('contact.subject.label')}:</span>{' '}
                  {t(`contact.subject.${inquiry}` as MessageKey)}
                </p>
              )}
            </div>

            <div className="contact-row">
              <div className="gt-field">
                <label htmlFor="gt-name">
                  {t('contact.name')} <span aria-hidden="true">✱</span>
                </label>
                <div className="gt-input-wrap">
                  <input
                    id="gt-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={t('contact.namePlaceholder')}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                  />
                  <span className="gt-underline" aria-hidden="true" />
                </div>
              </div>
              <div className="gt-field">
                <label htmlFor="gt-email">
                  {t('contact.email')} <span aria-hidden="true">✱</span>
                </label>
                <div className="gt-input-wrap">
                  <input
                    id="gt-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t('contact.emailPlaceholder')}
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                  <span className="gt-underline" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="gt-field">
              <label htmlFor="gt-message">{t('contact.message')}</label>
              <div className="gt-input-wrap">
                <textarea
                  id="gt-message"
                  rows={5}
                  placeholder={t('contact.messagePlaceholder')}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                />
                <span className="gt-underline" aria-hidden="true" />
              </div>
            </div>

            <hr className="gt-divider" />

            {errorKey && (
              <p className="gt-error" role="alert">
                {t(errorKey)}
              </p>
            )}

            <button type="submit" className="gt-submit" disabled={submitting}>
              {submitting ? t('contact.sending') : t('contact.submit')}
            </button>

            <p className="gt-privacy-note">
              {t('contact.privacy.before')}
              <Link href="/privacy">{t('contact.privacy.link')}</Link>
              {t('contact.privacy.after')}
            </p>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}
