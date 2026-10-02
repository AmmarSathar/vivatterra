import type { Metadata } from 'next';
import OurMission from '@/components/about/OurMission';
import JoinCTA from '@/components/JoinCTA';

export const metadata: Metadata = {
  title: {
    absolute: 'About VivaTTerra: Mission, Story & Why It Matters',
  },
  description:
    'VivaTTerra is a social purpose enterprise building markets for locally processed agroforestry products. Learn why we source Wild açaí from living ecosystems and what that means for the land, the communities, and your business.',
};

export default function AboutPage() {
  return (
    <>
      <OurMission />
      <JoinCTA />
    </>
  );
}
