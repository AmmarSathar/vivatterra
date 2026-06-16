import type { Metadata } from 'next';
import ContactSection from '@/components/contact/ContactSection';

export const metadata: Metadata = {
  title: 'Contact — VivaTTerra',
  description:
    'Get in touch with VivaTTerra — questions about wild açaí, sourcing, or partnering on agroforestry products.',
};

export default function ContactPage() {
  return <ContactSection />;
}
