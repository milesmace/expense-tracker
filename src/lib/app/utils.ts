import type { Category } from '@/types';

export const getExpenseCategories = (allCategories: Category[]) =>
  allCategories.filter((category) => category.type === 'expense');

export const getIncomeCategories = (allCategories: Category[]) =>
  allCategories.filter((category) => category.type === 'income');
