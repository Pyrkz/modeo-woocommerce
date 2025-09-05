'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { config } from '@/lib/config';
import type { UrodzinyProduct } from '../types';
import { formatPrice, getDiscountPercentage } from '../utils/performance';
import { 
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  SparklesIcon 
} from '@heroicons/react/24/solid';

interface UrodzinyGiftsGridProps {
  products: UrodzinyProduct[];
  className?: string;
}

const UrodzinyProductCard = React.memo(({ product }: { product: UrodzinyProduct }) => {
  const discountPercentage = getDiscountPercentage(product.regular_price, product.sale_price);
  const productUrl = `/sklep/${product.slug}`;
  const imageUrl = product.images?.[0]?.src || '/placeholder-product.jpg';
  const altText = product.images?.[0]?.alt || product.name;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/cart/add-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          id: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        // Show success message or update cart count
        console.log('Produkt dodany do koszyka');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania do koszyka:', error);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{discountPercentage}%
        </div>
      )}

      {/* Featured Badge */}
      {product.featured && (
        <div className="absolute top-3 right-3 z-10 bg-yellow-500 text-white p-1.5 rounded-full">
          <StarIcon className="w-3 h-3" />
        </div>
      )}

      {/* Product Image */}
      <Link href={productUrl} className="block relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
            <SparklesIcon className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Categories */}
        {product.categories && product.categories.length > 0 && (
          <div className="mb-2">
            <span className="text-xs text-yellow-600 font-medium">
              {product.categories[0].name}
            </span>
          </div>
        )}

        {/* Product Name */}
        <Link href={productUrl}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        {product.short_description && (
          <p 
            className="text-xs text-gray-600 mb-3 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {product.on_sale ? (
              <>
                <span className="text-sm font-bold text-gray-900">
                  {formatPrice(product.sale_price)}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.regular_price)}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock status */}
          <div className="flex items-center">
            {product.in_stock ? (
              <span className="text-xs text-green-600 font-medium">Dostępny</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Brak</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link 
            href={productUrl}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-center"
          >
            Zobacz produkt
          </Link>
          
          {product.in_stock && (
            <button
              onClick={handleAddToCart}
              className="bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-700 p-2 rounded-lg transition-colors duration-200"
              title="Dodaj do koszyka"
            >
              <ShoppingCartIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Birthday-specific features */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <HeartIcon className="w-3 h-3 text-yellow-500" />
              Personalizacja
            </span>
            <span>🎂 Prezent urodzinowy</span>
          </div>
        </div>
      </div>
    </div>
  );
});

UrodzinyProductCard.displayName = 'UrodzinyProductCard';

const UrodzinyGiftsGrid = React.memo(({ products, className = '' }: UrodzinyGiftsGridProps) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {products.map(product => (
        <UrodzinyProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

UrodzinyGiftsGrid.displayName = 'UrodzinyGiftsGrid';

export default UrodzinyGiftsGrid;