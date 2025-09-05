'use client';

import React, { useCallback } from 'react';
import { BrandingProductsByCategory } from '@/features/branding-products';
import { Product } from '@/types/product';

interface FirmyWooCommerceProductsProps {
  className?: string;
}

export const FirmyWooCommerceProducts = React.memo(({ 
  className = '' 
}: FirmyWooCommerceProductsProps) => {

  // Handle product inquiry - scroll to contact form
  const handleProductInquiry = useCallback((product: Product) => {
    console.log('Product inquiry clicked:', product.name); // Debug
    
    // Store product info in sessionStorage for the contact form
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inquiryProduct', JSON.stringify({
        id: product.id,
        name: product.name,
        slug: product.slug,
      }));
    }
    
    // Scroll to contact section
    const contactSection = document.getElementById('kontakt');
    if (contactSection) {
      console.log('Scrolling to contact form'); // Debug
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Contact section not found!'); // Debug
    }
  }, []);

  // Handle scroll to form (without product context)
  const handleScrollToForm = useCallback(() => {
    const contactSection = document.getElementById('kontakt');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Produkty do znakowania firmowego
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Wybierz kategorię produktów, które chcesz oznakować swoim logo. 
          Oferujemy profesjonalne znakowanie metodami haftu, nadruku i grawerowania.
        </p>
      </div>

      <BrandingProductsByCategory 
        onProductInquiry={handleProductInquiry}
        onScrollToForm={handleScrollToForm}
      />
    </div>
  );
});

FirmyWooCommerceProducts.displayName = 'FirmyWooCommerceProducts';