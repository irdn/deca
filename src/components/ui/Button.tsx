'use client';

import * as React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function Button({
  className = '',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const derivedTitle =
    props.title ?? (typeof children === 'string' ? children : undefined);
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      title={derivedTitle}
      {...props}
    >
      {children}
      {loading ? (
        <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent ms-2' />
      ) : null}
    </button>
  );
}
