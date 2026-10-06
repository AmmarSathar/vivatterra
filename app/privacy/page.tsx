import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import PrivacyPolicy from '@/components/privacy/PrivacyPolicy';

export const metadata: Metadata = pageMetadata('privacy');

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
