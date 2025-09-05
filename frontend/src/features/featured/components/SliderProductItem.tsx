'use client';

import { memo } from 'react';
import { ProductCard } from '@/features/shop/components/product';
import { Product } from '@/types/product';

interface SliderProductItemProps {
  product: Product;
  itemWidth: number;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  priority?: boolean;
  className?: string;
}

const SliderProductItem = memo(({ 
  product, 
  itemWidth, 
  onAddToCart, 
  priority = false,
  className = '' 
}: SliderProductItemProps) => (
  <div 
    className={`flex-shrink-0 ${className}`}
    style={{ 
      width: itemWidth,
      minWidth: itemWidth,
      maxWidth: itemWidth
    }}
  >
    <ProductCard
      product={product}
      onAddToCart={onAddToCart}
      priority={priority}
    />
  </div>
));

SliderProductItem.displayName = 'SliderProductItem';

export default SliderProductItem;