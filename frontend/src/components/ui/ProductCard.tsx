// Legacy ProductCard - forwarding to new modular components
import { ProductCard as NewProductCard } from '@/features/shop/components/product';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
  priority?: boolean;
}

// Forward to new professional ProductCard implementation
const ProductCard = (props: ProductCardProps) => {
  return <NewProductCard {...props} />;
};

export default ProductCard;