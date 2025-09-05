export interface PromoCard {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  badge?: string;
}

export interface PromoCardProps {
  promo: PromoCard;
  className?: string;
}

export interface PromoSectionProps {
  title?: string;
  subtitle?: string;
  promos: PromoCard[];
  className?: string;
}

export interface PromoHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface PromoCardImageProps {
  imagePath: string;
  imageAlt: string;
  className?: string;
}

export interface PromoCardContentProps {
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export interface PromoCardCTAProps {
  ctaText: string;
  ctaHref: string;
  className?: string;
}