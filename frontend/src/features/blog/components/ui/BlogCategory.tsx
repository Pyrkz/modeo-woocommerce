'use client';

import { memo } from 'react';

interface BlogCategoryProps {
  name: string;
  variant?: 'default' | 'overlay' | 'accent';
  className?: string;
}

const BlogCategory = memo(({ 
  name, 
  variant = 'default',
  className = '' 
}: BlogCategoryProps) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200";
  
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    overlay: "bg-black/80 text-white backdrop-blur-sm hover:bg-black/90",
    accent: "bg-primary/10 text-primary hover:bg-primary/20"
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {name}
    </span>
  );
});

BlogCategory.displayName = 'BlogCategory';

export { BlogCategory };