import type { Metadata } from 'next';
import en from '@/locales/en.json';

/**
 * Canonical site origin. Override with NEXT_PUBLIC_SITE_URL (no trailing slash)
 * if the production domain differs. Never a localhost or staging URL.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vivatterra.com').replace(/\/$/, '');

export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'VivaTTerra wordmark over a sunlit forest path',
};

type PageKey = 'home' | 'about' | 'contact' | 'carmen' | 'privacy';

/** Public, indexable routes. Used by the sitemap and by per-page canonicals. */
export const PAGES: Record<PageKey, string> = {
  home: '/',
  about: '/about',
  carmen: '/carmen-pecha',
  contact: '/contact',
  privacy: '/privacy',
};

/**
 * Server-rendered (English) metadata for a page. The text comes from the same
 * locale file the language switcher uses, so the two never drift apart. The
 * site swaps language client-side on a single URL, so there are no hreflang
 * alternates; <html lang> and the title/description follow the visitor's language.
 */
export function pageMetadata(key: PageKey): Metadata {
  const title = en[`meta.${key}.title` as keyof typeof en];
  const description = en[`meta.${key}.description` as keyof typeof en];
  const path = PAGES[key];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'VivaTTerra',
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
