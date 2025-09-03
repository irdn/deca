import type { User } from '../types';
import { apiRequest, API_CONFIG } from './base';

export async function fetchRandomUser(): Promise<User> {
  const url = `${API_CONFIG.baseUrl}/?results=1&nat=us`;
  const data = await apiRequest<{ results: User[] }>(url);
  const user = data.results?.[0];
  if (!user) throw new Error('No user data returned');
  return user;
}
