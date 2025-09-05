import { memo } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export const ProductImage = memo<ProductImageProps>(({ 
  src, 
  alt,
  width,
  height,
  className = '' 
}) => (
  <div className={`relative ${className}`}>
    <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-contain"
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  </div>
));

ProductImage.displayName = 'ProductImage';