import { KlubyService, KlubyStats, KlubyFeature, KlubyBenefit } from '../types';

export const klubyServices: KlubyService[] = [
  {
    id: 'haft',
    title: 'Haft',
    description: 'Wysokiej jakości hafty na strojach sportowych i akcesoriach klubowych',
    icon: '🧵',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Logo klubu', 'Nazwiska zawodników', 'Numery na strojach', 'Eleganckie wykończenie'],
    href: '/znakowanie/haft'
  },
  {
    id: 'sitodruk',
    title: 'Sitodruk',
    description: 'Trwałe nadruki w żywych kolorach na strojach i akcesoriach sportowych',
    icon: '🎨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Wielkoformatowe nadruki', 'Żywe kolory klubowe', 'Trwałość', 'Duże nakłady'],
    href: '/znakowanie/sitodruk'
  },
  {
    id: 'dtf',
    title: 'DTF',
    description: 'Nowoczesna technologia DTF idealna dla strojów sportowych',
    icon: '✨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Wysoka rozdzielczość', 'Odporność na pranie', 'Różne materiały', 'Szybka realizacja'],
    href: '/znakowanie/dtf'
  },
  {
    id: 'sublimacja',
    title: 'Sublimacja',
    description: 'Pełnokolorowe nadruki fotorealistyczne na gadżetach klubowych',
    icon: '🌈',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Fotorealizm', 'Pełna paleta kolorów', 'Trwałość', 'Gadżety sportowe'],
    href: '/znakowanie/sublimacja'
  },
  {
    id: 'flex',
    title: 'Flex',
    description: 'Elastyczne folie flex idealne dla strojów sportowych',
    icon: '🔄',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Elastyczność', 'Kolory klubowe', 'Odporność', 'Szybka realizacja'],
    href: '/znakowanie/flex'
  },
  {
    id: 'flock',
    title: 'Flock',
    description: 'Aksamitne wykończenie flock o unikalnej fakturze sportowej',
    icon: '🎯',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Aksamitna faktura', 'Eleganckie wykończenie', 'Trwałość', 'Premium look'],
    href: '/znakowanie/flock'
  }
];

export const klubyStats: KlubyStats = {
  completedProjects: '3500+',
  satisfiedClients: '99%',
  averageDelivery: '5-7 dni',
  experienceYears: '15+ lat'
};

export const klubyFeatures: KlubyFeature[] = [
  {
    id: 'team-image',
    title: 'Profesjonalny wizerunek',
    description: 'Buduj silną markę klubu dzięki spójnemu brandingowi sportowemu',
    icon: '⚽',
    color: 'text-primary'
  },
  {
    id: 'sport-quality',
    title: 'Jakość sportowa',
    description: 'Materiały odporne na intensywne treningi i mecze',
    icon: '⭐',
    color: 'text-primary'
  },
  {
    id: 'fast-delivery',
    title: 'Szybka realizacja',
    description: 'Ekspresowe terminy przed wichtnymi meczami i turniejami',
    icon: '🚀',
    color: 'text-primary'
  },
  {
    id: 'sports-expert',
    title: 'Ekspert sportowy',
    description: 'Dedykowany opiekun ds. klubów i organizacji sportowych',
    icon: '🏆',
    color: 'text-primary'
  }
];

export const klubyBenefits: KlubyBenefit[] = [
  {
    id: 'free-design',
    title: 'Bezpłatne projekty graficzne',
    description: 'Każdy projekt dostosowany do kolorów i stylu Twojego klubu',
    icon: '🎨',
    highlight: true
  },
  {
    id: 'team-discounts',
    title: 'Rabaty zespołowe',
    description: 'Atrakcyjne ceny dla większych zamówień drużynowych',
    icon: '💰'
  },
  {
    id: 'sports-manager',
    title: 'Dedykowany opiekun',
    description: 'Osobisty kontakt z ekspertem ds. brandingu sportowego',
    icon: '👨‍💼',
    highlight: true
  },
  {
    id: 'express-delivery',
    title: 'Ekspresowe terminy',
    description: 'Priorytetowa realizacja przed wichtnymi wydarzeniami',
    icon: '⚡'
  },
  {
    id: 'sport-guarantee',
    title: 'Gwarancja sportowa',
    description: '100% satysfakcji lub bezpłatna korekta zamówienia',
    icon: '✅',
    highlight: true
  },
  {
    id: 'club-invoicing',
    title: 'Faktury VAT',
    description: 'Pełna dokumentacja dla księgowości klubowej',
    icon: '📋'
  }
];

export const klubyData = {
  services: klubyServices,
  stats: klubyStats,
  features: klubyFeatures,
  benefits: klubyBenefits
};