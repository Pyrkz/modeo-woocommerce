export interface GiftCategory {
  id: string;
  name: string;
  slug: string;
  priority: number;
  excludeFrom?: string[]; // List of other category IDs to exclude from
  seasonality?: 'year-round' | 'seasonal';
  targetAudience?: 'universal' | 'men' | 'women' | 'children';
  tags: string[];
}

export interface CategoryFilter {
  includeCategories?: string[];
  excludeCategories?: string[];
  targetAudience?: 'universal' | 'men' | 'women' | 'children';
  seasonality?: 'year-round' | 'seasonal';
}

export const GIFT_CATEGORIES: GiftCategory[] = [
  {
    id: 'walentynki',
    name: 'Walentynki',
    slug: 'walentynki',
    priority: 10,
    seasonality: 'seasonal',
    targetAudience: 'universal',
    tags: ['love', 'romantic', 'valentine'],
  },
  {
    id: 'dzien-matki',
    name: 'Dzień Matki',
    slug: 'dzien-matki',
    priority: 9,
    excludeFrom: ['zwierzaki'], // Exclude animal-themed items for Mother's Day
    seasonality: 'seasonal',
    targetAudience: 'women',
    tags: ['mother', 'family', 'care'],
  },
  {
    id: 'dzien-taty',
    name: 'Dzień Taty',
    slug: 'dzien-taty',
    priority: 9,
    excludeFrom: ['zwierzaki'], // Exclude animal-themed items for Father's Day
    seasonality: 'seasonal',
    targetAudience: 'men',
    tags: ['father', 'family', 'masculine'],
  },
  {
    id: 'dzien-dziecka',
    name: 'Dzień Dziecka',
    slug: 'dzien-dziecka',
    priority: 8,
    seasonality: 'seasonal',
    targetAudience: 'children',
    tags: ['children', 'fun', 'colorful'],
  },
  {
    id: 'zwierzaki',
    name: 'Zwierzaki',
    slug: 'zwierzaki',
    priority: 5,
    seasonality: 'year-round',
    targetAudience: 'universal',
    tags: ['animals', 'pets', 'cute'],
  },
  {
    id: 'polo-shirt',
    name: 'Polo Shirt',
    slug: 'polo-shirt',
    priority: 6,
    seasonality: 'year-round',
    targetAudience: 'universal',
    tags: ['clothing', 'classic', 'casual'],
  },
  {
    id: 'odziez-firmowa',
    name: 'Odzież Firmowa',
    slug: 'odziez-firmowa',
    priority: 7,
    seasonality: 'year-round',
    targetAudience: 'universal',
    tags: ['business', 'corporate', 'professional'],
  },
];

export const getCategoryById = (id: string): GiftCategory | undefined => {
  return GIFT_CATEGORIES.find(category => category.id === id);
};

export const filterCategories = (filter: CategoryFilter): GiftCategory[] => {
  return GIFT_CATEGORIES.filter(category => {
    // Include/exclude specific categories
    if (filter.includeCategories && !filter.includeCategories.includes(category.id)) {
      return false;
    }
    if (filter.excludeCategories && filter.excludeCategories.includes(category.id)) {
      return false;
    }
    
    // Filter by target audience
    if (filter.targetAudience && category.targetAudience !== 'universal' && category.targetAudience !== filter.targetAudience) {
      return false;
    }
    
    // Filter by seasonality
    if (filter.seasonality && category.seasonality !== filter.seasonality) {
      return false;
    }
    
    return true;
  }).sort((a, b) => b.priority - a.priority);
};