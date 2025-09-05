import { memo } from 'react';

interface ChevronRightIconProps {
  className?: string;
  size?: number;
}

export const ChevronRightIcon = memo<ChevronRightIconProps>(({ 
  className = "", 
  size = 16 
}) => (
  <svg 
    className={className}
    width={size}
    height={size}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 5l7 7-7 7" 
    />
  </svg>
));

ChevronRightIcon.displayName = 'ChevronRightIcon';