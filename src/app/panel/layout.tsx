import * as React from 'react';

export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      id='main-content'
      role='main'
      className='min-h-screen flex items-center justify-center p-6'
    >
      <div className='w-full max-w-lg'>{children}</div>
    </main>
  );
}
