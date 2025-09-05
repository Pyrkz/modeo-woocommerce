import { RestauracjeService, RestauracjeStats, RestauracjeFeature, RestauracjeBenefit } from '../types';

export const restauracjeServices: RestauracjeService[] = [
  {
    id: 'haft',
    title: 'Haft',
    description: 'Eleganckie hafty na uniformach kuchennych i odzieży obsługi',
    icon: '🧵',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Logo restauracji', 'Imiona personelu', 'Eleganckie wykończenie', 'Trwałość przy praniu'],
    href: '/znakowanie/haft'
  },
  {
    id: 'sitodruk',
    title: 'Sitodruk',
    description: 'Kolorowe nadruki na fartuchach i tekstyliach restauracyjnych',
    icon: '🎨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Wielkoformatowe logo', 'Żywe kolory', 'Odporność na pranie', 'Duże nakłady'],
    href: '/znakowanie/sitodruk'
  },
  {
    id: 'dtf',
    title: 'DTF',
    description: 'Nowoczesna technologia DTF idealna dla uniformów gastronomicznych',
    icon: '✨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Wysoka rozdzielczość', 'Odporność na detergenty', 'Różne tkaniny', 'Szybka realizacja'],
    href: '/znakowanie/dtf'
  },
  {
    id: 'sublimacja',
    title: 'Sublimacja',
    description: 'Pełnokolorowe nadruki na gadżetach i akcesoriach restauracyjnych',
    icon: '🌈',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Fotorealizm', 'Pełna paleta kolorów', 'Kubki i talerze', 'Menu boards'],
    href: '/znakowanie/sublimacja'
  },
  {
    id: 'flex',
    title: 'Flex',
    description: 'Elastyczne folie flex na fartuchy i odzież roboczą',
    icon: '🔄',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Elastyczność', 'Różne kolory', 'Odporność na gotowanie', 'Szybkie oznakowanie'],
    href: '/znakowanie/flex'
  },
  {
    id: 'flock',
    title: 'Flock',
    description: 'Aksamitne wykończenie flock dla premium uniformów',
    icon: '🎯',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Aksamitna faktura', 'Eleganckie wykończenie', 'Premium look', 'Długotrwałość'],
    href: '/znakowanie/flock'
  }
];

export const restauracjeStats: RestauracjeStats = {
  completedProjects: '2500+',
  satisfiedClients: '97%',
  averageDelivery: '2-4 dni',
  experienceYears: '15+ lat'
};

export const restauracjeFeatures: RestauracjeFeature[] = [
  {
    id: 'professional',
    title: 'Profesjonalny wizerunek',
    description: 'Buduj rozpoznawalność restauracji dzięki spójnemu brandingowi',
    icon: '🍽️',
    color: 'text-primary'
  },
  {
    id: 'hygiene',
    title: 'Zgodność z HACCP',
    description: 'Materiały i nadruki bezpieczne dla gastronomii',
    icon: '🧼',
    color: 'text-primary'
  },
  {
    id: 'durability',
    title: 'Odporność na pranie',
    description: 'Nadruki wytrzymują częste pranie w wysokich temperaturach',
    icon: '🌡️',
    color: 'text-primary'
  },
  {
    id: 'team',
    title: 'Integracja zespołu',
    description: 'Ujednolicone stroje budują esprit de corps',
    icon: '👥',
    color: 'text-primary'
  }
];

export const restauracjeBenefits: RestauracjeBenefit[] = [
  {
    id: 'menu-design',
    title: 'Bezpłatne projekty menu',
    description: 'Każdy projekt dostosowany do charakteru Twojej restauracji',
    icon: '📋',
    highlight: true
  },
  {
    id: 'bulk-discounts',
    title: 'Rabaty dla zespołów',
    description: 'Atrakcyjne ceny przy oznakowaniu całej załogi',
    icon: '👨‍🍳'
  },
  {
    id: 'food-safe',
    title: 'Materiały food-safe',
    description: 'Bezpieczne dla kontaktu z żywnością zgodnie z przepisami',
    icon: '✅',
    highlight: true
  },
  {
    id: 'quick-delivery',
    title: 'Ekspresowa realizacja',
    description: 'Pilne zamówienia realizowane w 24-48h',
    icon: '⚡'
  },
  {
    id: 'wash-resistant',
    title: 'Odporność na pranie',
    description: 'Nadruki wytrzymują pranie przemysłowe do 95°C',
    icon: '🌡️',
    highlight: true
  },
  {
    id: 'consultation',
    title: 'Konsultacje branżowe',
    description: 'Doradztwo w zakresie brandingu gastronomicznego',
    icon: '💡'
  }
];

export const restauracjeData = {
  services: restauracjeServices,
  stats: restauracjeStats,
  features: restauracjeFeatures,
  benefits: restauracjeBenefits
};