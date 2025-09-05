import { MetadataRoute } from 'next';
import { giftOccasionsData } from '@/features/gift-occasions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nextmodeo.sitefy.pl';
  
  // Generate sitemap entries for all gift occasions
  const giftOccasionUrls = giftOccasionsData.map((occasion) => ({
    url: `${baseUrl}/na-prezent/${occasion.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/na-prezent`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...giftOccasionUrls,
  ];
}