import { memo } from 'react';
import Link from 'next/link';
import type { ProductCategory } from '../../types';

interface CategoryContentProps {
  category: ProductCategory;
}

function CategoryContent({ category }: CategoryContentProps) {
  const { title, description, href, badge } = category;

  return (
    <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end z-10">
      {badge && (
        <div className="self-start">
          <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {badge}
          </span>
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
        <Link
          href={href}
          className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-medium mt-3 w-fit"
          aria-label={`Zobacz produkty: ${title}`}
        >
          Zobacz
          <svg 
            className="ml-2 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default memo(CategoryContent);