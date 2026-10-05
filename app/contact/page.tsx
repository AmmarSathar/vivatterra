import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ContactSection from '@/components/contact/ContactSection';

export const metadata: Metadata = pageMetadata('contact');

export default function ContactPage() {
  return <ContactSection />;
}
