export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: string | null;
  review_count: number;
  permalink: string;
}

export interface CategoryHierarchy extends Category {
  children: CategoryHierarchy[];
  level: number;
}

export interface CategoryFilter {
  selectedCategories: number[];
  showOnlyWithProducts?: boolean;
  includeChildren?: boolean;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}