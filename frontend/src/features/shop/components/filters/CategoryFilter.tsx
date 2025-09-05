'use client';

import React, { useState, useMemo } from 'react';
import { CategoryHierarchy } from '@/types/category';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getCategoryIcon } from '@/utils/categoryIcons';

interface CategoryFilterProps {
  categories: CategoryHierarchy[];
  selectedCategories: number[];
  onChange: (selectedCategories: number[]) => void;
  loading?: boolean;
  className?: string;
}

interface CategoryItemProps {
  category: CategoryHierarchy;
  selectedCategories: number[];
  onChange: (selectedCategories: number[]) => void;
  level?: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selectedCategories,
  onChange,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
  const hasChildren = category.children.length > 0;
  const isSelected = selectedCategories.includes(category.id);

  const handleToggle = () => {
    if (isSelected) {
      // Remove category from selection
      onChange(selectedCategories.filter(id => id !== category.id));
    } else {
      // Add category to selection
      onChange([...selectedCategories, category.id]);
    }
  };

  const handleExpandCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const indentClass = level > 0 ? `ml-${Math.min(level * 4, 12)}` : '';

  return (
    <div className="select-none">
      <div
        className={`
          flex items-center py-2 px-3 rounded-lg cursor-pointer
          hover:bg-gray-50 transition-colors duration-200
          ${isSelected ? 'bg-blue-50 border border-blue-200' : ''}
          ${indentClass}
        `}
        onClick={handleToggle}
      >
        {hasChildren && (
          <button
            onClick={handleExpandCollapse}
            className="mr-2 p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label={isExpanded ? 'Zwiń kategorię' : 'Rozwiń kategorię'}
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-600" />
            )}
          </button>
        )}
        
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleToggle}
          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          aria-label={`Wybierz kategorię: ${category.name}`}
        />
        
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
              {getCategoryIcon(category.name, category.slug)}
            </span>
            <span className={`text-sm ${isSelected ? 'font-medium text-blue-700' : 'text-gray-800'}`}>
              {category.name}
            </span>
          </div>
          {category.count > 0 && (
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              {category.count}
            </span>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              selectedCategories={selectedCategories}
              onChange={onChange}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onChange,
  loading = false,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm && !showOnlySelected) return categories;

    const filterCategory = (category: CategoryHierarchy): CategoryHierarchy | null => {
      const matchesSearch = !searchTerm || 
        category.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isSelectedOrHasSelected = !showOnlySelected || 
        selectedCategories.includes(category.id) ||
        category.children.some(child => selectedCategories.includes(child.id));

      const filteredChildren = category.children
        .map(child => filterCategory(child))
        .filter(Boolean) as CategoryHierarchy[];

      const shouldShow = (matchesSearch && isSelectedOrHasSelected) || filteredChildren.length > 0;

      return shouldShow ? {
        ...category,
        children: filteredChildren,
      } : null;
    };

    return categories
      .map(cat => filterCategory(cat))
      .filter(Boolean) as CategoryHierarchy[];
  }, [categories, searchTerm, showOnlySelected, selectedCategories]);

  const selectedCount = selectedCategories.length;

  const handleClearAll = () => {
    onChange([]);
  };

  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Kategorie
          {selectedCount > 0 && (
            <span className="ml-2 text-sm font-normal text-blue-600">
              ({selectedCount} wybrane)
            </span>
          )}
        </h3>
        {selectedCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Wyczyść wszystkie
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Szukaj kategorii..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Show only selected toggle */}
      {selectedCount > 0 && (
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={showOnlySelected}
            onChange={(e) => setShowOnlySelected(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-gray-800">Pokaż tylko wybrane</span>
        </label>
      )}

      {/* Categories */}
      <div className="max-h-96 overflow-y-auto space-y-1 border rounded-lg p-2 bg-white">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'Brak kategorii pasujących do wyszukiwania' : 'Brak dostępnych kategorii'}
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              selectedCategories={selectedCategories}
              onChange={onChange}
            />
          ))
        )}
      </div>
    </div>
  );
};