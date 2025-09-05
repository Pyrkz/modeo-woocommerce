import { memo } from 'react';

interface AccentTitleProps {
  children: string;
  className?: string;
}

export const AccentTitle = memo<AccentTitleProps>(({ 
  children, 
  className = '' 
}) => (
  <h2 className={`text-red-600 font-bold text-sm md:text-base lg:text-lg uppercase tracking-wide mb-6 ${className}`}>
    {children}
  </h2>
));

AccentTitle.displayName = 'AccentTitle';