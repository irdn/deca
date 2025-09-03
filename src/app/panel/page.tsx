import PanelPage from '@/components/pages/PanelPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پنل کاربری',
  description: 'صفحه پنل کاربری',
};

export default function Page() {
  return <PanelPage />;
}
