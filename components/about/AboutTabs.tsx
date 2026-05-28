'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OurStory from './OurStory';
import WhyItMatters from './WhyItMatters';
import GetInTouch from './GetInTouch';

const TABS = [
  { id: 'story',   label: 'Our story' },
  { id: 'why',     label: 'Why it matters' },
  { id: 'contact', label: 'Get in touch' },
];

function TabsInner() {
  const params = useSearchParams();
  const router = useRouter();
  const active = params.get('tab') ?? 'story';

  function navigate(id: string) {
    router.push(`/about?tab=${id}`, { scroll: false });
  }

  return (
    <>
      <div className="tab-bar">
        <div className="container">
          <div className="tab-list" role="tablist" aria-label="About sections">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                className={`tab-btn${active === tab.id ? ' active' : ''}`}
                onClick={() => navigate(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {active === 'story'   && <OurStory />}
      {active === 'why'     && <WhyItMatters />}
      {active === 'contact' && <GetInTouch />}
    </>
  );
}

export default function AboutTabs() {
  return (
    <Suspense
      fallback={
        <div className="section">
          <div className="container" />
        </div>
      }
    >
      <TabsInner />
    </Suspense>
  );
}
