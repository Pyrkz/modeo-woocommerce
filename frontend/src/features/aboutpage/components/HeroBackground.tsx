import Image from 'next/image';
import { HeroBackgroundProps } from '../types';

export function HeroBackground({ 
  src, 
  alt, 
  overlayOpacity = 0.4 
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center transform-gpu"
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        loading="eager"
      />
      {/* Gradient overlay - dark to light from left to right */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}