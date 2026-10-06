import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Hero from '@/components/home/Hero';
import CardStack from '@/components/home/CardStack';
import RealFood from '@/components/home/RealFood';
import OurFirstProduct from '@/components/home/OurFirstProduct';
import WhyAcai from '@/components/home/WhyAcai';
import ProductSpecs from '@/components/home/ProductSpecs';
import RealFoodPower from '@/components/home/RealFoodPower';
import JoinCTA from '@/components/JoinCTA';

export const metadata: Metadata = pageMetadata('home');

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="content-panel">
        <CardStack>
          <RealFood />
          <OurFirstProduct />
          <WhyAcai />
        </CardStack>
      </div>
      <div className="home-bottom-glow" aria-hidden="true" />
      <ProductSpecs />
      <RealFoodPower />
      <JoinCTA />
    </>
  );
}
