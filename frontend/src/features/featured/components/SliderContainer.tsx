'use client';

import { memo, forwardRef } from 'react';
import SliderProductItem from './SliderProductItem';
import { Product } from '@/types/product';

interface SliderContainerProps {
  products: Product[];
  itemWidth: number;
  gap: number;
  padding: number;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
}

const SliderContainer = memo(forwardRef<HTMLDivElement, SliderContainerProps>(({ 
  products, 
  itemWidth, 
  gap, 
  padding, 
  onAddToCart,
  className = '' 
}, ref) => (
  <div 
    ref={ref}
    className={`
      flex overflow-x-auto scrollbar-hide
      ${className}
    `}
    style={{
      gap: gap,
      paddingLeft: padding,
      paddingRight: padding,
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    {products.map((product, index) => (
      <SliderProductItem
        key={product.id}
        product={product}
        itemWidth={itemWidth}
        onAddToCart={onAddToCart}
        priority={index < 4}
      />
    ))}
  </div>
)));

SliderContainer.displayName = 'SliderContainer';

export default SliderContainer;