import { SzkolyService, SzkolyStats, SzkolyFeature, SzkolyBenefit } from '../types';

export const szkolyServices: SzkolyService[] = [
  {
    id: 'haft',
    title: 'Haft',
    description: 'Wysokiej jakości hafty na odzieży szkolnej i akcesoriach',
    icon: '🧵',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Logo szkoły', 'Nazwa klasy', 'Imię ucznia', 'Eleganckie wykończenie'],
    href: '/znakowanie/haft'
  },
  {
    id: 'sitodruk',
    title: 'Sitodruk',
    description: 'Trwałe nadruki na koszulkach i strojach sportowych',
    icon: '🎨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Koszulki szkolne', 'Stroje sportowe', 'Torby szkolne', 'Duże nakłady'],
    href: '/znakowanie/sitodruk'
  },
  {
    id: 'dtf',
    title: 'DTF',
    description: 'Nowoczesna technologia DTF dla odzieży szkolnej',
    icon: '✨',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Wysoka jakość', 'Odporność na pranie', 'Żywe kolory', 'Szybka realizacja'],
    href: '/znakowanie/dtf'
  },
  {
    id: 'sublimacja',
    title: 'Sublimacja',
    description: 'Pełnokolorowe nadruki na gadżetach szkolnych',
    icon: '🌈',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Kubki szkolne', 'Plecaki', 'Przybory szkolne', 'Pełna paleta kolorów'],
    href: '/znakowanie/sublimacja'
  },
  {
    id: 'flex',
    title: 'Flex',
    description: 'Elastyczne folie flex idealne dla odzieży sportowej',
    icon: '🔄',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Stroje sportowe', 'Elastyczność', 'Wytrzymałość', 'Różne kolory'],
    href: '/znakowanie/flex'
  },
  {
    id: 'flock',
    title: 'Flock',
    description: 'Aksamitne wykończenie flock dla eleganckich strojów',
    icon: '🎯',
    color: 'text-primary',
    gradient: 'from-primary/10 to-primary/20',
    features: ['Elegancki wygląd', 'Miła w dotyku', 'Stroje galowe', 'Premium jakość'],
    href: '/znakowanie/flock'
  }
];

export const szkolyStats: SzkolyStats = {
  completedProjects: '3000+',
  satisfiedClients: '95%',
  averageDelivery: '3-7 dni',
  experienceYears: '12+ lat'
};

export const szkolyFeatures: SzkolyFeature[] = [
  {
    id: 'educational',
    title: 'Specjalizacja edukacyjna',
    description: 'Rozumiemy specyfikę potrzeb placówek edukacyjnych',
    icon: '🎓',
    color: 'text-primary'
  },
  {
    id: 'safety',
    title: 'Bezpieczne materiały',
    description: 'Tylko certyfikowane materiały bezpieczne dla dzieci',
    icon: '🛡️',
    color: 'text-primary'
  },
  {
    id: 'durability',
    title: 'Wytrzymałość',
    description: 'Produkty odporne na intensywne użytkowanie',
    icon: '💪',
    color: 'text-primary'
  },
  {
    id: 'group-pricing',
    title: 'Ceny grupowe',
    description: 'Atrakcyjne rabaty dla większych zamówień szkolnych',
    icon: '👥',
    color: 'text-primary'
  }
];

export const szkolyBenefits: SzkolyBenefit[] = [
  {
    id: 'free-design',
    title: 'Bezpłatne projekty graficzne',
    description: 'Każdy projekt dostosowany do herbu i kolorów szkoły',
    icon: '🎨',
    highlight: true
  },
  {
    id: 'group-discounts',
    title: 'Rabaty dla szkół',
    description: 'Specjalne ceny dla placówek edukacyjnych i dużych zamówień',
    icon: '🎒'
  },
  {
    id: 'specialist',
    title: 'Specjalista ds. szkół',
    description: 'Dedykowany opiekun znający specyfikę branży edukacyjnej',
    icon: '👨‍🏫',
    highlight: true
  },
  {
    id: 'fast-delivery',
    title: 'Terminowość',
    description: 'Realizacja przed rozpoczęciem roku szkolnego',
    icon: '⏰'
  },
  {
    id: 'safe-materials',
    title: 'Bezpieczne materiały',
    description: 'Certyfikowane materiały odpowiednie dla dzieci i młodzieży',
    icon: '🌱',
    highlight: true
  },
  {
    id: 'educational-support',
    title: 'Wsparcie edukacyjne',
    description: 'Pomoc w organizacji wydarzeń i konkursów szkolnych',
    icon: '📚'
  }
];

export const szkolyData = {
  services: szkolyServices,
  stats: szkolyStats,
  features: szkolyFeatures,
  benefits: szkolyBenefits
};