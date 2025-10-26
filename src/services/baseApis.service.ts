import { requiresAuth } from '@/lib/app';

export const authQuery = async <T>(
  fn: (userId: string) => Promise<T>,
): Promise<T> => await fn(requiresAuth());

export const publicQuery = async <T>(fn: () => Promise<T>): Promise<T> =>
  await fn();
