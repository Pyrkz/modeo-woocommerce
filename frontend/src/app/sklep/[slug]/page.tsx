'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Product } from '@/types/product';
import { ProductPage } from '@/features/shop/components/product/ProductPage';
import { config } from '@/lib/config';
import { transformProductImages } from '@/utils/imageUrl';

export default function ProductPageWrapper() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        let foundProduct;
        
        // First try: Fetch specific product by slug with variations
        try {
          const specificResponse = await fetch(
            `${config.getApiUrl()}/wp-json/wc/store/products?slug=${slug}&include_variations=true`,
            { credentials: 'include' }
          );
          if (specificResponse.ok) {
            const specificProducts = await specificResponse.json();
            foundProduct = specificProducts[0];
          }
        } catch {
          console.log('Specific product fetch failed, trying general approach');
        }
        
        // Second try: Fetch all products and find by slug
        if (!foundProduct) {
          const response = await fetch(`${config.getApiUrl()}/wp-json/wc/store/products`, {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const products = await response.json();
          foundProduct = products.find((p: Product) => p.slug === slug);
        }
        
        if (!foundProduct) {
          setError('Produkt nie został znaleziony');
          return;
        }
        
        // Transform image URLs for production environment
        const transformedProduct = transformProductImages(foundProduct);
        setProduct(transformedProduct);
      } catch (err) {
        console.error('Błąd pobierania produktu:', err);
        setError('Błąd ładowania produktu');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie produktu...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Produkt nie został znaleziony</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link 
              href="/sklep"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Wróć do sklepu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ProductPage product={product} />;
}