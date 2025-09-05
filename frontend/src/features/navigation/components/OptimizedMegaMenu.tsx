'use client';

import { memo, useMemo } from 'react';
import { MegaMenuProps } from '../types';
import MegaMenu from './MegaMenu';

const OptimizedMegaMenu = memo<MegaMenuProps>(({ categories, isOpen, onClose, onOpen, className }) => {
  // Memoize categories processing to avoid re-renders
  const processedCategories = useMemo(() => {
    return categories.map(category => ({
      ...category,
      subcategoriesCount: category.subcategories?.length || 0
    }));
  }, [categories]);

  // Only render when open to improve performance
  if (!isOpen) {
    return null;
  }

  return (
    <MegaMenu
      categories={processedCategories}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      className={className}
    />
  );
});

OptimizedMegaMenu.displayName = 'OptimizedMegaMenu';

export default OptimizedMegaMenu;