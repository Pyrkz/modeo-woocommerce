'use client';

import React, { useCallback } from 'react';
import { BrandingProductsByCategory } from '@/features/branding-products';
import { Product } from '@/types/product';

interface EventyWooCommerceProductsProps {
  className?: string;
}

export const EventyWooCommerceProducts = React.memo(({ 
  className = '' 
}: EventyWooCommerceProductsProps) => {

  // Handle product inquiry - scroll to contact form
  const handleProductInquiry = useCallback((product: Product) => {
    console.log('Event product inquiry clicked:', product.name); // Debug
    
    // Store product info in sessionStorage for the contact form
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('inquiryProduct', JSON.stringify({
        id: product.id,
        name: product.name,
        slug: product.slug,
        context: 'eventy' // Add context for event-specific inquiries
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
          Produkty do znakowania eventowego
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Wybierz kategorię produktów idealnych dla Twojego eventu. 
          Oferujemy profesjonalne znakowanie gadżetów promocyjnych, odzieży eventowej i akcesoriów dla uczestników.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
          Specjalne ceny eventowe
        </h3>
        <p className="text-gray-700 text-center">
          Oferujemy atrakcyjne rabaty dla dużych nakładów eventowych i organizatorów stałych wydarzeń. 
          <span className="font-semibold"> Skontaktuj się z nami po indywidualną wycenę!</span>
        </p>
      </div>

      <BrandingProductsByCategory 
        onProductInquiry={handleProductInquiry}
        onScrollToForm={handleScrollToForm}
      />
    </div>
  );
});

EventyWooCommerceProducts.displayName = 'EventyWooCommerceProducts';