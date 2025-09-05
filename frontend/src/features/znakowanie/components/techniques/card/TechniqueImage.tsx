'use client';

import { memo } from 'react';
import Image from 'next/image';
import { shimmer, toBase64 } from '../../../utils/imageOptimization';

interface TechniqueImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const TechniqueImage = memo(({ 
  src, 
  alt, 
  priority = false 
}: TechniqueImageProps) => (
  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={90}
      className={`
        object-contain p-2 sm:p-4
        transition-all duration-500 ease-out
        group-hover:scale-110 group-hover:rotate-1
        will-change-transform
      `}
      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  </div>
));

TechniqueImage.displayName = 'TechniqueImage';

export default TechniqueImage;