import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import CarmenPechaStory from '@/components/carmen-pecha/CarmenPechaStory';

export const metadata: Metadata = pageMetadata('carmen');

export default function CarmenPechaPage() {
  return <CarmenPechaStory />;
}
