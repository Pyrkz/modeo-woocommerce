import { getCustomCategoryIcon } from '@/utils/customCategoryIcons';
import { Category } from '../types';

export const SHOP_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Koszulki',
    slug: 'koszulki',
    icon: getCustomCategoryIcon('koszulki', 'koszulki'),
    href: '/sklep/koszulki'
  },
  {
    id: 2,
    name: 'Bluzy',
    slug: 'bluzy',
    icon: getCustomCategoryIcon('bluzy', 'bluzy'),
    href: '/sklep/bluzy'
  },
  {
    id: 3,
    name: 'Kurtki',
    slug: 'kurtki',
    icon: getCustomCategoryIcon('kurtki', 'kurtki'),
    href: '/sklep/kurtki'
  },
  {
    id: 4,
    name: 'Czapki',
    slug: 'czapki',
    icon: getCustomCategoryIcon('czapki', 'czapki'),
    href: '/sklep/czapki'
  },
  {
    id: 5,
    name: 'Softshelle',
    slug: 'softshelle',
    icon: getCustomCategoryIcon('softshelle', 'softshelle'),
    href: '/sklep/softshelle'
  },
  {
    id: 6,
    name: 'Polary',
    slug: 'polary',
    icon: getCustomCategoryIcon('polary', 'polary'),
    href: '/sklep/polary'
  },
  {
    id: 7,
    name: 'Plecaki i torby',
    slug: 'plecaki-torby',
    icon: getCustomCategoryIcon('plecaki i torby', 'plecaki-torby'),
    href: '/sklep/plecaki-torby'
  },
  {
    id: 8,
    name: 'Akcesoria',
    slug: 'akcesoria',
    icon: getCustomCategoryIcon('akcesoria', 'akcesoria'),
    href: '/sklep/akcesoria'
  },
  {
    id: 9,
    name: 'Ubrania sportowe',
    slug: 'ubrania-sportowe',
    icon: getCustomCategoryIcon('ubrania sportowe', 'ubrania-sportowe'),
    href: '/sklep/ubrania-sportowe'
  },
  {
    id: 10,
    name: 'Ubrania robocze',
    slug: 'ubrania-robocze',
    icon: getCustomCategoryIcon('ubrania robocze', 'ubrania-robocze'),
    href: '/sklep/ubrania-robocze'
  },
  {
    id: 11,
    name: 'Dom i ogród',
    slug: 'dom-ogrod',
    icon: getCustomCategoryIcon('dom i ogród', 'dom-ogrod'),
    href: '/sklep/dom-ogrod'
  },
  {
    id: 12,
    name: 'Okulary',
    slug: 'okulary',
    icon: getCustomCategoryIcon('okulary', 'okulary'),
    href: '/sklep/okulary'
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return SHOP_CATEGORIES.find(category => category.slug === slug);
};

export const getCategoryById = (id: number): Category | undefined => {
  return SHOP_CATEGORIES.find(category => category.id === id);
};