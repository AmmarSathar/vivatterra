'use client';

import { useReveal } from '@/hooks/useReveal';
import ContactForm from '@/components/ContactForm';

export default function HomeCTA() {
  const ref = useReveal();

  return (
    <section ref={ref} className="section" id="contact">
      <div className="container-narrow">
        <div className="section-header">
          <div className="eyebrow">Join the mission now</div>
          <h2>Real food holds real power.</h2>
          <p className="lead">This statement only holds if we give it real value.</p>
          <p className="cta-detail">
            You received our 40 g sample because we believe the product earns its place on its own
            merits. If it met your standards, we want to hear from you. Fill out the short form below:
            name, business, and email. We will follow up within two business days with pricing, lead
            times, and everything you need to make a decision.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
