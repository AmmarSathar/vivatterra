'use client';

import { useRevealChildren } from '@/hooks/useRevealChildren';

const STEPS = [
  {
    num: '01',
    name: 'Harvest',
    desc: 'Wild açaí palms harvested by cooperative members in Carmen Pecha territory, TCO Tacana I.',
  },
  {
    num: '02',
    name: 'Pulp',
    desc: 'Fruit pulped locally — capturing value at the point of extraction, before it leaves the region.',
  },
  {
    num: '03',
    name: 'Freeze-dry',
    desc: 'Pulp freeze-dried in Ixiamas, Bolivia, removing 90% water content under vacuum sublimation.',
  },
  {
    num: '04',
    name: 'Pulverize',
    desc: 'Dried pulp pulverized into a shelf-stable, batch-consistent powder ready for global distribution.',
  },
];

export default function FourIndustries() {
  const chainRef = useRevealChildren<HTMLDivElement>(0.08);

  return (
    <section className="industries">
      <div className="container">
        <div className="industries-header">
          <div className="industries-eyebrow">Four local industries</div>
          <h2 className="industries-heading">
            Every bag traces through four steps, each one local.
          </h2>
        </div>

        <div ref={chainRef} className="industries-chain">
          {STEPS.map((step, i) => (
            <div key={step.num} className="industry-step">
              <div className="industry-num">{step.num}</div>
              <div className="industry-name">{step.name}</div>
              <p className="industry-desc">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="industry-arrow" aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
