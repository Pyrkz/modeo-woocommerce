export interface PrintingMethod {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  isPopular?: boolean;
}

export interface ZnakowanieSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
}

export interface HeroSliderProps {
  slides: PrintingMethod[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export interface ZnakowaniePageData {
  hero: {
    title: string;
    subtitle: string;
    badgeText: string;
    slides: PrintingMethod[];
  };
}

export * from './techniques';
export * from './solutions';