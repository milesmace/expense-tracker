import type { Category } from '@/types';

export type CategoryStore = {
  categories: Record<number, Category>;
  isLoading: boolean;

  addCategory: (category: Category) => void;
  removeCategory: (categoryId: number) => void;
};
