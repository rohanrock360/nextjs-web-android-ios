'use client';

import { forwardRef, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', type = 'text', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const widthClass = fullWidth ? 'w-full' : '';

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    // Check if there's already a value (for pre-filled inputs)
    useState(() => {
      if (props.defaultValue || props.value) {
        setHasValue(true);
      }
    });

    return (
      <div className={`${widthClass} ${className}`}>
        {label && (
          <label
            className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
              error ? 'text-red-600' : isFocused ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            block w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border-2 transition-all duration-200 outline-none
            bg-white dark:bg-gray-800
            placeholder-gray-400 dark:placeholder-gray-500
            text-base sm:text-sm
            ${error
              ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-500/20'
              : isFocused
                ? 'border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            min-h-[48px]
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
