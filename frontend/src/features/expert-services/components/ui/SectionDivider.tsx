import { memo } from 'react';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider = memo<SectionDividerProps>(({ className = '' }) => (
  <div className={`w-full h-px bg-gray-300 mb-8 ${className}`} />
));

SectionDivider.displayName = 'SectionDivider';