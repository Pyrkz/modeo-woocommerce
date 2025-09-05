'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ShopApi } from '../api/shop.api';
import { ShopFilters, UseShopReturn, Product } from '../types';
import { useShopNotifications } from './useShopNotifications';
import { useCartContext } from '../../cart/context/CartProvider';
import { useCart } from '@/hooks/useCart';

interface UseShopOptions {
  perPage?: number;
  autoFetch?: boolean;
  enableInfiniteScroll?: boolean;
  initialFilters?: ShopFilters;
}

const DEFAULT_FILTERS: ShopFilters = {
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useShop = (options: UseShopOptions = {}): UseShopReturn => {
  const {
    perPage = 8,
    autoFetch = true,
    enableInfiniteScroll = true,
    initialFilters = {}
  } = options;

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ShopFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasMore: false,
    perPage,
  });

  // Refs for performance
  const isScrolling = useRef(false);
  const loadingRef = useRef(false);

  // Notifications
  const { showNotification, notifications, hideNotification, clearAllNotifications } = useShopNotifications();
  
  // Cart context hooks
  const { openCart } = useCartContext();
  const { refreshCart } = useCart();

  // Load products
  const loadProducts = useCallback(async (
    newFilters?: ShopFilters, 
    page: number = 1, 
    append: boolean = false
  ) => {
    // Prevent multiple simultaneous requests
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const activeFilters = newFilters || filters;
      const response = await ShopApi.fetchProducts(activeFilters, page, perPage);

      if (append) {
        setProducts(prev => [...prev, ...response.products]);
      } else {
        setProducts(response.products);
      }

      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalProducts: response.total,
        hasMore: response.hasMore,
        perPage,
      });

      // Update filters if provided
      if (newFilters) {
        setFilters(activeFilters);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd połączenia z serwerem';
      setError(errorMessage);
      console.error('Błąd pobierania produktów:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, [filters, perPage]);

  // Load more products
  const loadMore = useCallback(async () => {
    if (!loadingMore && pagination.hasMore && !loadingRef.current) {
      await loadProducts(filters, pagination.currentPage + 1, true);
    }
  }, [loadProducts, filters, pagination.currentPage, pagination.hasMore, loadingMore]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ShopFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadProducts(updatedFilters, 1, false);
    
    // Scroll to top on desktop after applying filters
    if (typeof window !== 'undefined') {
      // Check if it's desktop (not mobile)
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      if (isDesktop) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [filters, loadProducts]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadProducts(DEFAULT_FILTERS, 1, false);
    
    // Scroll to top on desktop after resetting filters
    if (typeof window !== 'undefined') {
      // Check if it's desktop (not mobile)
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      if (isDesktop) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [loadProducts]);

  // Add to cart with variant support
  const addToCart = useCallback(async (productId: number, quantity: number = 1, variation?: { [key: string]: string }) => {
    try {
      await ShopApi.addToCart(productId, quantity, variation);
      const message = variation 
        ? 'Wariant produktu został dodany do koszyka!'
        : 'Produkt został dodany do koszyka!';
      showNotification(message, 'success');
      
      // Refresh cart and open slide cart
      await refreshCart();
      openCart();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd dodawania do koszyka';
      console.error('Błąd dodawania do koszyka:', err);
      showNotification(errorMessage, 'error');
      throw new Error(errorMessage);
    }
  }, [showNotification, refreshCart, openCart]);

  // Infinite scroll effect
  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const handleScroll = () => {
      // Throttle scroll events
      if (isScrolling.current) return;
      isScrolling.current = true;

      requestAnimationFrame(() => {
        const scrolledToBottom = 
          window.innerHeight + document.documentElement.scrollTop >= 
          document.documentElement.offsetHeight - 1000; // Load 1000px before bottom

        if (scrolledToBottom && !loadingMore && pagination.hasMore && !loadingRef.current) {
          loadMore();
        }
        isScrolling.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, loadingMore, pagination.hasMore, enableInfiniteScroll]);

  // Auto-fetch initial data
  useEffect(() => {
    if (autoFetch && products.length === 0 && !loading) {
      loadProducts(filters, 1, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]); // Only run on mount - intentionally ignoring other deps

  return {
    // State
    products,
    loading,
    loadingMore,
    error,
    filters,
    pagination,
    
    // Actions
    loadProducts,
    loadMore,
    updateFilters,
    resetFilters,
    addToCart,
    
    // Notifications
    notifications,
    showNotification,
    hideNotification,
    clearAllNotifications,
  };
};