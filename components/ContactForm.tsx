'use client';

import { useState, type FormEvent } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  organization: string;
  role: string;
  email: string;
  howReceived: string;
  message: string;
}

const EMPTY: FormState = {
  firstName: '',
  lastName: '',
  organization: '',
  role: '',
  email: '',
  howReceived: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function set(key: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: POST to /api/contact and wire up an email service (Resend, Postmark, etc.)
    await new Promise(res => setTimeout(res, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success">
        <div className="eyebrow">Received</div>
        <h3>We will be in touch within two business days.</h3>
        <p>
          Thank you for your interest in vivaTTerra. We read every message and will follow
          up at {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-firstName">
            First name <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-firstName"
            type="text"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={e => set('firstName', e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cf-lastName">
            Last name <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-lastName"
            type="text"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={e => set('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-org">
          Organization / business name <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-org"
          type="text"
          required
          autoComplete="organization"
          value={form.organization}
          onChange={e => set('organization', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="cf-role">
          Role <span className="form-optional">(optional)</span>
        </label>
        <input
          id="cf-role"
          type="text"
          placeholder="e.g. Owner, Head Barista, Buyer"
          value={form.role}
          onChange={e => set('role', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="cf-email">
          Email address <span aria-hidden="true">*</span>
        </label>
        <input
          id="cf-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="cf-how">
          How did you receive our sample?{' '}
          <span className="form-optional">(optional)</span>
        </label>
        <select
          id="cf-how"
          value={form.howReceived}
          onChange={e => set('howReceived', e.target.value)}
        >
          <option value="">Select one</option>
          <option value="in-person">In person</option>
          <option value="by-mail">By mail</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cf-message">
          Anything you&apos;d like to tell us?{' '}
          <span className="form-optional">(optional)</span>
        </label>
        <textarea
          id="cf-message"
          rows={4}
          value={form.message}
          onChange={e => set('message', e.target.value)}
        />
      </div>

      <div className="form-footer">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Sending…' : <>Send, we&apos;ll be in touch <span className="btn-arrow">→</span></>}
        </button>
        <p className="form-note">
          We do not share your information. We will respond within 2 business days.
        </p>
      </div>
    </form>
  );
}
