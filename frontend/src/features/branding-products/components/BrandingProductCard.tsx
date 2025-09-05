'use client';

import { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';
import { useLazyLoad } from '../hooks/useLazyLoad';
import { getOptimizedImageSrc } from '../utils/performance';
import { ContactModal } from './ContactModal';

interface BrandingProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  onInquiry?: (product: Product) => void;
  onScrollToForm?: () => void;
}

export const BrandingProductCard = memo<BrandingProductCardProps>(({ 
  product, 
  className = '',
  priority = false,
  onInquiry,
  onScrollToForm
}) => {
  const { ref, isIntersecting } = useLazyLoad<HTMLDivElement>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasImage = product.images?.[0]?.src;
  
  // Optimize image source - use higher quality (600px)
  const imageSrc = hasImage ? getOptimizedImageSrc(product.images[0].src, 600) : '';
  
  const handleInquiryClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (onInquiry) {
      onInquiry(product);
    } else if (onScrollToForm) {
      // Scroll to form if available
      onScrollToForm();
    } else {
      // Fallback: Open contact modal
      setIsModalOpen(true);
    }
  }, [product, onInquiry, onScrollToForm]);

  // Get price display - show actual prices when available
  const getPriceDisplay = () => {
    // Check if product has pricing info
    if (product.prices && product.prices.price && product.prices.price !== '0' && product.prices.price !== '') {
      const currencySymbol = product.prices.currency_symbol || 'zł';
      return formatPrice(product.prices.price, currencySymbol);
    }
    
    // If no price available, show "Cena na zapytanie"
    return 'Cena na zapytanie';
  };

  return (
    <article 
      ref={ref}
      className={`group bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${className}`}
    >
      {/* Product Image */}
      <Link href={`/sklep/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        {hasImage && (isIntersecting || priority) ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              priority={priority}
              onLoad={() => setImageLoaded(true)}
              loading={priority ? 'eager' : 'lazy'}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Branding Badge */}
        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-md font-medium">
          Do znakowania
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <Link href={`/sklep/${product.slug}`} className="block mb-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">{getPriceDisplay()}</span>
          <span className="text-xs block mt-1">Cena nie zawiera znakowania</span>
        </div>
        
        
        {/* Actions - improved mobile layout */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Link 
            href={`/sklep/${product.slug}`}
            className="flex-1 text-center bg-gray-100 text-gray-900 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Zobacz szczegóły
          </Link>
          
          <button
            onClick={handleInquiryClick}
            className="flex-1 text-center bg-primary text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Zapytaj o wycenę
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </article>
  );
});

BrandingProductCard.displayName = 'BrandingProductCard';