'use client';

import React from 'react';
import Image from 'next/image';
import { DropshippingHeroData } from '../../types';

interface HeroImageProps {
  data: DropshippingHeroData;
}

export const HeroImage = React.memo(function HeroImage({ data }: HeroImageProps) {
  return (
    <div className="relative">
      {/* Main Image Container */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern/metallic-lines.svg')] opacity-20"></div>
        
        {/* T-shirt Image */}
        <div className="relative p-12 lg:p-16">
          <div className="relative aspect-square">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              className="object-contain"
              priority
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Brand Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
                <div className="text-lg font-bold">modeo.</div>
                <div className="text-sm font-medium">Twój</div>
                <div className="text-sm font-medium">partner</div>
                <div className="text-lg font-bold">B2B</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-red-100 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 bg-red-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
      </div>
      
      {/* Floating Badge */}
      <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12">
        <span className="text-sm font-bold">0% ryzyka</span>
      </div>
    </div>
  );
});