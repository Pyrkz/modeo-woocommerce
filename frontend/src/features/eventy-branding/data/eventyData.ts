import { EventyService, EventyStats, EventyFeature, EventyBenefit } from '../types';

export const eventyServices: EventyService[] = [
  {
    id: 'haft',
    title: 'Haft',
    description: 'Eleganckie hafty na odzieży eventowej i gadżetach promocyjnych',
    icon: '🧵',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Logo eventu', 'Nazwa wydarzenia', 'Identyfikatory', 'Gadżety eventowe'],
    href: '/znakowanie/haft'
  },
  {
    id: 'sitodruk',
    title: 'Sitodruk',
    description: 'Kolorowe nadruki na koszulkach eventowych i materiałach promocyjnych',
    icon: '🎨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Koszulki eventowe', 'Torby ekologiczne', 'Banery', 'Roll-upy'],
    href: '/znakowanie/sitodruk'
  },
  {
    id: 'dtf',
    title: 'DTF',
    description: 'Nowoczesna technologia DTF idealna dla gadżetów eventowych',
    icon: '✨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Gadżety promocyjne', 'Identyfikatory', 'Akcesoria eventowe', 'Szybka realizacja'],
    href: '/znakowanie/dtf'
  },
  {
    id: 'sublimacja',
    title: 'Sublimacja',
    description: 'Fotorealistyczne nadruki na kubkach i gadżetach pamiątkowych',
    icon: '🌈',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Kubki pamiątkowe', 'Gadżety eventowe', 'Fotorealizm', 'Personalizacja'],
    href: '/znakowanie/sublimacja'
  },
  {
    id: 'flex',
    title: 'Flex',
    description: 'Elastyczne folie flex dla odzieży organizatorów i wolontariuszy',
    icon: '🔄',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Odzież staff', 'Identyfikacja zespołu', 'Różne kolory', 'Trwałość'],
    href: '/znakowanie/flex'
  },
  {
    id: 'flock',
    title: 'Flock',
    description: 'Premium wykończenie flock dla reprezentacyjnych gadżetów eventowych',
    icon: '🎯',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Premium gadżety', 'Eleganckie wykończenie', 'VIP upominki', 'Prestiżowy wygląd'],
    href: '/znakowanie/flock'
  }
];

export const eventyStats: EventyStats = {
  completedProjects: '2500+',
  satisfiedClients: '96%',
  averageDelivery: '2-4 dni',
  experienceYears: '15+ lat'
};

export const eventyFeatures: EventyFeature[] = [
  {
    id: 'branding',
    title: 'Spójny branding eventu',
    description: 'Jednolita identyfikacja wizualna na wszystkich materiałach',
    icon: '🎯',
    color: 'text-primary'
  },
  {
    id: 'express',
    title: 'Ekspresowa realizacja',
    description: 'Szybkie terminy dla wydarzeń w trybie pilnym',
    icon: '⚡',
    color: 'text-primary'
  },
  {
    id: 'volume',
    title: 'Duże nakłady',
    description: 'Obsługa eventów dla setek i tysięcy uczestników',
    icon: '📈',
    color: 'text-primary'
  },
  {
    id: 'expert',
    title: 'Doradztwo eventowe',
    description: 'Pomoc w doborze optymalnych rozwiązań dla Twojego eventu',
    icon: '💡',
    color: 'text-primary'
  }
];

export const eventyBenefits: EventyBenefit[] = [
  {
    id: 'event-design',
    title: 'Bezpłatne projekty eventowe',
    description: 'Każdy projekt dostosowany do charakteru i tematyki wydarzenia',
    icon: '🎨',
    highlight: true
  },
  {
    id: 'volume-pricing',
    title: 'Ceny eventowe',
    description: 'Specjalne rabaty dla dużych nakładów eventowych',
    icon: '💰'
  },
  {
    id: 'event-manager',
    title: 'Dedykowany koordynator',
    description: 'Osobista opieka nad całym procesem realizacji eventu',
    icon: '👨‍💼',
    highlight: true
  },
  {
    id: 'express-delivery',
    title: 'Tryb ekspresowy',
    description: 'Realizacja w trybie pilnym dla eventów last-minute',
    icon: '🚀'
  },
  {
    id: 'quality-event',
    title: 'Gwarancja eventowa',
    description: '100% satysfakcji organizatora lub bezpłatna korekta',
    icon: '✅',
    highlight: true
  },
  {
    id: 'logistics',
    title: 'Wsparcie logistyczne',
    description: 'Pomoc w organizacji dostawy i dystrybucji na evencie',
    icon: '🚛'
  }
];

export const eventyData = {
  services: eventyServices,
  stats: eventyStats,
  features: eventyFeatures,
  benefits: eventyBenefits
};