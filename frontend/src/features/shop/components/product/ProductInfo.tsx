'use client';

import Link from 'next/link';
import { ProductAttribute } from '@/types/product';
// Simple color variants display
const ColorVariants = ({ attribute, loading = false, size = "md", className = "" }: {
  attribute: ProductAttribute;
  loading?: boolean;
  size?: "sm" | "md";
  className?: string;
}) => {
  // Don't show anything if not loading and has 0 or 1 colors
  if (!loading && (!attribute.terms || attribute.terms.length <= 1)) {
    return null;
  }
  
  // Show loading state
  if (loading) {
    return (
      <div className={`flex gap-1 ${className}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full bg-gray-200 animate-pulse ${size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex gap-1 ${className}`}>
      {attribute.terms.slice(0, 5).map((term) => (
        <div
          key={term.id}
          className={`rounded-full border border-gray-200 ${size === 'sm' ? 'w-4 h-4' : 'w-6 h-6'}`}
          style={{ backgroundColor: term.color || '#e5e7eb' }}
          title={term.name}
        />
      ))}
    </div>
  );
};

interface ProductInfoProps {
  name: string;
  slug: string;
  attributes?: ProductAttribute[];
  colorsLoading?: boolean;
  showColorVariants?: boolean;
  onlyColorVariants?: boolean;
}

export const ProductInfo = ({ 
  name,
  slug,
  attributes,
  colorsLoading = false,
  showColorVariants = true,
  onlyColorVariants = false
}: ProductInfoProps) => {
  // Safety check for required props
  if (!name || !slug) {
    console.warn('ProductInfo: Missing required props name or slug');
    return null;
  }

  // Find color attributes
  const colorAttribute = attributes?.find(attr => 
    attr.name?.toLowerCase().includes('kolor') || 
    attr.name?.toLowerCase().includes('color') ||
    attr.taxonomy === 'pa_kolor'
  );

  const hasColorVariants = colorAttribute && colorAttribute.terms && colorAttribute.terms.length > 1;

  // If onlyColorVariants is true, show only color variants
  if (onlyColorVariants) {
    return (
      <>
        {showColorVariants && hasColorVariants && (
          <div className="px-2">
            <ColorVariants
              attribute={colorAttribute}
              loading={colorsLoading}
              size="sm"
              className="justify-center"
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-2">
      {/* Product Name */}
      <Link 
        href={`/sklep/${slug}`}
        className="block"
      >
        <h3 
          className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2"
          dangerouslySetInnerHTML={{ __html: name }}
        />
      </Link>

      {/* Color Variants */}
      {showColorVariants && hasColorVariants && !colorsLoading && (
        <ColorVariants
          attribute={colorAttribute}
          loading={colorsLoading}
          size="sm"
        />
      )}
      
      {/* Loading state for colors */}
      {colorsLoading && showColorVariants && (
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
};