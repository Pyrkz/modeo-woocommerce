'use client';

import { useState, useEffect } from 'react';
import { ShopApi } from '../api/shop.api';
import { Product } from '@/types/product';

interface PriceRange {
  min: number;
  max: number;
}

interface UsePriceRangeReturn {
  priceRange: PriceRange;
  loading: boolean;
  error: string | null;
}

export const usePriceRange = (): UsePriceRangeReturn => {
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 10000 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch products in smaller batches to avoid API limits
        const prices: number[] = [];
        let page = 1;
        let hasMore = true;
        const perPage = 50; // Safe limit for WooCommerce Store API
        
        while (hasMore && page <= 10) { // Max 10 pages (500 products) to avoid infinite loops
          const response = await ShopApi.fetchProducts({}, page, perPage);
          
          if (response.products.length === 0) {
            break;
          }

          // Extract prices from current batch
          response.products.forEach((product: Product) => {
            if (product.prices) {
              // WooCommerce Store API returns prices in cents (minor currency unit)
              // Convert to main currency units (PLN)
              const price = parseFloat(product.prices.price) / 100;
              if (!isNaN(price) && price > 0) {
                prices.push(price);
              }
              
              // Also check regular price if different
              const regularPrice = parseFloat(product.prices.regular_price) / 100;
              if (!isNaN(regularPrice) && regularPrice > 0 && regularPrice !== price) {
                prices.push(regularPrice);
              }
            }
          });

          // Check if there are more pages
          hasMore = response.hasMore && response.products.length === perPage;
          page++;
        }

        if (prices.length > 0) {
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          
          setPriceRange({ 
            min: Math.max(0, min), 
            max: max > min ? max : min + 100 // Smaller fallback increment
          });
        } else {
          // Fallback if no valid prices found
          setPriceRange({ min: 0, max: 1000 }); // Smaller fallback max
        }

      } catch (err) {
        console.error('Error fetching price range:', err);
        setError('Błąd pobierania zakresu cen');
        // Use fallback range on error
        setPriceRange({ min: 0, max: 10000 });
      } finally {
        setLoading(false);
      }
    };

    fetchPriceRange();
  }, []);

  return {
    priceRange,
    loading,
    error
  };
};