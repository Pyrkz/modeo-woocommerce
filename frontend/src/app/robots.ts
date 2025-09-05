import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/wp-admin/', '/admin/'],
    },
    sitemap: 'https://nextmodeo.sitefy.pl/sitemap.xml',
  };
}