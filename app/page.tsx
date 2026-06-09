import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import CardStack from '@/components/home/CardStack';
import RealFood from '@/components/home/RealFood';
import OurFirstProduct from '@/components/home/OurFirstProduct';
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
        <CardStack>
          <RealFood />
          <OurFirstProduct />
          <FourIndustries />
          <ProductSpecs />
          <HomeCTA />
        </CardStack>
      </div>
      <div className="home-bottom-glow" aria-hidden="true" />
    </>
  );
}
