import { User } from './types';

const USER_STORAGE_KEY = 'user-info';

export function saveUserToStorage(user: User): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch {}
}

export function readUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as User;
    if (!parsed?.name || !parsed?.email || !parsed?.picture) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearUserFromStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {}
}
