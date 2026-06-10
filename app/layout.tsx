import type { Metadata } from 'next';
import { Lato, Poppins, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransitionOverlay from '@/components/TransitionOverlay';
import SmoothScroll from '@/components/SmoothScroll';

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
  icons: {
    icon: '/favicon.svg',
  },
  title: {
    default: 'VivaTTerra — Freeze-Dried Wild Açaí from Living Agroforestry Systems',
    template: '%s | VivaTTerra',
  },
  description:
    'VivaTTerra sources 100% natural freeze-dried Wild açaí powder from agroforestry systems in Latin America. Premium quality for cafés and wellness businesses — built on supply chains that make standing forests economically viable.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${poppins.variable} ${sourceSerif4.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <TransitionOverlay />
        <SmoothScroll />
      </body>
    </html>
  );
}
