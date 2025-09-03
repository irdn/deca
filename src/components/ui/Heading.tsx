import * as React from 'react';

import { cn } from '@/lib/utils';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  children: React.ReactNode;
};

const levelToClassName: Record<HeadingLevel, string> = {
  1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
  3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  5: 'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
  6: 'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
};

export function Heading({
  level = 1,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as unknown as React.ElementType;
  const derivedTitle =
    props.title ?? (typeof children === 'string' ? children : undefined);
  return (
    <Tag
      className={cn(levelToClassName[level], className)}
      title={derivedTitle}
      {...props}
    >
      {children}
    </Tag>
  );
}
