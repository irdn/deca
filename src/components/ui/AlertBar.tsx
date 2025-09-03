'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive',
        success:
          'border-green-500/50 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-950 dark:text-green-300',
        info: 'border-blue-500/50 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AlertBarVariant = 'success' | 'error' | 'info' | 'default';

export interface AlertBarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  variant?: AlertBarVariant;
  autoClose?: boolean;
  autoCloseDelay?: number;
  onClose?: () => void;
}

export function AlertBar({
  message,
  variant = 'info',
  className,
  autoClose = true,
  autoCloseDelay = 3000,
  onClose,
  ...props
}: AlertBarProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    setIsVisible(true);
    if (autoClose) {
      const timer = window.setTimeout(
        () => setIsVisible(false),
        autoCloseDelay
      );
      return () => window.clearTimeout(timer);
    }
  }, [message, variant, autoClose, autoCloseDelay]);

  if (!isVisible) return null;

  const mappedVariant: 'default' | 'destructive' | 'success' | 'info' =
    variant === 'error' ? 'destructive' : variant;

  return (
    <div
      role='status'
      aria-live='polite'
      aria-atomic='true'
      className='fixed top-3 left-3 z-50 w-[min(92vw,420px)]'
    >
      <div
        className={cn(alertVariants({ variant: mappedVariant }), className)}
        {...props}
      >
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className='absolute left-3 top-3 text-current opacity-70 hover:opacity-100'
            aria-label='Close alert'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
    </div>
  );
}
