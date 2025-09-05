'use client';

import { memo, useCallback } from 'react';
import { Product } from '@/types/product';
import { useResponsiveSlider } from '../hooks/useResponsiveSlider';
import { useTrueSmoothSlider } from '../hooks/useTrueSmoothSlider';
import { SLIDER_SETTINGS } from '../config/sliderConfig';
import SmoothSliderContainer from './SmoothSliderContainer';
import EnhancedSliderNavigation from './EnhancedSliderNavigation';
import SliderIndicators from './SliderIndicators';
import SectionHeader from './SectionHeader';

interface FeaturedProductsSectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  products: Product[];
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  showIndicators?: boolean;
  className?: string;
}

const FeaturedProductsSection = memo(({ 
  title,
  subtitle,
  badgeText,
  products, 
  onAddToCart,
  showIndicators = false,
  className = ''
}: FeaturedProductsSectionProps) => {
  const sliderConfig = useResponsiveSlider();
  const { 
    containerRef, 
    scrollToPrevious, 
    scrollToNext, 
    scrollToIndex,
    currentIndex,
    canScrollLeft,
    canScrollRight,
    isAnimating
  } = useTrueSmoothSlider({
    itemWidth: sliderConfig.itemWidth,
    gap: sliderConfig.gap,
    visibleItems: sliderConfig.visibleItems,
    totalItems: products.length,
    animationDuration: SLIDER_SETTINGS.smoothDuration
  });

  const handleAddToCart = useCallback(async (
    productId: number, 
    quantity = 1, 
    variation?: { [key: string]: string }
  ) => {
    if (onAddToCart) {
      try {
        await onAddToCart(productId, quantity, variation);
      } catch (error) {
        console.error('Failed to add product to cart:', error);
      }
    }
  }, [onAddToCart]);

  // Early return if no products
  if (!products || products.length === 0) {
    return null;
  }

  // Don't show navigation if all products fit in view
  const shouldShowNavigation = products.length > sliderConfig.visibleItems;

  return (
    <section className={`py-16 px-4 md:px-6 lg:px-8 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          badgeText={badgeText}
        />

        <div className="relative">
          <SmoothSliderContainer
            ref={containerRef}
            products={products}
            itemWidth={sliderConfig.itemWidth}
            gap={sliderConfig.gap}
            padding={sliderConfig.padding}
            containerPadding={sliderConfig.containerPadding}
            visibleItems={sliderConfig.visibleItems}
            onAddToCart={handleAddToCart}
          />
          
          {shouldShowNavigation && (
            <EnhancedSliderNavigation
              onPrevious={scrollToPrevious}
              onNext={scrollToNext}
              canScrollLeft={canScrollLeft}
              canScrollRight={canScrollRight}
              isScrolling={isAnimating}
              showMobileNavigation={!showIndicators || sliderConfig.isMobile}
            />
          )}

          {shouldShowNavigation && showIndicators && !sliderConfig.isMobile && (
            <SliderIndicators
              totalItems={products.length}
              visibleItems={sliderConfig.visibleItems}
              currentIndex={currentIndex}
              onIndicatorClick={scrollToIndex}
              className="mt-6"
            />
          )}
        </div>
      </div>
    </section>
  );
});

FeaturedProductsSection.displayName = 'FeaturedProductsSection';

export default FeaturedProductsSection;