import type { Metadata } from 'next';
import AboutTabs from '@/components/about/AboutTabs';

export const metadata: Metadata = {
  title: 'Mission — VivaTTerra',
  description:
    'vivaTTerra is a social purpose enterprise building markets for locally processed agroforestry products. Learn why we source wild açaí from living ecosystems — and what that means for the land, the communities, and your business.',
};

export default function AboutPage() {
  return (
    <>
      <div className="about-hero section-deep">
        <div className="container-narrow">
          <div className="eyebrow eyebrow-on-deep">Mission</div>
          <h1 className="about-hero-h1">
            Treating impact as economic infrastructure, not a marketing overlay.
          </h1>
        </div>
      </div>

      <AboutTabs />
    </>
  );
}
