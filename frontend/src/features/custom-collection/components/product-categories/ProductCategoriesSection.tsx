'use client';

import { memo } from 'react';
import Image from 'next/image';
import { ProductCategoryItem } from './ProductCategoryItem';
import type { ProductCategoriesData } from '../../types';

interface ProductCategoriesSectionProps {
  data: ProductCategoriesData;
  className?: string;
}

export const ProductCategoriesSection = memo<ProductCategoriesSectionProps>(({ 
  data, 
  className = '' 
}) => {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Content - Header + All Categories */}
          <div className="lg:col-span-6 space-y-8">
            {/* Section Header */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {data.title}
              </h2>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                <span style={{ color: 'var(--primary)' }}>{data.subtitle}</span>
              </h2>
              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                Odkryj pełną gamę produktów, które możesz spersonalizować według swoich potrzeb i stylu.
              </p>
            </div>
            
            {/* All Categories - 2 column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {data.categories.map((category, index) => (
                <div 
                  key={category.id} 
                  className="opacity-0 animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 100}ms`, 
                    animationFillMode: 'forwards' 
                  }}
                >
                  <ProductCategoryItem category={category} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Image - Larger */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={data.image.src}
                  alt={data.image.alt}
                  width={500}
                  height={625}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  priority={data.image.priority}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ProductCategoriesSection.displayName = 'ProductCategoriesSection';