import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import OurMission from '@/components/about/OurMission';
import JoinCTA from '@/components/JoinCTA';

export const metadata: Metadata = pageMetadata('about');

export default function AboutPage() {
  return (
    <>
      <OurMission />
      <JoinCTA />
    </>
  );
}
