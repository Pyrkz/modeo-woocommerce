export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  href: string;
}

export interface CategoriesSectionProps {
  title: string;
  subtitle: string;
  categories: CategoryCard[];
}

export interface CategoryCardProps {
  category: CategoryCard;
  className?: string;
  onClick?: () => void;
  isClickable?: boolean;
  showArrow?: boolean;
}