'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, ProductImage } from '@/types/product';

interface ProductImageGalleryProps {
  product: Product;
  selectedVariationId?: number | null;
}

export const ProductImageGallery = ({ product, selectedVariationId }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [variationImages, setVariationImages] = useState<ProductImage[] | null>(null);
  const [loadingVariation, setLoadingVariation] = useState(false);

  // Fetch variation images when variation changes
  useEffect(() => {
    const fetchVariationImages = async () => {
      if (!selectedVariationId || !product.variations) {
        setVariationImages(null);
        setSelectedImageIndex(0);
        return;
      }

      setLoadingVariation(true);

      try {
        // Find variation in product data
        const variation = product.variations.find(v => v.id === selectedVariationId);
        
        if (variation?.images && variation.images.length > 0) {
          setVariationImages(variation.images);
          setSelectedImageIndex(0);
        } else {
          setVariationImages(null);
        }
      } catch (error) {
        console.error('Error fetching variation images:', error);
        setVariationImages(null);
      } finally {
        setLoadingVariation(false);
      }
    };

    fetchVariationImages();
  }, [selectedVariationId, product.variations]);

  const currentImages = variationImages || product.images;
  const hasImages = currentImages && currentImages.length > 0;

  return (
    <div>
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4 relative">
        {loadingVariation && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {hasImages ? (
          <Image 
            src={currentImages[selectedImageIndex]?.src || currentImages[0].src} 
            alt={currentImages[selectedImageIndex]?.alt || product.name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Image Thumbnails */}
      {hasImages && currentImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {currentImages.map((image, index) => (
            <button
              key={`${selectedVariationId || 'product'}-${image.id}-${index}`}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-colors ${
                selectedImageIndex === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image 
                src={image.thumbnail || image.src} 
                alt={`Miniatura ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};