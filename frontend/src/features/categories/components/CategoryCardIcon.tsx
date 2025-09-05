'use client';

import { memo } from 'react';
import CustomIcon from '@/components/ui/CustomIcon';

interface CategoryCardIconProps {
  iconPath: string;
  title: string;
  className?: string;
}

const CategoryCardIcon = memo(({ 
  iconPath, 
  title, 
  className = '' 
}: CategoryCardIconProps) => (
  <div className={`w-16 h-16 mb-4 flex items-center justify-center bg-gray-100 rounded-full ${className}`}>
    <CustomIcon
      src={iconPath}
      alt={`Ikona ${title}`}
      width={32}
      height={32}
      className="text-gray-700"
    />
  </div>
));

CategoryCardIcon.displayName = 'CategoryCardIcon';

export default CategoryCardIcon;