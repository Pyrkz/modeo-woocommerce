'use client';

import { memo, useMemo } from 'react';
import type { Product } from '../../types';
import { ShopApi } from '../../api/shop.api';
import { useProductColors } from '../../hooks/useProductColors';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { ProductActions } from './ProductActions';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number, quantity?: number, variation?: { [key: string]: string }) => Promise<void>;
  className?: string;
  priority?: boolean;
}

export const ProductCard = memo<ProductCardProps>(({ 
  product, 
  onAddToCart,
  className = '',
  priority = false
}) => {
  // Wzbogać produkt o kolory RGB z WordPress taksonomii
  const { enrichedProduct, loading: colorsLoading } = useProductColors(product);
  
  // Memoize expensive calculations
  const productData = useMemo(() => ({
    isVariable: ShopApi.isVariableProduct(enrichedProduct),
    hasImage: enrichedProduct.images?.[0]?.src,
    imageUrl: enrichedProduct.images?.[0]?.src || '',
    productName: enrichedProduct.name || 'Produkt',
    productSlug: enrichedProduct.slug || ''
  }), [enrichedProduct]);
  
  const { isVariable, hasImage, imageUrl, productName, productSlug } = productData;

  return (
    <article 
      className={`group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer ${className}`}
    >
      {/* Product Image with color variants overlay */}
      <div className="relative">
        {hasImage && (
          <ProductImage
            src={imageUrl}
            alt={productName}
            priority={priority}
            href={`/sklep/${productSlug}`}
          />
        )}
        
        {/* Color Variants positioned over bottom of image - only if has color variants */}
        <div className="absolute bottom-2 left-0 right-0">
          <ProductInfo
            name={productName}
            slug={productSlug}
            attributes={enrichedProduct.attributes}
            colorsLoading={colorsLoading}
            showColorVariants={true}
            onlyColorVariants={true}
          />
        </div>
      </div>
      
      {/* Product Info - name only */}
      <div className="px-4 mb-4">
        <ProductInfo
          name={productName}
          slug={productSlug}
          attributes={enrichedProduct.attributes}
          colorsLoading={colorsLoading}
          showColorVariants={false}
        />
      </div>
      
      {/* Product Actions */}
      <div className="px-4 pb-4">
        <ProductActions
          product={enrichedProduct}
          isVariable={isVariable}
          onAddToCart={onAddToCart}
        />
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';