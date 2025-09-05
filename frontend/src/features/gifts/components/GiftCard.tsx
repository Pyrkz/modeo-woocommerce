'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GiftCardProps } from '../types';

const GiftCard = memo(({ gift, className = '' }: GiftCardProps) => {
  const sizeClasses = {
    small: 'h-64',
    medium: 'h-72',
    large: 'h-80',
    wide: 'h-64 w-full'
  };

  return (
    <Link
      href={gift.href}
      className={`group relative overflow-hidden rounded-2xl block transition-transform duration-300 hover:scale-[1.02] ${sizeClasses[gift.size]} ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={gift.imagePath}
          alt={gift.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        {/* Optional Badge */}
        {gift.badge && (
          <div className="absolute top-4 right-4 bg-black/80 text-white text-xs font-medium px-3 py-1 rounded-full">
            {gift.badge}
          </div>
        )}

        {/* Title */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 group-hover:bg-black/70 transition-colors duration-300">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {gift.title}
          </h3>
        </div>
      </div>
    </Link>
  );
});

GiftCard.displayName = 'GiftCard';

export default GiftCard;