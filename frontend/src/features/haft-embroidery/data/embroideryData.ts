import { EmbroideryImage, EmbroideryCategory } from '../types';

// Placeholder embroidery showcase images - replace with your authentic embroidery work
export const embroideryImages: EmbroideryImage[] = [
  {
    id: 'haft-logo-1',
    src: '/embroidery/logo-embroidery-1.jpg',
    alt: 'Haft komputerowy logo firmowego na koszulce polo',
    title: 'Logo firmowe - haft na koszulce polo',
    category: 'logo',
    width: 800,
    height: 600
  },
  {
    id: 'haft-logo-2', 
    src: '/embroidery/logo-embroidery-2.jpg',
    alt: 'Elegancki haft logo na bluzie z kapturem',
    title: 'Logo na bluzie - precyzyjny haft',
    category: 'logo',
    width: 800,
    height: 600
  },
  {
    id: 'haft-text-1',
    src: '/embroidery/text-embroidery-1.jpg', 
    alt: 'Haft napisu na czapce z daszkiem',
    title: 'Napis na czapce - haft 3D',
    category: 'text',
    width: 800,
    height: 600
  },
  {
    id: 'haft-text-2',
    src: '/embroidery/text-embroidery-2.jpg',
    alt: 'Haft imienia na koszulce dziecięcej',
    title: 'Personalizacja - haft imienia',
    category: 'text', 
    width: 800,
    height: 600
  },
  {
    id: 'haft-decorative-1',
    src: '/embroidery/decorative-embroidery-1.jpg',
    alt: 'Dekoracyjny haft kwiatowy na bluzie damskiej',
    title: 'Wzór kwiatowy - haft dekoracyjny', 
    category: 'decorative',
    width: 800,
    height: 600
  },
  {
    id: 'haft-decorative-2',
    src: '/embroidery/decorative-embroidery-2.jpg',
    alt: 'Elegancki haft geometryczny na koszuli',
    title: 'Wzór geometryczny - nowoczesny haft',
    category: 'decorative',
    width: 800,
    height: 600
  },
  {
    id: 'haft-complex-1',
    src: '/embroidery/complex-embroidery-1.jpg',
    alt: 'Złożony haft herbu na mundurze',
    title: 'Herb - skomplikowany haft wielokolorowy',
    category: 'complex',
    width: 800,
    height: 600
  },
  {
    id: 'haft-complex-2',
    src: '/embroidery/complex-embroidery-2.jpg',
    alt: 'Artystyczny haft portretowy na kurtce',
    title: 'Portret - artystyczny haft komputerowy',
    category: 'complex',
    width: 800,
    height: 600
  }
];

export const embroideryCategories: EmbroideryCategory[] = [
  {
    id: 'logo',
    name: 'Logo i Branding',
    description: 'Profesjonalne hafty logo firmowych i brandingu korporacyjnego',
    images: embroideryImages.filter(img => img.category === 'logo')
  },
  {
    id: 'text', 
    name: 'Napisy i Personalizacja',
    description: 'Hafty napisów, imion i personalizacji na odzieży',
    images: embroideryImages.filter(img => img.category === 'text')
  },
  {
    id: 'decorative',
    name: 'Wzory Dekoracyjne', 
    description: 'Artystyczne hafty dekoracyjne i wzory ozdobne',
    images: embroideryImages.filter(img => img.category === 'decorative')
  },
  {
    id: 'complex',
    name: 'Projekty Złożone',
    description: 'Skomplikowane hafty wielokolorowe i artystyczne',
    images: embroideryImages.filter(img => img.category === 'complex')
  }
];

export const haftHeroData = {
  title: 'Profesjonalny Haft Komputerowy',
  subtitle: 'Precyzyjne i trwałe hafty na odzieży i akcesoriach',
  description: 'Specjalizujemy się w hafcie komputerowym najwyższej jakości. Oferujemy hafty logo, napisów i wzorów na wszystkich rodzajach tekstyliów. Nowoczesne maszyny hafciarskie gwarantują precyzję i powtarzalność.',
  features: [
    'Haft logo i brandingu firmowego',
    'Personalizacja imion i napisów', 
    'Wzory dekoracyjne i artystyczne',
    'Hafty na odzieży i akcesoriach',
    'Precyzja do 0,1mm',
    'Trwałość przez lata'
  ],
  image: {
    src: '/embroidery/hero-embroidery.jpg',
    alt: 'Profesjonalny haft komputerowy - maszyna hafciarska w akcji'
  }
};

export const haftBenefits = [
  {
    icon: '🎯',
    title: 'Precyzja i Jakość',
    description: 'Nowoczesne maszyny hafciarskie zapewniają precyzję do 0,1mm i powtarzalność każdego projektu'
  },
  {
    icon: '⚡',
    title: 'Szybka Realizacja', 
    description: 'Dzięki automatyzacji procesów realizujemy zamówienia w ekspresowym tempie'
  },
  {
    icon: '💎',
    title: 'Trwałość',
    description: 'Hafty wykonane wysokiej jakości nićmi zachowują kolory i kształt przez wiele lat'
  },
  {
    icon: '🎨', 
    title: 'Nieograniczone Możliwości',
    description: 'Od prostych napisów po złożone logo wielokolorowe - realizujemy każdy projekt'
  }
];