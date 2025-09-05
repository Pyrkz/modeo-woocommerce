'use client';

import { memo, forwardRef, useMemo, useEffect } from 'react';
import SliderProductItem from './SliderProductItem';
import { Product } from '@/types/product';
import { preloadProductImages } from '../utils/performance';

interface OptimizedSliderContainerProps {
  products: Product[];
  itemWidth: number;
  gap: number;
  containerPadding: number;
  visibleItems: number;
  currentIndex: number;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
}

const OptimizedSliderContainer = memo(forwardRef<HTMLDivElement, OptimizedSliderContainerProps>(({ 
  products, 
  itemWidth, 
  gap, 
  containerPadding,
  visibleItems,
  currentIndex,
  onAddToCart,
  className = '' 
}, ref) => {
  
  // Optimize rendering by determining visible range with buffer
  const { visibleProducts, startIndex } = useMemo(() => {
    const bufferSize = 2;
    const start = Math.max(0, currentIndex - bufferSize);
    const end = Math.min(products.length, currentIndex + visibleItems + bufferSize);
    
    return {
      visibleProducts: products.slice(start, end),
      startIndex: start
    };
  }, [products, currentIndex, visibleItems]);

  // Memoize container styles for performance
  const containerStyles = useMemo(() => ({
    gap: gap,
    paddingLeft: containerPadding,
    paddingRight: containerPadding,
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
    WebkitOverflowScrolling: 'touch' as const,
    scrollSnapType: 'x mandatory' as const,
  }), [gap, containerPadding]);

  const itemStyles = useMemo(() => ({
    scrollSnapAlign: 'start' as const,
    scrollSnapStop: 'always' as const,
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
        className="flex overflow-x-auto scrollbar-hide scroll-smooth smooth-slider-container"
        style={containerStyles}
      >
        {/* Render invisible spacer for proper positioning */}
        {startIndex > 0 && (
          <div 
            style={{ 
              minWidth: (itemWidth + gap) * startIndex,
              flexShrink: 0 
            }} 
          />
        )}
        
        {visibleProducts.map((product, index) => {
          const actualIndex = startIndex + index;
          const isVisible = actualIndex >= currentIndex && actualIndex < currentIndex + visibleItems;
          
          return (
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
                priority={isVisible && actualIndex < 4} // Prioritize first 4 visible items
              />
            </div>
          );
        })}
        
        {/* Render invisible spacer for remaining items */}
        {startIndex + visibleProducts.length < products.length && (
          <div 
            style={{ 
              minWidth: (itemWidth + gap) * (products.length - startIndex - visibleProducts.length),
              flexShrink: 0 
            }} 
          />
        )}
      </div>
    </div>
  );
}));

OptimizedSliderContainer.displayName = 'OptimizedSliderContainer';

export default OptimizedSliderContainer;