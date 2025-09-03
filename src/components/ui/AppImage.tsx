'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import * as React from 'react';

export type AppImageProps = NextImageProps;

export function AppImage({ loading, priority, ...rest }: AppImageProps) {
  const effectiveLoading = loading ?? (priority ? undefined : 'lazy');
  const derivedTitle =
    rest.title ?? (typeof rest.alt === 'string' ? rest.alt : undefined);
  return (
    <NextImage
      priority={priority}
      loading={effectiveLoading}
      title={derivedTitle}
      {...rest}
    />
  );
}
