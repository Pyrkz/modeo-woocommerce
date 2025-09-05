'use client';

import { memo } from 'react';

interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const SectionBadge = memo(({ 
  children, 
  variant = 'primary', 
  className = '' 
}: SectionBadgeProps) => {
  const baseClasses = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-full border";
  
  const variantClasses = {
    primary: "bg-red-50 text-red-600 border-red-100",
    secondary: "bg-gray-50 text-gray-600 border-gray-100"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
});

SectionBadge.displayName = 'SectionBadge';

export default SectionBadge;