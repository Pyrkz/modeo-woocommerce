export interface BusinessFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface BusinessStat {
  id: string;
  value: string;
  label: string;
  suffix: string;
}

export interface BusinessTestimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
}

export interface BusinessCTA {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

export interface BusinessHero {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    text: string;
    href: string;
  };
  backgroundImage: string;
}

export interface BusinessPageData {
  hero: BusinessHero;
  features: BusinessFeature[];
  stats: BusinessStat[];
  testimonials: BusinessTestimonial[];
  cta: BusinessCTA;
}