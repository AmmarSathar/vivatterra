import type { Metadata } from 'next';
import CarmenPechaStory from '@/components/carmen-pecha/CarmenPechaStory';

export const metadata: Metadata = {
  title: 'Why Carmen Pecha?',
  description:
    'Why VivaTTerra sources açaí from Carmen Pecha: land-use pressure in TCO Tacana 1, what forest conversion costs, and the forest-based economy açaí supports.',
};

export default function CarmenPechaPage() {
  return <CarmenPechaStory />;
}
