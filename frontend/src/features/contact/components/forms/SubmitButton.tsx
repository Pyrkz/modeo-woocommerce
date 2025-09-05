'use client';

import { memo } from 'react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const LoadingSpinner = memo(() => (
  <svg 
    className="animate-spin h-5 w-5 mr-3" 
    fill="none" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export const SubmitButton = memo(({ 
  isLoading = false,
  loadingText = 'Wysyłanie...',
  variant = 'primary',
  size = 'lg',
  children,
  disabled,
  className = '',
  ...props 
}: SubmitButtonProps) => {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return `
          bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white
          focus:ring-gray-500
        `;
      case 'outline':
        return `
          bg-transparent border-2 border-red-600 text-red-600 
          hover:bg-red-600 hover:text-white active:bg-red-700
          focus:ring-red-500
        `;
      default: // primary
        return `
          bg-red-600 hover:bg-red-700 active:bg-red-800 text-white
          focus:ring-red-500
        `;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-5 py-2.5 text-sm font-medium';
      case 'md':
        return 'px-6 py-3 text-sm font-semibold';
      default: // lg
        return 'px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold';
    }
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`
        w-full rounded-lg transition-all duration-300 
        flex items-center justify-center gap-2
        focus:outline-none focus:ring-2 focus:ring-opacity-30
        transform hover:scale-[1.01] active:scale-[0.99]
        shadow-sm hover:shadow-md
        disabled:cursor-not-allowed disabled:opacity-60 
        disabled:hover:scale-100 disabled:shadow-sm
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
});

SubmitButton.displayName = 'SubmitButton';