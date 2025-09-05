'use client';

import React, { useState, useMemo } from 'react';
import { CategoryHierarchy } from '@/types/category';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
  searchTerm?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selectedCategories,
  onChange,
  level = 0,
  searchTerm = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = category.children.length > 0;
  const isSelected = selectedCategories.includes(category.id);
  
  const hasSelectedChildren = category.children.some(child => 
    selectedCategories.includes(child.id) || 
    child.children.some(grandChild => selectedCategories.includes(grandChild.id))
  );

  const handleToggle = () => {
    if (isSelected) {
      onChange(selectedCategories.filter(id => id !== category.id));
    } else {
      onChange([...selectedCategories, category.id]);
    }
  };

  const handleExpandCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">{part}</mark> : part
    );
  };

  const paddingLeft = level > 0 ? `pl-${4 + (level * 4)}` : 'pl-0';

  return (
    <div>
      <div
        className={`
          group flex items-center py-2.5 ${paddingLeft} pr-2 cursor-pointer
          transition-all duration-150 ease-out relative
          ${isSelected 
            ? 'text-black font-medium bg-gray-50' 
            : hasSelectedChildren 
              ? 'text-gray-800' 
              : 'text-gray-700 hover:text-black'
          }
          ${level === 0 ? 'border-b border-gray-100 last:border-b-0' : ''}
        `}
        onClick={handleToggle}
      >
        {/* Hierarchy line */}
        {level > 0 && (
          <div 
            className={`absolute left-${2 + ((level-1) * 4)} top-0 bottom-0 w-px ${
              hasSelectedChildren || isSelected ? 'bg-gray-300' : 'bg-gray-200'
            }`} 
          />
        )}
        
        {/* Expand button */}
        {hasChildren ? (
          <button
            onClick={handleExpandCollapse}
            className="mr-2 p-0.5 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isExpanded ? 'rotate-0' : '-rotate-90'
            } ${isSelected || hasSelectedChildren ? 'text-gray-800' : 'text-gray-500'}`} />
          </button>
        ) : (
          <div className="w-4 mr-2" /> // Spacer for alignment
        )}
        
        {/* Category icon */}
        <span className={`text-sm mr-2 ${
          isSelected ? 'text-gray-800' : 'text-gray-600'
        }`}>
          {getCategoryIcon(category.name, category.slug)}
        </span>
        
        {/* Category name */}
        <div className="flex-1 flex items-center justify-between min-w-0">
          <span className={`text-sm leading-tight truncate ${
            level === 0 ? 'font-medium' : 'font-normal'
          }`}>
            {highlightText(category.name, searchTerm)}
          </span>
          
          {/* Count badge */}
          {category.count > 0 && (
            <span className={`
              ml-2 text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0
              ${isSelected 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {category.count}
            </span>
          )}
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black rounded-r"></div>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="transition-all duration-200">
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              selectedCategories={selectedCategories}
              onChange={onChange}
              level={level + 1}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ImprovedCategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onChange,
  loading = false,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!searchTerm && !showOnlySelected) return categories;

    const filterCategory = (category: CategoryHierarchy): CategoryHierarchy | null => {
      const matchesSearch = !searchTerm || 
        category.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isSelectedOrHasSelected = !showOnlySelected || 
        selectedCategories.includes(category.id) ||
        category.children.some(child => 
          selectedCategories.includes(child.id) ||
          child.children.some(grandChild => selectedCategories.includes(grandChild.id))
        );

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

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-2 py-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center py-2.5">
              <div className="w-3.5 h-3.5 bg-gray-200 rounded animate-pulse mr-2"></div>
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
              <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse"></div>
              <div className="w-6 h-4 bg-gray-200 rounded animate-pulse ml-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Compact search */}
      {categories.length > 8 && (
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-3.5 w-3.5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Szukaj..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-sm border-0 bg-gray-50 rounded-md focus:bg-white focus:ring-1 focus:ring-gray-300 text-gray-900 placeholder-gray-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Wyczyść wyszukiwanie"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Quick actions */}
      {selectedCount > 0 && (
        <div className="flex items-center justify-between text-xs mb-2 py-1">
          <span className="text-gray-600">{selectedCount} wybrane</span>
          <div className="flex gap-1">
            <button
              onClick={() => setShowOnlySelected(!showOnlySelected)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showOnlySelected ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {showOnlySelected ? 'Wszystkie' : 'Wybrane'}
            </button>
            <button
              onClick={() => onChange([])}
              className="px-2 py-1 rounded text-xs text-gray-500 hover:text-gray-800 transition-colors"
            >
              Wyczyść
            </button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div className="max-h-[34rem] overflow-y-auto custom-scrollbar">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-500">
            {searchTerm ? 'Brak wyników' : 'Brak kategorii'}
          </div>
        ) : (
          <div className="-my-0.5">
            {filteredCategories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                selectedCategories={selectedCategories}
                onChange={onChange}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};