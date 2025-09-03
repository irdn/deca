import * as React from 'react';
import { AppImage } from '@/components';

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      id='main-content'
      role='main'
      className='min-h-screen grid grid-cols-1 lg:grid-cols-2'
    >
      <section className='relative flex items-center justify-center px-6 py-10'>
        <div className='w-full max-w-md'>{children}</div>
      </section>
      <section className='relative hidden lg:block'>
        <AppImage
          src='/static/login-page-background.jpg'
          alt='Login background'
          className='absolute inset-0 h-full w-full object-cover'
          fill
          sizes='(max-width: 1024px) 0px, 50vw'
        />
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-black/40 mix-blend-multiply'
        />
      </section>
    </main>
  );
}
