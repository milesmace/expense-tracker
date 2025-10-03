import type { Category, Res } from '@/types';

export const getExpenseCategories = (allCategories: Category[]) =>
  allCategories.filter((category) => category.type === 'expense');

export const getIncomeCategories = (allCategories: Category[]) =>
  allCategories.filter((category) => category.type === 'income');

export function buildResponse<T, E = Error>(
  data: T | null,
  error: E | null,
  successMsg: string,
): Res<T, E> {
  return {
    success: !error,
    error: error,
    data: data,
    message: successMsg,
  };
}
