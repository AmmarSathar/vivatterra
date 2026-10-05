import type { Metadata } from 'next';
import { Lato, Poppins, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransitionOverlay from '@/components/TransitionOverlay';
import SmoothScroll from '@/components/SmoothScroll';
import SiteLoader from '@/components/SiteLoader';
import { LanguageProvider } from '@/lib/i18n';
import { OG_IMAGE, SITE_URL } from '@/lib/seo';
import en from '@/locales/en.json';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-source-serif-4',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'VivaTTerra',
  icons: {
    icon: '/favicon.svg',
  },
  title: {
    default: en['meta.home.title'],
    template: '%s | VivaTTerra',
  },
  description: en['meta.home.description'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'VivaTTerra',
    title: en['meta.home.title'],
    description: en['meta.home.description'],
    url: '/',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: en['meta.home.title'],
    description: en['meta.home.description'],
    images: [OG_IMAGE.url],
  },
  // Google Search Console HTML-tag verification: set
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token Search Console gives you.
  // Left unset (no tag rendered) until then.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// Organization + WebSite structured data: confirmed facts only (name, URL,
// logo, contact page). No address, phone, legal entity or social profiles.
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'VivaTTerra',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/vivaTTerra-logo.png`,
    description: en['meta.home.description'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${SITE_URL}/contact`,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'VivaTTerra',
    url: `${SITE_URL}/`,
    publisher: { '@id': `${SITE_URL}/#organization` },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${poppins.variable} ${sourceSerif4.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>
          <SiteLoader />
          <Header />
          <main>{children}</main>
          <Footer />
          <TransitionOverlay />
          <SmoothScroll />
        </LanguageProvider>
      </body>
    </html>
  );
}
