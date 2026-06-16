import type { Metadata } from 'next';
import OurMission from '@/components/about/OurMission';
import JoinCTA from '@/components/JoinCTA';

export const metadata: Metadata = {
  title: 'Our Mission — VivaTTerra',
  description:
    'vivaTTerra is a social-purpose enterprise building markets for locally processed agroforestry products. Our mission: make important natural land economically competitive — beginning with wild açaí from Bolivia.',
};

export default function AboutPage() {
  return (
    <>
      <OurMission />
      <JoinCTA />
    </>
  );
}
