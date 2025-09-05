'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useStickyCartPerformance } from '../hooks/useStickyCartPerformance';
import { AnimatedStickyContainer } from './AnimatedStickyContainer';
import { AnimatedButton } from './AnimatedButton';
import { AnimationType } from '../types/animations';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface StickyAddToCartButtonProps {
  product: Product;
  onAddToCart: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  animationType?: AnimationType;
}

/**
 * Sticky Add to Cart button that appears when scrolling down and hides when scrolling up
 * Optimized for performance with memoization and smooth animations
 */
export const StickyAddToCartButton = memo<StickyAddToCartButtonProps>(({
  product,
  onAddToCart,
  isLoading = false,
  isDisabled = false,
  className = '',
  animationType = 'bounce'
}) => {
  const { isVisible, isNearBottom } = useStickyCartPerformance({
    showThreshold: 300,
    hideThreshold: 150,
    debounceDelay: 8,
    autoHideDelay: 2000
  });

  // Don't show for variable products or when near bottom (to avoid footer overlap)
  const shouldShow = isVisible && product.type !== 'variable' && !isNearBottom;

  // Always render, but control visibility through shouldShow
  // This allows for smooth entrance/exit animations

  return (
    <AnimatedStickyContainer
      isVisible={shouldShow}
      animationType={animationType}
      className={className}
      ariaLabel="Dodaj do koszyka - szybki dostęp"
    >
      <div className="flex items-center justify-between gap-4">
          {/* Product Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              {product.images?.[0]?.thumbnail ? (
                <Image
                  src={product.images[0].thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  width={48}
                  height={48}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 
                className="font-medium text-gray-900 text-sm truncate"
                dangerouslySetInnerHTML={{ __html: product.name }}
              />
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  {(parseInt(product.prices.price) / 100).toFixed(2)} {product.prices.currency_symbol}
                </span>
                {product.prices.regular_price !== product.prices.sale_price && (
                  <span className="text-sm text-gray-400 line-through">
                    {(parseInt(product.prices.regular_price) / 100).toFixed(2)} {product.prices.currency_symbol}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <AnimatedButton
            onClick={onAddToCart}
            disabled={isDisabled}
            isLoading={isLoading}
            variant="primary"
            ariaLabel={isLoading ? 'Dodawanie do koszyka...' : 'Dodaj do koszyka'}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span className="hidden sm:inline">Dodawanie...</span>
              </>
            ) : (
              <>
                <ShoppingBagIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Dodaj do koszyka</span>
                <span className="sm:hidden">Dodaj</span>
              </>
            )}
          </AnimatedButton>
        </div>
    </AnimatedStickyContainer>
  );
});

StickyAddToCartButton.displayName = 'StickyAddToCartButton';