import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://modeo.pl/regulamin',
      lastModified: new Date('2025-07-04'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}