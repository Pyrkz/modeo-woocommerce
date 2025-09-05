import { forwardRef, cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ButtonVariant, ButtonSize } from '@/types/common';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

interface AsChildElement extends ReactElement {
  props: {
    className?: string;
    children?: ReactNode;
    [key: string]: unknown;
  };
}

const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary/50',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, asChild, children, ...props }, ref) => {
    const buttonClasses = cn(
      // Base styles
      'inline-flex items-center justify-center gap-2 rounded-[22px] font-semibold',
      'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      
      // Variants
      buttonVariants[variant],
      
      // Sizes
      buttonSizes[size],
      
      // Loading state
      loading && 'cursor-wait',
      
      className
    );

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
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
        )}
        {children}
      </>
    );

    if (asChild && isValidElement(children)) {
      const childElement = children as AsChildElement;
      return cloneElement(childElement, {
        className: cn(buttonClasses, childElement.props.className),
        disabled: disabled || loading,
        ref,
        ...props,
        children: (
          <>
            {loading && (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {childElement.props.children}
          </>
        )
      });
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';