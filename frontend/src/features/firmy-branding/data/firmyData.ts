import { FirmyService, FirmyStats, FirmyFeature, FirmyBenefit } from '../types';

export const firmyServices: FirmyService[] = [
  {
    id: 'haft',
    title: 'Haft',
    description: 'Wysokiej jakości hafty na odzieży i akcesoriach firmowych',
    icon: '🧵',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Logo firmy', 'Nazwa pracownika', 'Stanowisko', 'Eleganckie wykończenie'],
    href: '/znakowanie/haft'
  },
  {
    id: 'sitodruk',
    title: 'Sitodruk',
    description: 'Trwałe nadruki w żywych kolorach na materiałach promocyjnych',
    icon: '🎨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Wielkoformatowe nadruki', 'Żywe kolory', 'Trwałość', 'Duże nakłady'],
    href: '/znakowanie/sitodruk'
  },
  {
    id: 'dtf',
    title: 'DTF',
    description: 'Nowoczesna technologia DTF z wyjątkową trwałością',
    icon: '✨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Wysoka rozdzielczość', 'Trwałość', 'Różne materiały', 'Szybka realizacja'],
    href: '/znakowanie/dtf'
  },
  {
    id: 'sublimacja',
    title: 'Sublimacja',
    description: 'Pełnokolorowe nadruki fotorealistyczne na gadżetach',
    icon: '🌈',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Fotorealizm', 'Pełna paleta kolorów', 'Trwałość', 'Gadżety firmowe'],
    href: '/znakowanie/sublimacja'
  },
  {
    id: 'flex',
    title: 'Flex',
    description: 'Elastyczne folie flex dla profesjonalnych zastosowań',
    icon: '🔄',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Elastyczność', 'Różne kolory', 'Trwałość', 'Szybka realizacja'],
    href: '/znakowanie/flex'
  },
  {
    id: 'flock',
    title: 'Flock',
    description: 'Aksamitne wykończenie flock o unikalnej fakturze',
    icon: '🎯',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Aksamitna faktura', 'Eleganckie wykończenie', 'Trwałość', 'Premium look'],
    href: '/znakowanie/flock'
  }
];

export const firmyStats: FirmyStats = {
  completedProjects: '5000+',
  satisfiedClients: '98%',
  averageDelivery: '3-5 dni',
  experienceYears: '15+ lat'
};

export const firmyFeatures: FirmyFeature[] = [
  {
    id: 'professional',
    title: 'Profesjonalny wizerunek',
    description: 'Buduj silną markę firmy dzięki spójnemu brandingowi',
    icon: '💼',
    color: 'text-primary'
  },
  {
    id: 'quality',
    title: 'Najwyższa jakość',
    description: 'Premium materiały i precyzyjne wykonanie',
    icon: '⭐',
    color: 'text-primary'
  },
  {
    id: 'fast',
    title: 'Szybka realizacja',
    description: 'Ekspresowe terminy dla pilnych zamówień biznesowych',
    icon: '🚀',
    color: 'text-primary'
  },
  {
    id: 'support',
    title: 'Wsparcie eksperta',
    description: 'Dedykowany opiekun ds. klientów korporacyjnych',
    icon: '🎯',
    color: 'text-primary'
  }
];

export const firmyBenefits: FirmyBenefit[] = [
  {
    id: 'free-design',
    title: 'Bezpłatne projekty graficzne',
    description: 'Każdy projekt dostosowany do wytycznych CI/CD Twojej firmy',
    icon: '🎨',
    highlight: true
  },
  {
    id: 'bulk-discounts',
    title: 'Rabaty ilościowe',
    description: 'Atrakcyjne ceny dla większych zamówień korporacyjnych',
    icon: '💰'
  },
  {
    id: 'account-manager',
    title: 'Dedykowany opiekun',
    description: 'Osobisty kontakt z ekspertem ds. brandingu firmowego',
    icon: '👨‍💼',
    highlight: true
  },
  {
    id: 'fast-delivery',
    title: 'Ekspresowe terminy',
    description: 'Priorytetowa realizacja dla klientów biznesowych',
    icon: '⚡'
  },
  {
    id: 'quality-guarantee',
    title: 'Gwarancja jakości',
    description: '100% satysfakcji lub bezpłatna korekta zamówienia',
    icon: '✅',
    highlight: true
  },
  {
    id: 'invoicing',
    title: 'Faktury VAT',
    description: 'Pełna dokumentacja dla księgowości firmowej',
    icon: '📋'
  }
];

export const firmyData = {
  services: firmyServices,
  stats: firmyStats,
  features: firmyFeatures,
  benefits: firmyBenefits
};