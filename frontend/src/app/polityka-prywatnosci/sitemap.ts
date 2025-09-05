import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://modeo.pl/polityka-prywatnosci',
      lastModified: new Date('2024-09-02'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}