'use client';

import { memo } from 'react';
import Image from 'next/image';
import type { ProductImage } from '../../types';
import { optimizeImageLoading } from '../../utils';

interface ProductShowcaseImageProps {
  image: ProductImage;
  className?: string;
}

const ProductShowcaseImageComponent = ({ 
  image, 
  className = '' 
}: ProductShowcaseImageProps) => {
  const imageConfig = image.priority 
    ? optimizeImageLoading.priority 
    : optimizeImageLoading.lazy;

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
        priority={image.priority}
        quality={imageConfig.quality}
        sizes={imageConfig.sizes}
        loading={image.priority ? 'eager' : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ=="
      />
    </div>
  );
};

export const ProductShowcaseImage = memo(ProductShowcaseImageComponent);