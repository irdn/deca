'use client';

import * as React from 'react';

export type AlertBarVariant = 'success' | 'error' | 'info';

export type AlertBarProps = {
  message: string;
  variant?: AlertBarVariant;
  onClose?: () => void;
  className?: string;
};

const variantStyles: Record<AlertBarVariant, string> = {
  success:
    'bg-green-500 text-white shadow-md ring-1 ring-green-500/50 dark:ring-green-400/40',
  error:
    'bg-red-500 text-white shadow-md ring-1 ring-red-500/50 dark:ring-red-400/40',
  info: 'bg-blue-500 text-white shadow-md ring-1 ring-blue-500/50 dark:ring-blue-400/40',
};

export function AlertBar({
  message,
  variant = 'info',
  onClose,
  className = '',
}: AlertBarProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  React.useEffect(() => {
    setIsVisible(true);
    const timer = window.setTimeout(() => setIsVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, [message, variant]);

  if (!isVisible) return null;

  return (
    <div
      role='status'
      aria-live='polite'
      aria-atomic='true'
      className={`fixed top-3 left-3 z-50 ${className}`}
    >
      <div
        className={`rounded-md px-4 py-3 text-sm w-[min(92vw,420px)] ${variantStyles[variant]}`}
      >
        <div className='flex items-start gap-3'>
          <span className='flex-1'>{message}</span>
          <button
            type='button'
            aria-label='بستن'
            className='ms-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/15 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 focus-visible:ring-white'
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
