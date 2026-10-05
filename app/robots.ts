import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The contact form endpoint is not a page; keep crawlers out of it.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
