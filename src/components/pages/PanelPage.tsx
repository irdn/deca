'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Heading,
  useAlert,
  AppImage,
  Card,
  CardContent,
} from '@/components';
import { readUserFromStorage, clearUserFromStorage } from '@/lib';

export default function PanelPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [name, setName] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [pictureUrl, setPictureUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const user = readUserFromStorage();
    if (!user) {
      router.push('/login');
      return;
    }
    setName(user.name.first);
    setEmail(user.email);
    setPictureUrl(user.picture.thumbnail);
  }, [router]);

  function onLogout() {
    router.push('/login');
    clearUserFromStorage();
    showAlert('با موفقیت خارج شدید.', 'success');
  }

  if (!name) return null;

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardContent className='p-6'>
        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          {pictureUrl ? (
            <AppImage
              src={pictureUrl}
              alt={name}
              width={64}
              height={64}
              className='rounded-full outline-2 p-0.5'
              loading='lazy'
              unoptimized
            />
          ) : null}
          <div className='text-center sm:text-right'>
            <Heading level={2}>{`${name} خوش آمدی`}</Heading>
            {email ? (
              <p className='text-sm mt-3 text-muted-foreground'>{email}</p>
            ) : null}
          </div>
          <div className='w-full sm:ms-auto sm:w-auto sm:mt-0 mt-5'>
            <Button className='w-full sm:w-auto' onClick={onLogout}>
              خروج
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
