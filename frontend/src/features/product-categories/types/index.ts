export interface ProductCategory {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt: string;
  href: string;
  badge?: string;
  className?: string;
  priority?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export interface ProductCategoriesSection {
  title: string;
  subtitle: string;
  description?: string;
  categories: ProductCategory[];
}

export interface CategoryCardProps {
  category: ProductCategory;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export interface CategoryGridProps {
  categories: ProductCategory[];
  className?: string;
}

export interface ProductCategoriesSectionProps {
  data?: ProductCategoriesSection;
  className?: string;
}