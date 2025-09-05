'use client';

import React, { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import { CartItemImageProps } from '../../types/cart';

export const OptimizedCartItemImage = memo<CartItemImageProps>(({ 
  src, 
  alt, 
  className = "w-16 h-16 object-cover rounded-lg bg-gray-100" 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (!src || imageError) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <svg
          className="w-8 h-8 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="64px"
        className="object-cover"
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
});

OptimizedCartItemImage.displayName = 'OptimizedCartItemImage';