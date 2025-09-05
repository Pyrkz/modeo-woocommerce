'use client';

import { memo } from 'react';
import { formatDate } from '../../utils';

interface BlogMetaProps {
  date: string;
  author?: string;
  readTime?: number;
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
}

const BlogMeta = memo(({ 
  date, 
  author, 
  readTime, 
  variant = 'default',
  className = '' 
}: BlogMetaProps) => {
  const formattedDate = formatDate(date);

  const baseClasses = 'flex items-center gap-3 text-sm';
  
  const variantClasses = {
    default: 'text-gray-600',
    compact: 'text-gray-500 text-xs',
    minimal: 'text-gray-400 text-xs'
  };

  const separatorClasses = {
    default: 'w-1 h-1 bg-gray-400 rounded-full',
    compact: 'w-0.5 h-0.5 bg-gray-400 rounded-full',
    minimal: 'w-0.5 h-0.5 bg-gray-300 rounded-full'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <time dateTime={date} className="font-medium">
        {formattedDate}
      </time>
      
      {author && (
        <>
          <div className={separatorClasses[variant]} />
          <span>{author}</span>
        </>
      )}
      
      {readTime && (
        <>
          <div className={separatorClasses[variant]} />
          <span>{readTime} min</span>
        </>
      )}
    </div>
  );
});

BlogMeta.displayName = 'BlogMeta';

export { BlogMeta };