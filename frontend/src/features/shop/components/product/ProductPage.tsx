'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { ProductImageGallery } from './ProductImageGallery';
import { ProductDetails } from './ProductDetails';
import { ProductDescription } from './ProductDescription';
import { ProductBreadcrumb } from './ProductBreadcrumb';
import { useEnrichedAttributes } from '../../hooks/useEnrichedAttributes';
import { OptimizedReviewSection } from '@/features/reviews/components/optimized';
import { RelatedProductsSection } from '@/features/related-products';
import { StickyAddToCartButton, StickyVariableProductButton } from '@/features/sticky-cart';
import { ProductCartProvider, useProductCartContext } from './ProductCartProvider';

interface ProductPageProps {
  product: Product;
}

// Inner component that has access to ProductCartContext
const ProductPageContent = ({ product }: { product: Product }) => {
  const { addToCart, loading: cartLoading } = useProductCartContext();
  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});

  const { enrichedProduct, loading: attributesLoading } = useEnrichedAttributes(product);

  // Scroll to top when product changes
  useEffect(() => {
    const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;
    
    if (supportsScrollBehavior) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
    
    // Additional scroll for mobile browsers
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [product.id]);

  const handleVariationSelected = (variationId: number | null, attributes: { [key: string]: string } = {}) => {
    setSelectedVariationId(variationId);
    setSelectedAttributes(attributes);
  };


  const handleStickyAddToCart = async () => {
    if (enrichedProduct.type === 'simple') {
      await addToCart({
        productId: enrichedProduct.id,
        quantity: 1
      });
    }
  };

  const scrollToVariantSelector = () => {
    const variantSelector = document.getElementById('variant-selector');
    if (variantSelector) {
      variantSelector.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      variantSelector.focus({ preventScroll: true });
    }
  };

  if (attributesLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie opcji produktu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-safe-area-inset-bottom">
      <ProductBreadcrumb product={enrichedProduct} />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <ProductImageGallery 
              product={enrichedProduct} 
              selectedVariationId={selectedVariationId}
            />

            <ProductDetails
              product={enrichedProduct}
              selectedVariationId={selectedVariationId}
              selectedAttributes={selectedAttributes}
              onVariationSelected={handleVariationSelected}
            />
          </div>

          <ProductDescription product={enrichedProduct} />

          {/* Product Reviews */}
          <div className="mt-16 border-t pt-16">
            <div className="max-w-4xl">
              <OptimizedReviewSection productId={enrichedProduct.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProductsSection
        currentProduct={enrichedProduct}
        className="mt-16"
      />

      {/* Sticky Add to Cart Button */}
      {enrichedProduct.type === 'variable' ? (
        <StickyVariableProductButton
          product={enrichedProduct}
          selectedVariationId={selectedVariationId}
          animationType="slide"
          onScrollToVariantSelector={scrollToVariantSelector}
        />
      ) : (
        <StickyAddToCartButton
          product={enrichedProduct}
          animationType="slide"
          onAddToCart={handleStickyAddToCart}
          isLoading={cartLoading}
        />
      )}
    </div>
  );
};

export const ProductPage = ({ product }: ProductPageProps) => {
  return (
    <ProductCartProvider product={product}>
      <ProductPageContent product={product} />
    </ProductCartProvider>
  );
};