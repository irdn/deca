import Link from 'next/link';
import { Heading } from '@/components/ui';

export default function NotFound() {
  return (
    <main
      className='min-h-[60vh] flex items-center justify-center px-6 py-16'
      role='main'
      aria-labelledby='not-found-title'
      aria-describedby='not-found-desc'
    >
      <div className='text-center'>
        <Heading
          id='not-found-title'
          level={1}
          className='text-4xl font-bold tracking-tight'
        >
          صفحه مورد نظر یافت نشد
        </Heading>
        <p id='not-found-desc' className='mt-4 text-gray-600'>
          آدرسی که وارد کرده‌اید وجود ندارد یا جابجا شده است.
        </p>
        <div className='mt-8 flex items-center justify-center gap-3'>
          <Link
            href='/'
            aria-label='بازگشت به صفحه اصلی'
            className='inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950'
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
