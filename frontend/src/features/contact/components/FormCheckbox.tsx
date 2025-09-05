'use client';

import { forwardRef } from 'react';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="flex items-start gap-4 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            className={`
              mt-1 w-5 h-5 text-gray-900 border-2 border-gray-300 rounded-md
              focus:ring-2 focus:ring-gray-500 focus:ring-opacity-30 focus:ring-offset-0
              transition-colors duration-200 group-hover:border-gray-400
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <span className="text-sm text-gray-700 leading-6">
            {label}
          </span>
        </label>
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span>⚠️</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';