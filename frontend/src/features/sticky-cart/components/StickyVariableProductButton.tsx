'use client';

import { memo, useCallback } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useStickyCartPerformance } from '../hooks/useStickyCartPerformance';
import { AnimatedStickyContainer } from './AnimatedStickyContainer';
import { AnimatedButton } from './AnimatedButton';
import { AnimationType } from '../types/animations';
import { CogIcon } from '@heroicons/react/24/outline';

interface StickyVariableProductButtonProps {
  product: Product;
  selectedVariationId: number | null;
  onScrollToVariantSelector: () => void;
  className?: string;
  animationType?: AnimationType;
}

/**
 * Sticky button for variable products that encourages users to select options
 * Shows when scrolled down and guides users back to variant selection
 */
export const StickyVariableProductButton = memo<StickyVariableProductButtonProps>(({
  product,
  selectedVariationId,
  onScrollToVariantSelector,
  className = '',
  animationType = 'elastic'
}) => {
  const { isVisible, isNearBottom } = useStickyCartPerformance({
    showThreshold: 400,
    hideThreshold: 150,
    debounceDelay: 8,
    autoHideDelay: 2500
  });

  const shouldShow = isVisible && !isNearBottom;

  const handleClick = useCallback(() => {
    onScrollToVariantSelector();
  }, [onScrollToVariantSelector]);

  // Always render, but control visibility through shouldShow
  // This allows for smooth entrance/exit animations

  return (
    <AnimatedStickyContainer
      isVisible={shouldShow}
      animationType={animationType}
      className={className}
      ariaLabel="Wybierz opcje produktu"
    >
      <div className="flex items-center justify-between gap-4">
          {/* Product Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              {product.images?.[0]?.thumbnail ? (
                <Image
                  src={product.images[0].thumbnail}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  sizes="48px"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
              {!selectedVariationId && (
                <p className="text-xs text-amber-600 mt-1">
                  Wybierz opcje, aby dodać do koszyka
                </p>
              )}
            </div>
          </div>

          {/* Action Button */}
          <AnimatedButton
            onClick={handleClick}
            variant="primary"
            ariaLabel="Przewiń do wyboru opcji"
          >
            <CogIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Wybierz opcje</span>
            <span className="sm:hidden">Wybierz</span>
          </AnimatedButton>
        </div>
    </AnimatedStickyContainer>
  );
});

StickyVariableProductButton.displayName = 'StickyVariableProductButton';