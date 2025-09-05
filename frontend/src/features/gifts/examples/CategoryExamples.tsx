'use client';

import { SmartGiftsSection } from '../components/SmartGiftsSection';
import { GiftCard } from '../types';

// Example gift data with proper tagging
const EXAMPLE_GIFTS: GiftCard[] = [
  {
    id: 'walentynki-1',
    title: 'Walentynki',
    imagePath: '/images/gifts/valentines.jpg',
    imageAlt: 'Prezenty walentynkowe',
    href: '/sklep/walentynki',
    size: 'large',
    tags: ['love', 'romantic', 'valentine'],
    categoryId: 'walentynki'
  },
  {
    id: 'dzien-matki-1',
    title: 'Dzień Matki',
    imagePath: '/images/gifts/mothers-day.jpg',
    imageAlt: 'Prezenty na Dzień Matki',
    href: '/sklep/dzien-matki',
    size: 'medium',
    tags: ['mother', 'family', 'care'],
    categoryId: 'dzien-matki'
  },
  {
    id: 'dzien-taty-1',
    title: 'Dzień Taty',
    imagePath: '/images/gifts/fathers-day.jpg',
    imageAlt: 'Prezenty na Dzień Taty',
    href: '/sklep/dzien-taty',
    size: 'medium',
    tags: ['father', 'family', 'masculine'],
    categoryId: 'dzien-taty'
  },
  {
    id: 'zwierzaki-1',
    title: 'Zwierzaki',
    imagePath: '/images/gifts/animals.jpg',
    imageAlt: 'Prezenty ze zwierzakami',
    href: '/sklep/zwierzaki',
    size: 'small',
    tags: ['animals', 'pets', 'cute'],
    categoryId: 'zwierzaki'
  },
  {
    id: 'polo-1',
    title: 'Polo Shirt',
    imagePath: '/images/gifts/polo.jpg',
    imageAlt: 'Polo shirt prezenty',
    href: '/sklep/polo-shirt',
    size: 'wide',
    tags: ['clothing', 'classic', 'casual'],
    categoryId: 'polo-shirt'
  }
];

// Example: Mother's Day page - will automatically exclude animal-themed items
export const MothersDayGiftsSection = () => (
  <SmartGiftsSection
    title="Prezenty na Dzień Matki"
    subtitle="Wyjątkowe prezenty dla najważniejszej kobiety w Twoim życiu"
    badgeText="Dzień Matki"
    gifts={EXAMPLE_GIFTS}
    categoryId="dzien-matki" // This will trigger exclusion of 'zwierzaki'
    categoryFilter={{
      targetAudience: 'women',
      seasonality: 'seasonal'
    }}
    maxItems={6}
  />
);

// Example: Father's Day page - will automatically exclude animal-themed items
export const FathersDayGiftsSection = () => (
  <SmartGiftsSection
    title="Prezenty na Dzień Taty"
    subtitle="Praktyczne i stylowe prezenty dla taty"
    badgeText="Dzień Taty"
    gifts={EXAMPLE_GIFTS}
    categoryId="dzien-taty" // This will trigger exclusion of 'zwierzaki'
    categoryFilter={{
      targetAudience: 'men',
      seasonality: 'seasonal'
    }}
    maxItems={6}
  />
);

// Example: General gifts page - shows all categories
export const AllGiftsSection = () => (
  <SmartGiftsSection
    title="Wszystkie Spersonalizowane Prezenty"
    subtitle="Odkryj naszą pełną kolekcję spersonalizowanych prezentów"
    badgeText="Prezenty"
    gifts={EXAMPLE_GIFTS}
    categoryFilter={{
      targetAudience: 'universal'
    }}
  />
);

// Example: Animals-only section
export const AnimalsGiftsSection = () => (
  <SmartGiftsSection
    title="Prezenty ze Zwierzakami"
    subtitle="Urocze prezenty z motywami zwierząt"
    badgeText="Zwierzaki"
    gifts={EXAMPLE_GIFTS}
    categoryFilter={{
      includeCategories: ['zwierzaki']
    }}
  />
);