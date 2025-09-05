import type { WhyChooseUsSection } from '../types';

export const whyChooseUsData: WhyChooseUsSection = {
  badge: 'Dlaczego setki firm nam ufa',
  title: 'Dlaczego warto',
  subtitle: 'wybrać nas?',
  description: 'Jesteśmy liderem w branży odzieży firmowej z wieloletnim doświadczeniem i tysiącami zadowolonych klientów',
  features: [
    {
      id: 'quality',
      icon: '🏆',
      title: 'Najwyższa jakość materiałów',
      description: 'Współpracujemy tylko z renomowanymi dostawcami. Nasze produkty spełniają europejskie standardy jakości i wytrzymałości.',
      iconBgColor: 'bg-orange-100'
    },
    {
      id: 'express',
      icon: '⚡',
      title: 'Ekspresowa realizacja',
      description: 'Standardowe zamówienia realizujemy w 48-72h. Pilne zlecenia nawet w 24h bez dodatkowych opłat.',
      iconBgColor: 'bg-yellow-100'
    },
    {
      id: 'design',
      icon: '🎨',
      title: 'Bezpłatne projekty graficzne',
      description: 'Nasz zespół grafików przygotuje dla Ciebie profesjonalne projekty. Zmiany i poprawki bez dodatkowych kosztów.',
      iconBgColor: 'bg-red-100'
    },
    {
      id: 'care',
      icon: '💎',
      title: 'Dedykowany opiekun',
      description: 'Każdy klient ma przypisanego opiekuna, który dba o wszystkie szczegóły zamówienia od A do Z.',
      iconBgColor: 'bg-blue-100'
    },
    {
      id: 'prices',
      icon: '💰',
      title: 'Konkurencyjne ceny hurtowe',
      description: 'Dzięki bezpośredniej współpracy z producentami oferujemy atrakcyjne ceny przy zachowaniu najwyższej jakości.',
      iconBgColor: 'bg-green-100'
    },
    {
      id: 'flexibility',
      icon: '🌐',
      title: 'Pełna elastyczność',
      description: 'Małe serie od 10 sztuk, duże zamówienia, różne rozmiary i kolory. Dostosowujemy się do Twoich potrzeb.',
      iconBgColor: 'bg-purple-100'
    }
  ],
  statisticsTitle: 'Nasze osiągnięcia w liczbach',
  statistics: [
    {
      id: 'companies',
      value: '500+',
      label: 'Zadowolonych firm',
      color: 'text-red-600'
    },
    {
      id: 'pieces',
      value: '50000+',
      label: 'Sztuk rocznie',
      color: 'text-red-600'
    },
    {
      id: 'time',
      value: '48h',
      label: 'Średni czas realizacji',
      color: 'text-red-600'
    },
    {
      id: 'satisfaction',
      value: '99%',
      label: 'Zadowolenia klientów',
      color: 'text-red-600'
    }
  ]
};