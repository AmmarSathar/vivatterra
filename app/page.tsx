import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import RealFood from '@/components/home/RealFood';
import SocialPurpose from '@/components/home/SocialPurpose';
import FourIndustries from '@/components/home/FourIndustries';
import ProductSpecs from '@/components/home/ProductSpecs';
import HomeCTA from '@/components/home/HomeCTA';

export const metadata: Metadata = {
  title: 'VivaTTerra — Freeze-Dried Wild Açaí from Living Agroforestry Systems',
  description:
    'VivaTTerra sources 100% natural freeze-dried Wild açaí powder from agroforestry systems in Latin America. Premium quality for cafés and wellness businesses — built on supply chains that make standing forests economically viable.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="content-panel">
        <RealFood />
        <SocialPurpose />
        <FourIndustries />
        <ProductSpecs />
        <HomeCTA />
      </div>
    </>
  );
}
