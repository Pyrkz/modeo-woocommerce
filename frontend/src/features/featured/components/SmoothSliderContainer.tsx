'use client';

import { memo, forwardRef, useMemo, useEffect } from 'react';
import SliderProductItem from './SliderProductItem';
import { Product } from '@/types/product';
import { preloadProductImages } from '../utils/performance';

interface SmoothSliderContainerProps {
  products: Product[];
  itemWidth: number;
  gap: number;
  padding: number;
  containerPadding: number;
  visibleItems: number;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
}

const SmoothSliderContainer = memo(forwardRef<HTMLDivElement, SmoothSliderContainerProps>(({ 
  products, 
  itemWidth, 
  gap, 
  containerPadding,
  visibleItems,
  onAddToCart,
  className = '' 
}, ref) => {
  
  // Memoize container styles for performance
  const containerStyles = useMemo(() => ({
    gap: gap,
    paddingLeft: containerPadding,
    paddingRight: containerPadding,
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    WebkitOverflowScrolling: 'touch' as const,
    // Remove scroll-snap since we're using custom animation
    scrollBehavior: 'auto' as const,
  }), [gap, containerPadding]);

  const itemStyles = useMemo(() => ({
    // Remove scroll-snap properties since we're using custom animation
    flexShrink: 0,
  }), []);

  // Preload critical images for better performance
  useEffect(() => {
    if (products.length > 0) {
      preloadProductImages(products, Math.min(visibleItems, 4)).catch(
        error => console.warn('Failed to preload some images:', error)
      );
    }
  }, [products, visibleItems]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        ref={ref}
        className="flex overflow-x-auto scrollbar-hide smooth-slider-container"
        style={containerStyles}
      >
        {/* Render ALL products for smooth scrolling */}
        {products.map((product, index) => (
          <div
            key={product.id}
            className="slider-item"
            style={{
              ...itemStyles,
              minWidth: itemWidth,
              maxWidth: itemWidth,
            }}
          >
            <SliderProductItem
              product={product}
              itemWidth={itemWidth}
              onAddToCart={onAddToCart}
              priority={index < 4} // Prioritize first 4 items
            />
          </div>
        ))}
      </div>
    </div>
  );
}));

SmoothSliderContainer.displayName = 'SmoothSliderContainer';

export default SmoothSliderContainer;