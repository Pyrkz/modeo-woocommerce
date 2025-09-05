'use client';

import { memo } from 'react';
import Image from 'next/image';

interface PromoCardImageProps {
  imagePath: string;
  imageAlt: string;
  className?: string;
}

const PromoCardImage = memo(({ 
  imagePath, 
  imageAlt, 
  className = '' 
}: PromoCardImageProps) => (
  <div className={`absolute inset-0 ${className}`}>
    <Image
      src={imagePath}
      alt={imageAlt}
      fill
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={false}
      loading="lazy"
    />
    {/* Refined gradient overlay matching CategoryCard style */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20" />
  </div>
));

PromoCardImage.displayName = 'PromoCardImage';

export default PromoCardImage;