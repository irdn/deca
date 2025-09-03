import './global.css';
import { Vazirmatn } from 'next/font/google';
import { AlertProvider } from '@/components';

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${vazirmatn.variable} antialiased`}>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-blue-600 focus:text-white focus:px-3 focus:py-2'
        >
          پرش به محتوای اصلی
        </a>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
