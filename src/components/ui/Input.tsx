'use client';

import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const describedBy = error ? `${inputId}-error` : undefined;
    const derivedTitle = props.title ?? label;

    return (
      <div className={`w-full ${className}`}>
        <label
          htmlFor={inputId}
          className='block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1'
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`block w-full rounded-md border px-3 py-2 text-base bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'border-gray-300 dark:border-gray-700'
          }`}
          title={derivedTitle}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} className='mt-1 text-sm text-red-600'>
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
