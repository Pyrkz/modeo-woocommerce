'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  href?: string;
}

export const ProductImage = memo<ProductImageProps>(({ 
  src, 
  alt, 
  className = '',
  priority = false,
  href
}) => {
  const imageElement = (
    <div className={`relative aspect-square overflow-hidden bg-gray-50 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {imageElement}
      </Link>
    );
  }

  return imageElement;
});

ProductImage.displayName = 'ProductImage';