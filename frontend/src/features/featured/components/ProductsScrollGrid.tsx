'use client';

import { memo, forwardRef } from 'react';
import { ProductCard } from '@/features/shop/components/product';
import { Product } from '@/types/product';

interface ProductsScrollGridProps {
  products: Product[];
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
}

const ProductsScrollGrid = memo(forwardRef<HTMLDivElement, ProductsScrollGridProps>(({ 
  products, 
  onAddToCart, 
  className = '' 
}, ref) => (
  <div 
    ref={ref}
    className={`
      flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory 
      px-4 sm:px-6 lg:px-8 py-2
      product-slider smooth-scroll
      ${className}
    `}
    style={{ 
      scrollbarWidth: 'none', 
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
      scrollBehavior: 'smooth'
    }}
  >
    {products.map((product, index) => (
      <div 
        key={product.id} 
        className="
          flex-none snap-start
          w-[160px] sm:w-[180px] lg:w-[260px]
        "
      >
        <ProductCard
          product={product}
          onAddToCart={onAddToCart}
          priority={index < 4} // Prioritize first 4 products for loading
        />
      </div>
    ))}
  </div>
)));

ProductsScrollGrid.displayName = 'ProductsScrollGrid';

export default ProductsScrollGrid;