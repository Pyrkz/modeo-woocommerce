'use client';

import { memo, ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  ariaLabel?: string;
}

/**
 * Enhanced animated button with micro-interactions and loading states
 * Optimized for mobile touch and accessibility
 */
export const AnimatedButton = memo<AnimatedButtonProps>(({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  className = '',
  ariaLabel
}) => {
  const getButtonClasses = () => {
    const baseClasses = `
      relative overflow-hidden
      px-6 py-3 rounded-lg font-medium text-sm
      transition-all duration-150 ease-out
      flex items-center justify-center gap-2
      min-w-[140px] flex-shrink-0
      focus:outline-none focus:ring-1 focus:ring-offset-1
      disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-primary hover:bg-primary-hover text-white 
        shadow-sm hover:shadow-md focus:ring-primary/20
        disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none
        ${isLoading ? 'bg-primary/90' : ''}
      `,
      secondary: `
        border border-primary text-primary hover:bg-primary hover:text-white
        focus:ring-primary/20
        hover:shadow-sm
        disabled:border-gray-300 disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-500
      `
    };

    return `${baseClasses} ${variants[variant]} ${className}`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={getButtonClasses()}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
});

AnimatedButton.displayName = 'AnimatedButton';