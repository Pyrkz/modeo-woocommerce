import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../types';
import { formatPrice } from '@/utils/format';
import { ShoppingCartIcon, HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface OptimizedProductCardProps {
  product: Product;
  onAddToCart?: (productId: number, quantity?: number) => void;
  onToggleFavorite?: (productId: number) => void;
  onQuickView?: (product: Product) => void;
  isFavorite?: boolean;
  isAddingToCart?: boolean;
  className?: string;
  priority?: boolean; // For image loading priority
}

export const OptimizedProductCard = memo<OptimizedProductCardProps>(({
  product,
  onAddToCart,
  onToggleFavorite,
  onQuickView,
  isFavorite = false,
  isAddingToCart = false,
  className = '',
  priority = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAddingToCart && onAddToCart) {
      onAddToCart(product.id, 1);
    }
  }, [product.id, onAddToCart, isAddingToCart]);
  
  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  }, [product.id, onToggleFavorite]);
  
  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  }, [product, onQuickView]);

  const mainImage = product.images?.[0];
  const hasDiscount = product.prices?.sale_price && product.prices?.regular_price && product.prices.sale_price !== product.prices.regular_price;
  const discountPercent = hasDiscount 
    ? Math.round(((parseFloat(product.prices.regular_price) - parseFloat(product.prices.price)) / parseFloat(product.prices.regular_price)) * 100)
    : 0;

  return (
    <div className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {/* Product Link */}
      <Link href={`/produkt/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {hasDiscount && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                -{discountPercent}%
              </span>
            )}
            {product.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                Polecane
              </span>
            )}
            {!product.is_in_stock && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500 text-white">
                Niedostępne
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col gap-1">
              {onToggleFavorite && (
                <button
                  onClick={handleToggleFavorite}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  aria-label={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="w-4 h-4 text-red-500" />
                  ) : (
                    <HeartIcon className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
              
              {onQuickView && (
                <button
                  onClick={handleQuickView}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  aria-label="Szybki podgląd"
                >
                  <EyeIcon className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Product Image */}
          {mainImage && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <Image
                src={mainImage.src}
                alt={mainImage.alt || product.name}
                fill
                className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
                onLoadingComplete={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Hover overlay for add to cart */}
          {product.is_in_stock && onAddToCart && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Dodawanie...
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="w-4 h-4" />
                    Dodaj do koszyka
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          
          {/* SKU */}
          {product.sku && (
            <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
          )}
          
          {/* Price */}
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-semibold text-red-600">
                  {formatPrice(product.prices.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.prices.regular_price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-900">
                {formatPrice(product.prices.price)}
              </span>
            )}
          </div>
          
          {/* Stock status */}
          {!product.is_in_stock && (
            <p className="text-sm text-red-600 mt-1">Niedostępny</p>
          )}
        </div>
      </Link>
    </div>
  );
});

OptimizedProductCard.displayName = 'OptimizedProductCard';