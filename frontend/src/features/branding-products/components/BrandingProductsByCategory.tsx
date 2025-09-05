'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { CategoriesApi } from '@/features/shop/api/categories.api';
import { ShopApi } from '@/features/shop/api/shop.api';
import { BrandingProductGrid } from './BrandingProductGrid';
import { Product } from '@/types/product';
import type { Category } from '@/types/category';
import { BrandingProductsCache, measurePerformance } from '../utils/performance';

interface BrandingProductsByCategoryProps {
  className?: string;
  onProductInquiry?: (product: Product) => void;
  onScrollToForm?: () => void;
}

// Product categories for branding
const BRANDING_CATEGORIES = [
  { slug: 'koszulki', name: 'Koszulki', icon: '👕' },
  { slug: 'bluzy', name: 'Bluzy', icon: '🧥' },
  { slug: 'kurtki', name: 'Kurtki', icon: '🧥' },
  { slug: 'czapki', name: 'Czapki', icon: '🧢' },
  { slug: 'softshelle', name: 'Softshelle', icon: '🧥' },
  { slug: 'polary', name: 'Polary', icon: '🧥' },
  { slug: 'plecaki-i-torby', name: 'Plecaki i torby', icon: '🎒' },
  { slug: 'akcesoria', name: 'Akcesoria', icon: '🎁' },
  { slug: 'ubrania-sportowe', name: 'Ubrania sportowe', icon: '🏃' },
  { slug: 'ubrania-robocze', name: 'Ubrania robocze', icon: '👷' },
];

// Get cache instance
const cache = BrandingProductsCache.getInstance();

export const BrandingProductsByCategory = memo(({
  className = '',
  onProductInquiry,
  onScrollToForm,
}: BrandingProductsByCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [allFetchedProducts, setAllFetchedProducts] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // Prevent flash effects
  const PRODUCTS_PER_PAGE = 20;
  // const API_PRODUCTS_PER_PAGE = 40; // Removed - Fetch more from API to account for filtering

  // Fetch available categories from WooCommerce - STABLE VERSION
  const fetchAvailableCategories = useCallback(async () => {
    const perf = measurePerformance('fetchAvailableCategories');
    
    // Check cache first for categories
    const cachedData = cache.get<{categories: Category[], allCategories: Category[]}>('categories_data');
    if (cachedData) {
      setAvailableCategories(cachedData.categories);
      setAllCategories(cachedData.allCategories);
      perf.end();
      return;
    }

    try {
      const { categories } = await CategoriesApi.fetchCategories({
        hideEmpty: false,
        perPage: 100,
      });

      // Find parent "do nadruku" category (try multiple variations)
      const doNadrukuCategory = categories.find(
        cat => {
          const slug = cat.slug.toLowerCase();
          const name = cat.name.toLowerCase();
          return slug === 'do-nadruku' || 
                 slug === 'do nadruku' || 
                 slug === 'nadruk' ||
                 slug === 'nadruki' ||
                 name.includes('nadruk') ||
                 name.includes('znakowanie') ||
                 name === 'do nadruku';
        }
      );

      let filteredCategories: Category[] = [];
      
      if (doNadrukuCategory) {
        // Filter categories that are children of "do nadruku"
        const childCategories = categories.filter(
          cat => cat.parent === doNadrukuCategory.id
        );
        
        // Also add categories that match our predefined slugs
        const matchingCategories = categories.filter(cat =>
          BRANDING_CATEGORIES.some(bc => bc.slug === cat.slug)
        );

        // Merge and deduplicate
        const allCategories = [...childCategories, ...matchingCategories];
        filteredCategories = Array.from(
          new Map(allCategories.map(cat => [cat.id, cat])).values()
        );
      } else {
        // Fallback: use categories that match our predefined slugs
        filteredCategories = categories.filter(cat =>
          BRANDING_CATEGORIES.some(bc => bc.slug === cat.slug)
        );
      }

      // Update state in batch to prevent multiple re-renders
      setAllCategories(categories);
      setAvailableCategories(filteredCategories);
      
      // Cache both for consistency
      cache.set('categories_data', {
        categories: filteredCategories,
        allCategories: categories
      }, 30 * 60 * 1000); // 30 minutes
      
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Wystąpił błąd podczas ładowania kategorii.');
    } finally {
      perf.end();
    }
  }, []);

  // Removed getCategoryId - it was unused

  // Fetch all products from "do nadruku" category - STABLE VERSION
  const fetchAllProducts = useCallback(async (categories: Category[]) => {
    const perf = measurePerformance('fetchAllProducts');
    
    // Check cache first for products
    const cachedProducts = cache.get<Product[]>('all_do_nadruku_products');
    if (cachedProducts && cachedProducts.length > 0) {
      setAllFetchedProducts(cachedProducts);
      perf.end();
      return cachedProducts;
    }

    try {
      // Find "do nadruku" parent category
      const doNadrukuCategory = categories.find(
        cat => {
          const slug = cat.slug.toLowerCase();
          const name = cat.name.toLowerCase();
          return slug === 'do-nadruku' || 
                 slug === 'do nadruku' || 
                 slug === 'nadruk' ||
                 slug === 'nadruki' ||
                 name.includes('nadruk') ||
                 name.includes('znakowanie');
        }
      );
      
      let fetchedProducts: Product[] = [];
      
      if (!doNadrukuCategory) {
        // Fallback: fetch all products
        console.warn('Kategoria "do nadruku" nie została znaleziona, pobieranie wszystkich produktów');
        const response = await ShopApi.fetchProducts({}, 1, 100);
        fetchedProducts = response.products || [];
      } else {
        // Fetch products from "do nadruku" category
        const response = await ShopApi.fetchProducts(
          { category: doNadrukuCategory.id.toString() },
          1,
          100
        );
        fetchedProducts = response.products || [];
      }

      setAllFetchedProducts(fetchedProducts);
      
      // Cache the products for 30 minutes to reduce re-fetching
      if (fetchedProducts.length > 0) {
        cache.set('all_do_nadruku_products', fetchedProducts, 30 * 60 * 1000);
      }
      
      perf.end();
      return fetchedProducts;
    } catch (err) {
      console.error('Error fetching all products:', err);
      setError('Wystąpił błąd podczas ładowania produktów.');
      throw err;
    }
  }, []);


  // Load more products (for pagination)
  const loadMoreFromFiltered = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Filter all products first
    let filteredProducts = [...allFetchedProducts];
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.categories?.some(cat => cat.slug === selectedCategory)
      );
    }
    
    // Get next batch
    const startIndex = products.length;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const nextBatch = filteredProducts.slice(startIndex, endIndex);
    const stillHasMore = filteredProducts.length > endIndex;
    
    setProducts(prev => [...prev, ...nextBatch]);
    setHasMore(stillHasMore);
    // setCurrentPage(prev => prev + 1); // Removed
    setIsLoadingMore(false);
  }, [allFetchedProducts, selectedCategory, products.length, hasMore, isLoadingMore, PRODUCTS_PER_PAGE]);

  // Initialize categories - ONCE only
  useEffect(() => {
    fetchAvailableCategories();
  }, [fetchAvailableCategories]); // Added fetchAvailableCategories

  // Fetch all products when categories are available - STABLE
  useEffect(() => {
    const initializeProducts = async () => {
      if (allCategories.length > 0 && !isInitialized) {
        setIsLoading(true);
        try {
          await fetchAllProducts(allCategories);
          setIsInitialized(true); // Mark as initialized to prevent re-fetching
        } catch (err) {
          console.error('Error initializing products:', err);
          // Error already set in fetchAllProducts
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    initializeProducts();
  }, [allCategories, isInitialized, fetchAllProducts]); // Added allCategories, fetchAllProducts

  // Filter and paginate when category changes or products are loaded - STABLE
  useEffect(() => {
    if (allFetchedProducts.length > 0) {
      const perf = measurePerformance(`filterProducts_${selectedCategory}`);
      
      let filteredProducts = [...allFetchedProducts];
      
      // If specific category selected, filter products by that category
      if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.categories?.some(cat => cat.slug === selectedCategory)
        );
      }
      
      // Apply pagination - always show from beginning when category changes
      const paginatedProducts = filteredProducts.slice(0, PRODUCTS_PER_PAGE);
      const hasMoreProducts = filteredProducts.length > PRODUCTS_PER_PAGE;
      
      setProducts(paginatedProducts);
      setHasMore(hasMoreProducts);
      // setCurrentPage(1); // Removed
      
      perf.end();
    }
  }, [allFetchedProducts, selectedCategory]); // Added allFetchedProducts

  // Load more products
  const loadMoreProducts = useCallback(() => {
    loadMoreFromFiltered();
  }, [loadMoreFromFiltered]);

  const handleRetry = useCallback(() => {
    setError(null);
    if (availableCategories.length > 0) {
      setIsLoading(true);
      fetchAllProducts(availableCategories)
        .then(() => setIsLoading(false))
        .catch(() => { // Removed err
          setError('Wystąpił błąd podczas ładowania produktów.');
          setIsLoading(false);
        });
    }
  }, [availableCategories, fetchAllProducts]); // Added availableCategories

  // Smooth category change to prevent flash
  const handleCategoryChange = useCallback((categorySlug: string) => {
    // Prevent multiple rapid clicks
    if (isLoading || isLoadingMore || selectedCategory === categorySlug) return;
    
    // Add slight loading state for smooth transition
    setIsLoadingMore(true);
    
    // Use setTimeout to ensure smooth visual transition
    setTimeout(() => {
      setSelectedCategory(categorySlug);
      setIsLoadingMore(false);
    }, 100);
  }, [isLoading, isLoadingMore, selectedCategory]);

  // Memoize products to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <div className={className}>
      {/* Category Filter */}
      {availableCategories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtuj według kategorii:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              disabled={isLoading || isLoadingMore}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Wszystkie kategorie
            </button>
            {availableCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                disabled={isLoading || isLoadingMore}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedCategory === category.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-600">Ładowanie produktów...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      ) : (
        <>
          {/* Add loading overlay for category switching */}
          <div className={`transition-opacity duration-200 ${isLoadingMore && products.length > 0 ? 'opacity-50' : 'opacity-100'}`}>
            <BrandingProductGrid
              products={memoizedProducts}
              onProductInquiry={onProductInquiry}
              onScrollToForm={onScrollToForm}
              loadingMore={false} // Don't show loading on grid itself during category switch
            />
          </div>
          
          {/* Load More Button */}
          {hasMore && !isLoadingMore && products.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreProducts}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Załaduj więcej produktów
              </button>
            </div>
          )}
          
          {/* Loading More Indicator */}
          {isLoadingMore && (
            <div className="mt-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
              <p className="text-gray-600">Ładowanie kolejnych produktów...</p>
            </div>
          )}
          
          {/* Contact CTA */}
          {products.length > 0 && (
            <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Potrzebujesz wyceny dla większej ilości?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Oferujemy atrakcyjne rabaty przy zamówieniach hurtowych. 
                Skontaktuj się z nami, aby otrzymać indywidualną ofertę dostosowaną do Twoich potrzeb.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+48123456789"
                  className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Zadzwoń do nas
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex items-center justify-center border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Wyślij zapytanie
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

BrandingProductsByCategory.displayName = 'BrandingProductsByCategory';