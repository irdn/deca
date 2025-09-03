'use client';

import * as React from 'react';
import { AlertBar, type AlertBarVariant } from '../ui/AlertBar';
import { usePathname } from 'next/navigation';

type Alert = { id: number; message: string; variant: AlertBarVariant };

type AlertContextValue = {
  showAlert: (message: string, variant?: AlertBarVariant) => void;
};

const AlertContext = React.createContext<AlertContextValue | undefined>(
  undefined
);

let nextId = 1;

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem('app.flash');
      if (raw) {
        const { message, variant } = JSON.parse(raw) as {
          message: string;
          variant: AlertBarVariant;
        };
        sessionStorage.removeItem('app.flash');
        if (message) {
          setAlerts((prev) => [
            ...prev,
            { id: nextId++, message, variant: variant || 'info' },
          ]);
        }
      }
    } catch {}
  }, [pathname]);

  const showAlert = React.useCallback(
    (message: string, variant: AlertBarVariant = 'info') => {
      setAlerts((prev) => [...prev, { id: nextId++, message, variant }]);
    },
    []
  );

  const onClose = React.useCallback((id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value = React.useMemo(() => ({ showAlert }), [showAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <div aria-live='polite' aria-atomic='true'>
        {alerts.map((a) => (
          <AlertBar
            key={a.id}
            message={a.message}
            variant={a.variant}
            onClose={() => onClose(a.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = React.useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
}

export function showAlert(message: string, variant: AlertBarVariant = 'info') {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('app.flash', JSON.stringify({ message, variant }));
  } catch {}
}
