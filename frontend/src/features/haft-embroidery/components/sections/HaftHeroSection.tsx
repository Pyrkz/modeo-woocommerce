'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { haftHeroData } from '../../data/embroideryData';

interface HaftHeroSectionProps {
  onQuoteClick?: () => void;
  onGalleryClick?: () => void;
}

export const HaftHeroSection: React.FC<HaftHeroSectionProps> = ({
  onQuoteClick,
  onGalleryClick
}) => {
  const handleQuoteClick = useCallback(() => {
    onQuoteClick?.();
  }, [onQuoteClick]);

  const handleGalleryClick = useCallback(() => {
    onGalleryClick?.();
  }, [onGalleryClick]);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          
          {/* Content */}
          <div className="lg:order-1">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-4">
                ✨ Profesjonalny Haft Komputerowy
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {haftHeroData.title}
            </h1>
            
            <p className="text-lg md:text-xl text-primary font-medium mb-6">
              {haftHeroData.subtitle}
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg">
              {haftHeroData.description}
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {haftHeroData.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleQuoteClick}
              >
                Zamów Wycenę
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleGalleryClick}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Zobacz Realizacje
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>

          </div>

          {/* Image */}
          <div className="lg:order-2 mt-10 lg:mt-0">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-400 to-primary-600">
                <Image
                  src={haftHeroData.image.src}
                  alt={haftHeroData.image.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-[300px] md:h-[400px]"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
                
                {/* Quality Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800">Premium</span>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                <div className="flex items-center">
                  <div className="bg-primary-100 rounded-full p-2 mr-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">99%</p>
                    <p className="text-xs text-gray-600">Precyzja</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">24h</p>
                    <p className="text-xs text-gray-600">Szybko</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};