'use client';

import { memo } from 'react';
import type { CustomCollectionData } from '../../types';
import { ProductShowcaseImage } from './ProductShowcaseImage';

interface ProductShowcaseProps {
  images: CustomCollectionData['images'];
}

const ProductShowcaseComponent = ({ images }: ProductShowcaseProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {/* Left - Main Product Image */}
      <div className="relative transform transition-transform duration-300 hover:-translate-y-1">
        <ProductShowcaseImage 
          image={images.mainImage}
          className="aspect-[4/5] lg:aspect-[3/4]"
        />
      </div>

      {/* Right - Additional Product Image */}
      <div className="relative transform transition-transform duration-300 hover:-translate-y-1">
        <ProductShowcaseImage 
          image={images.showcaseImages[1]}
          className="aspect-[4/5] lg:aspect-[3/4]"
        />
      </div>
    </div>
  );
};

export const ProductShowcase = memo(ProductShowcaseComponent);