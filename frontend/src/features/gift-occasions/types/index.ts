export interface GiftOccasion {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  href: string;
  category: 'holidays' | 'personal' | 'family';
}

export interface GiftOccasionsSectionData {
  title: string;
  subtitle: string;
  occasions: GiftOccasion[];
}

export interface GiftOccasionCardProps {
  occasion: GiftOccasion;
  className?: string;
  onClick?: () => void;
  isClickable?: boolean;
  showArrow?: boolean;
}

export interface GiftCategorySection {
  category: 'holidays' | 'personal' | 'family';
  title: string;
  occasions: GiftOccasion[];
}