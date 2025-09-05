import { memo } from 'react';

interface CategoryOverlayProps {
  className?: string;
}

function CategoryOverlay({ className = '' }: CategoryOverlayProps) {
  return (
    <div 
      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent ${className}`}
      aria-hidden="true"
    />
  );
}

export default memo(CategoryOverlay);