import * as React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  children: React.ReactNode;
};

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const levelToClassName: Record<HeadingLevel, string> = {
  1: 'text-2xl font-semibold text-gray-900',
  2: 'text-xl font-semibold text-gray-900',
  3: 'text-lg font-semibold text-gray-900',
  4: 'text-base font-semibold text-gray-900',
  5: 'text-sm font-semibold text-gray-900',
  6: 'text-xs font-semibold text-gray-900',
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
      className={cx(levelToClassName[level], className)}
      title={derivedTitle}
      {...props}
    >
      {children}
    </Tag>
  );
}
