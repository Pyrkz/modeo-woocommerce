'use client';

import { memo } from 'react';
import Image from 'next/image';
import { PrintingMethod } from '../../types';
import { shimmer, toBase64 } from '../../utils/imageOptimization';

interface SliderSlideProps {
  method: PrintingMethod;
  isActive: boolean;
  className?: string;
}

const SliderSlide = memo(({ 
  method, 
  isActive, 
  className = '' 
}: SliderSlideProps) => (
  <div 
    className={`
      relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white shadow-lg
      transform transition-all duration-500 ease-out
      ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}
      ${className}
    `}
  >
    <div className="relative h-full">
      <Image
        src={method.image}
        alt={method.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={isActive}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 600))}`}
      />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <div className="space-y-2">
          {method.isPopular && (
            <div className="inline-block">
              <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                Popularne
              </span>
            </div>
          )}
          
          <h3 className="text-xl font-bold leading-tight">
            {method.name}
          </h3>
          
          <p className="text-sm opacity-90 line-clamp-2">
            {method.description}
          </p>
        </div>
      </div>
    </div>
  </div>
));

SliderSlide.displayName = 'SliderSlide';

export default SliderSlide;