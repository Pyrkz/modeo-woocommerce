import { Category, CategoriesResponse, CategoryHierarchy } from '@/types/category';
import { config } from '@/lib/config';

export class CategoriesApi {
  /**
   * Fetch all product categories from WooCommerce
   */
  static async fetchCategories(options: {
    hideEmpty?: boolean;
    perPage?: number;
    orderBy?: 'name' | 'slug' | 'count';
    order?: 'asc' | 'desc';
  } = {}): Promise<CategoriesResponse> {
    const {
      hideEmpty = true,
      perPage = 100,
      orderBy = 'name',
      order = 'asc'
    } = options;

    const url = new URL(`${config.getApiUrl()}/wp-json/wc/store/products/categories`);
    
    if (hideEmpty) {
      url.searchParams.set('hide_empty', 'true');
    }
    url.searchParams.set('per_page', perPage.toString());
    url.searchParams.set('orderby', orderBy);
    url.searchParams.set('order', order);

    const response = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories: Category[] = await response.json();
    const totalHeader = response.headers.get('X-WP-Total');
    const total = totalHeader ? parseInt(totalHeader) : categories.length;

    return {
      categories,
      total,
    };
  }

  /**
   * Build hierarchical category tree structure
   */
  static buildCategoryHierarchy(categories: Category[]): CategoryHierarchy[] {
    const categoryMap = new Map<number, CategoryHierarchy>();
    const rootCategories: CategoryHierarchy[] = [];

    // Initialize all categories with children array
    categories.forEach(category => {
      categoryMap.set(category.id, {
        ...category,
        children: [],
        level: 0,
      });
    });

    // Build hierarchy
    categories.forEach(category => {
      const categoryWithChildren = categoryMap.get(category.id)!;
      
      if (category.parent === 0) {
        // Root category
        rootCategories.push(categoryWithChildren);
      } else {
        // Child category
        const parent = categoryMap.get(category.parent);
        if (parent) {
          categoryWithChildren.level = parent.level + 1;
          parent.children.push(categoryWithChildren);
        }
      }
    });

    // Sort categories alphabetically at each level
    const sortCategories = (categories: CategoryHierarchy[]) => {
      categories.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
      categories.forEach(category => {
        if (category.children.length > 0) {
          sortCategories(category.children);
        }
      });
    };

    sortCategories(rootCategories);
    return rootCategories;
  }

  /**
   * Get category by slug
   */
  static async fetchCategoryBySlug(slug: string): Promise<Category | null> {
    const { categories } = await this.fetchCategories({ hideEmpty: false });
    return categories.find(cat => cat.slug === slug) || null;
  }

  /**
   * Get category with all its children IDs (for filtering)
   */
  static getCategoryWithChildren(categoryId: number, hierarchy: CategoryHierarchy[]): number[] {
    const findCategory = (categories: CategoryHierarchy[], id: number): CategoryHierarchy | null => {
      for (const category of categories) {
        if (category.id === id) return category;
        const found = findCategory(category.children, id);
        if (found) return found;
      }
      return null;
    };

    const collectIds = (category: CategoryHierarchy): number[] => {
      const ids = [category.id];
      category.children.forEach(child => {
        ids.push(...collectIds(child));
      });
      return ids;
    };

    const category = findCategory(hierarchy, categoryId);
    return category ? collectIds(category) : [categoryId];
  }
}