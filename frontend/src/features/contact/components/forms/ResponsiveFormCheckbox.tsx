'use client';

import { forwardRef, memo } from 'react';
import { FormField } from './FormField';
import { FormError } from './FormError';

interface ResponsiveFormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
  variant?: 'default' | 'card';
}

const ResponsiveFormCheckboxComponent = forwardRef<HTMLInputElement, ResponsiveFormCheckboxProps>(
  ({ 
    label, 
    error, 
    variant = 'default',
    className = '', 
    checked,
    ...props 
  }, ref) => {
    
    const getCheckboxStyles = () => {
      const baseStyles = `
        w-4 h-4 sm:w-5 sm:h-5 text-red-500 border border-gray-300 rounded
        focus:ring-1 focus:ring-red-100 focus:ring-opacity-50
        transition-all duration-200 cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-50
      `;

      if (variant === 'card') {
        return `${baseStyles} mr-3`;
      }
      
      return `${baseStyles} mr-2.5`;
    };

    const getLabelStyles = () => {
      const baseStyles = `
        flex items-start gap-2.5 cursor-pointer transition-all duration-200
        text-sm leading-relaxed
      `;

      if (variant === 'card') {
        return `
          ${baseStyles}
          p-3 sm:p-4 rounded-lg border transition-all duration-300
          ${checked 
            ? 'border-red-200 bg-red-25 text-red-800' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
          }
          ${error ? 'border-red-300 bg-red-50' : ''}
        `;
      }
      
      return `${baseStyles} text-gray-700`;
    };

    return (
      <FormField className="w-full">
        <label className={getLabelStyles()}>
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className={`${getCheckboxStyles()} ${className}`}
            {...props}
          />
          <span className="flex-1 select-none">
            {label}
          </span>
        </label>
        <FormError error={error} />
      </FormField>
    );
  }
);

ResponsiveFormCheckboxComponent.displayName = 'ResponsiveFormCheckbox';

export const ResponsiveFormCheckbox = memo(ResponsiveFormCheckboxComponent);