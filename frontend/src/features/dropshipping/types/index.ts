export interface DropshippingFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface DropshippingHeroData {
  badge: string;
  title: {
    part1: string;
    highlight: string;
    part2: string;
  };
  subtitle: string;
  description: string;
  highlightText: string;
  image: {
    src: string;
    alt: string;
  };
  features: DropshippingFeature[];
  benefits: string[];
}