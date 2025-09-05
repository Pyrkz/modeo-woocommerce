'use client';

import Link from 'next/link';
import { Category } from '../types';

interface MobileNavSubmenuProps {
  categories: Category[];
  onItemClick: () => void;
}

export const MobileNavSubmenu = ({ categories, onItemClick }: MobileNavSubmenuProps) => {
  return (
    <div className="py-2">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="flex items-center px-8 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
          onClick={onItemClick}
        >
          <span className="w-5 h-5 mr-3 flex-shrink-0">
            {category.icon}
          </span>
          <span className="text-sm">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};