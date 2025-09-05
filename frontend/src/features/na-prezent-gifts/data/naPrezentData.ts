import { NaPrezentCategory, NaPrezentStats, NaPrezentFeature } from '../types';

export const naPrezentCategories: NaPrezentCategory[] = [
  // Holidays - Red theme
  {
    id: 'boze-narodzenie',
    title: 'Boże Narodzenie',
    description: 'Świąteczne prezenty pełne ciepła',
    href: '/na-prezent/boze-narodzenie',
    iconPath: '🎄',
    category: 'holidays',
    count: 120,
    color: 'text-red-600',
    gradient: 'from-red-50 to-red-100'
  },
  {
    id: 'walentynki',
    title: 'Walentynki',
    description: 'Romantyczne prezenty dla ukochanych',
    href: '/na-prezent/walentynki',
    iconPath: '💝',
    category: 'holidays',
    count: 85,
    color: 'text-pink-600',
    gradient: 'from-pink-50 to-pink-100'
  },
  {
    id: 'dzien-kobiet',
    title: 'Dzień Kobiet',
    description: 'Wyjątkowe prezenty dla Pań',
    href: '/na-prezent/dzien-kobiet',
    iconPath: '🌸',
    category: 'holidays',
    count: 95,
    color: 'text-purple-600',
    gradient: 'from-purple-50 to-purple-100'
  },
  {
    id: 'mikolajki',
    title: 'Mikołajki',
    description: 'Magiczne prezenty dla najmłodszych',
    href: '/na-prezent/mikolajki',
    iconPath: '🎅',
    category: 'holidays',
    count: 75,
    color: 'text-red-600',
    gradient: 'from-red-50 to-red-100'
  },
  
  // Family - Green theme
  {
    id: 'dzien-mamy',
    title: 'Dzień Mamy',
    description: 'Serdeczne prezenty dla Mamy',
    href: '/na-prezent/dzien-mamy',
    iconPath: '👩',
    category: 'family',
    count: 110,
    color: 'text-green-600',
    gradient: 'from-green-50 to-green-100'
  },
  {
    id: 'dzien-taty',
    title: 'Dzień Taty',
    description: 'Wyjątkowe prezenty dla Taty',
    href: '/na-prezent/dzien-taty',
    iconPath: '👨',
    category: 'family',
    count: 98,
    color: 'text-blue-600',
    gradient: 'from-blue-50 to-blue-100'
  },
  {
    id: 'dzien-dziecka',
    title: 'Dzień Dziecka',
    description: 'Radosne prezenty dla dzieci',
    href: '/na-prezent/dzien-dziecka',
    iconPath: '🧸',
    category: 'family',
    count: 125,
    color: 'text-yellow-600',
    gradient: 'from-yellow-50 to-yellow-100'
  },
  {
    id: 'dzien-babci',
    title: 'Dzień Babci',
    description: 'Serdeczne prezenty dla Babci',
    href: '/na-prezent/dzien-babci',
    iconPath: '👵',
    category: 'family',
    count: 68,
    color: 'text-rose-600',
    gradient: 'from-rose-50 to-rose-100'
  },
  {
    id: 'dzien-dziadka',
    title: 'Dzień Dziadka',
    description: 'Wyjątkowe prezenty dla Dziadka',
    href: '/na-prezent/dzien-dziadka',
    iconPath: '👴',
    category: 'family',
    count: 72,
    color: 'text-amber-600',
    gradient: 'from-amber-50 to-amber-100'
  },

  // Personal - Blue theme
  {
    id: 'urodziny',
    title: 'Urodziny',
    description: 'Personalizowane prezenty urodzinowe',
    href: '/na-prezent/urodziny',
    iconPath: '🎂',
    category: 'personal',
    count: 200,
    color: 'text-indigo-600',
    gradient: 'from-indigo-50 to-indigo-100'
  },
  {
    id: 'slub',
    title: 'Ślub',
    description: 'Pamiątkowe prezenty ślubne',
    href: '/na-prezent/slub',
    iconPath: '💒',
    category: 'personal',
    count: 88,
    color: 'text-emerald-600',
    gradient: 'from-emerald-50 to-emerald-100'
  },
  {
    id: 'rocznice',
    title: 'Rocznice',
    description: 'Pamiątkowe prezenty na rocznicę',
    href: '/na-prezent/rocznice',
    iconPath: '💍',
    category: 'personal',
    count: 92,
    color: 'text-violet-600',
    gradient: 'from-violet-50 to-violet-100'
  },
  {
    id: 'parapetowka',
    title: 'Parapetówka',
    description: 'Praktyczne prezenty na nowe mieszkanie',
    href: '/na-prezent/parapetowka',
    iconPath: '🏠',
    category: 'personal',
    count: 65,
    color: 'text-cyan-600',
    gradient: 'from-cyan-50 to-cyan-100'
  }
];

export const naPrezentStats: NaPrezentStats = {
  totalCategories: naPrezentCategories.length,
  totalProducts: naPrezentCategories.reduce((sum, cat) => sum + (cat.count || 0), 0),
  avgDeliveryTime: '2-3 dni',
  satisfactionRate: '98%'
};

export const naPrezentFeatures: NaPrezentFeature[] = [
  {
    id: 'unique',
    title: 'Wyjątkowe',
    description: 'Każdy prezent jest unikalny i dostosowany do odbiorcy',
    icon: '❤️',
    color: 'text-red-600'
  },
  {
    id: 'quality',
    title: 'Wysokiej jakości',
    description: 'Używamy najlepszych materiałów i technik znakowania',
    icon: '✅',
    color: 'text-green-600'
  },
  {
    id: 'fast',
    title: 'Szybka realizacja',
    description: 'Sprawna realizacja zamówień, aby prezent dotarł na czas',
    icon: '⚡',
    color: 'text-blue-600'
  }
];

export const naPrezentData = {
  categories: naPrezentCategories,
  stats: naPrezentStats,
  features: naPrezentFeatures
};