import Image from 'next/image';
import { memo } from 'react';

interface OptimizedCategoryImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

function OptimizedCategoryImage({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className = ''
}: OptimizedCategoryImageProps) {
  const generateBlurDataURL = (width: number, height: number) => {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
      </svg>`
    )}`;
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={generateBlurDataURL(400, 300)}
      quality={75}
      loading={priority ? 'eager' : 'lazy'}
      style={{ willChange: priority ? 'transform' : 'auto' }}
    />
  );
}

export default memo(OptimizedCategoryImage);