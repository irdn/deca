import LoginPage from '@/components/pages/LoginPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ورود به پنل',
  description: 'صفحه ورود به پنل',
};

export default function Page() {
  return <LoginPage />;
}
