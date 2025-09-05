export interface GiftCard {
  id: string;
  title: string;
  imagePath: string;
  imageAlt: string;
  href: string;
  badge?: string;
  size: 'small' | 'large' | 'medium' | 'wide';
  index?: number;
  tags?: string[]; // Tags for category filtering
  categoryId?: string; // Primary category ID
}

export interface GiftCardProps {
  gift: GiftCard;
  className?: string;
}

export interface PersonalizedGiftsSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  gifts: GiftCard[];
  className?: string;
}