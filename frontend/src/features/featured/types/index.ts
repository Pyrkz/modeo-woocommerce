import { Product } from '@/types/product';

export interface FeaturedProductsSectionProps {
  title: string;
  subtitle: string;
  badgeText: string;
  products: Product[];
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
}