'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Category, CategoryHierarchy } from '@/types/category';
import { CategoriesApi } from '../api/categories.api';

interface UseCategoriesOptions {
  autoFetch?: boolean;
  hideEmpty?: boolean;
  buildHierarchy?: boolean;
}

interface UseCategoriesReturn {
  categories: Category[];
  categoryHierarchy: CategoryHierarchy[];
  loading: boolean;
  error: string | null;
  refreshCategories: () => Promise<void>;
  getCategoryById: (id: number) => Category | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getRootCategories: () => CategoryHierarchy[];
  getCategoryWithChildren: (categoryId: number) => number[];
}

export const useCategories = (options: UseCategoriesOptions = {}): UseCategoriesReturn => {
  const {
    autoFetch = true,
    hideEmpty = true,
    buildHierarchy = true,
  } = options;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized category hierarchy
  const categoryHierarchy = useMemo(() => {
    if (!buildHierarchy || categories.length === 0) return [];
    return CategoriesApi.buildCategoryHierarchy(categories);
  }, [categories, buildHierarchy]);

  // Fetch categories
  const refreshCategories = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const response = await CategoriesApi.fetchCategories({
        hideEmpty,
        perPage: 100, // Max allowed by WooCommerce Store API
        orderBy: 'name',
        order: 'asc',
      });

      setCategories(response.categories);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd pobierania kategorii';
      setError(errorMessage);
      console.error('Błąd pobierania kategorii:', err);
    } finally {
      setLoading(false);
    }
  }, [hideEmpty, loading]);

  // Get category by ID
  const getCategoryById = useCallback((id: number): Category | undefined => {
    return categories.find(cat => cat.id === id);
  }, [categories]);

  // Get category by slug
  const getCategoryBySlug = useCallback((slug: string): Category | undefined => {
    return categories.find(cat => cat.slug === slug);
  }, [categories]);

  // Get root categories (parent = 0)
  const getRootCategories = useCallback((): CategoryHierarchy[] => {
    return categoryHierarchy.filter(cat => cat.parent === 0);
  }, [categoryHierarchy]);

  // Get category with all children IDs
  const getCategoryWithChildren = useCallback((categoryId: number): number[] => {
    return CategoriesApi.getCategoryWithChildren(categoryId, categoryHierarchy);
  }, [categoryHierarchy]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && categories.length === 0 && !loading) {
      refreshCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]); // Only run on mount

  return {
    categories,
    categoryHierarchy,
    loading,
    error,
    refreshCategories,
    getCategoryById,
    getCategoryBySlug,
    getRootCategories,
    getCategoryWithChildren,
  };
};