'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch featured products from WooCommerce Store API
        const response = await fetch('http://localhost:8080/wp-json/wc/store/products?featured=true&per_page=8', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Błąd pobierania wyróżnionych produktów:', err);
        setError(err instanceof Error ? err.message : 'Nieznany błąd');
        
        // Fallback: fetch regular products if featured fails
        try {
          const fallbackResponse = await fetch('http://localhost:8080/wp-json/wc/store/products?per_page=8', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setProducts(fallbackData);
          }
        } catch (fallbackErr) {
          console.error('Błąd fallback produktów:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
    }
  };
};