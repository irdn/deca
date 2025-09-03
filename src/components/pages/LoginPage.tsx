'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Heading, useAlert } from '@/components';
import {
  validateIranianMobile,
  saveUserToStorage,
  readUserFromStorage,
  fetchRandomUser,
} from '@/lib';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = React.useState('');
  const [error, setError] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(false);
  const phoneInputRef = React.useRef<HTMLInputElement>(null);

  const { showAlert } = useAlert();

  React.useEffect(() => {
    const user = readUserFromStorage();
    if (user) {
      router.replace('/panel');
    }
    phoneInputRef.current?.focus();
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateIranianMobile(phone);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    setError(undefined);
    setLoading(true);
    try {
      const apiUser = await fetchRandomUser();
      saveUserToStorage({
        name: apiUser.name,
        email: apiUser.email,
        picture: apiUser.picture,
      });
      showAlert('ورود با موفقیت انجام شد.', 'success');
      router.replace('/panel');
    } catch (err) {
      showAlert('ورود ناموفق بود. لطفاً دوباره تلاش کنید.', 'error');
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='rounded-xl bg-white p-6 shadow-xl w-full'>
      <Heading id='login-title' level={1} className='mb-6'>
        ورود به پنل
      </Heading>
      <form
        onSubmit={onSubmit}
        className='space-y-4'
        noValidate
        aria-labelledby='login-title'
      >
        <Input
          label='شماره موبایل'
          ref={phoneInputRef}
          placeholder='09XX XXX XXXX'
          inputMode='tel'
          autoComplete='tel'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={error}
          aria-label='شماره موبایل'
          dir='ltr'
        />
        <Button
          type='submit'
          loading={loading}
          disabled={loading}
          className='w-full'
        >
          ورود
        </Button>
      </form>
    </div>
  );
}
