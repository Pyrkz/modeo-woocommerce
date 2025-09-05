'use client';

import { forwardRef, memo } from 'react';
import { FormField } from './FormField';
import { FormLabel } from './FormLabel';
import { FormError } from './FormError';

interface ResponsiveFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  variant?: 'underline' | 'outlined' | 'filled';
}

const ResponsiveFormInputComponent = forwardRef<HTMLInputElement, ResponsiveFormInputProps>(
  ({ 
    label, 
    error, 
    required = false, 
    variant = 'outlined',
    className = '', 
    ...props 
  }, ref) => {
    
    const getInputStyles = () => {
      const baseStyles = `
        w-full transition-all duration-300 text-gray-900 placeholder-gray-400
        focus:outline-none focus:ring-1 focus:ring-opacity-40
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        text-sm sm:text-base font-normal
      `;

      switch (variant) {
        case 'underline':
          return `
            ${baseStyles}
            px-0 py-2.5 sm:py-3 bg-transparent border-0 border-b border-gray-200
            ${error 
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
              : 'border-gray-200 focus:border-red-500 focus:ring-red-100 hover:border-gray-300'
            }
          `;
        
        case 'filled':
          return `
            ${baseStyles}
            px-3 py-2.5 sm:py-3 bg-gray-50 border border-transparent rounded-lg
            ${error 
              ? 'bg-red-50 border-red-300 focus:border-red-400 focus:ring-red-100' 
              : 'focus:bg-white focus:border-red-400 focus:ring-red-100 hover:bg-gray-100'
            }
          `;
        
        default: // outlined
          return `
            ${baseStyles}
            px-3 py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-white
            ${error 
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100' 
              : 'border-gray-200 focus:border-red-400 focus:ring-red-100 hover:border-gray-300'
            }
          `;
      }
    };

    return (
      <FormField className="w-full">
        {label && (
          <FormLabel htmlFor={props.id} required={required}>
            {label}
          </FormLabel>
        )}
        <input
          ref={ref}
          className={`${getInputStyles()} ${className}`}
          {...props}
        />
        <FormError error={error} />
      </FormField>
    );
  }
);

ResponsiveFormInputComponent.displayName = 'ResponsiveFormInput';

export const ResponsiveFormInput = memo(ResponsiveFormInputComponent);