'use client';

import { useReveal } from '@/hooks/useReveal';

export default function SocialPurpose() {
  const ref = useReveal();

  return (
    <section ref={ref} className="section section-deep">
      <div className="container-narrow">
        <div className="section-header on-deep">
          <div className="eyebrow eyebrow-on-deep">Social purpose</div>
          <h2>Be a part of real conservation.</h2>
          <p>
            vivaTTerra is a social purpose enterprise. It operates simply to fulfill its mission:
            scaling local, value-added agroforestry products in regions that are highly dominated by
            land-extracting activities.
          </p>
        </div>

        <p className="body-on-deep">
          We are not a charity. We are not a campaign. We are a supply chain — deliberately built to
          make standing forests more economically competitive than cleared ones.
        </p>

        <div className="transition-quote">
          <p>
            Biodiversity makes land rich, because the land holds ecological value. This transforms land
            from being a resource — up for extraction — to an ecosystem with a thriving economy.
          </p>
        </div>
      </div>
    </section>
  );
}
