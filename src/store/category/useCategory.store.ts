import { create } from 'zustand';

import type { Category } from '@/types';

import type { CategoryStore } from './useCategory.store.types';

export const useCategoryStore = create<CategoryStore>((set) => ({
  // State
  categories: {},
  isLoading: false,

  // Reducers
  addCategory: (category: Category) =>
    set((state) => ({
      categories: { ...state.categories, [category.id]: category },
    })),
  removeCategory: (categoryId: number) =>
    set((state) => {
      const final = state.categories;
      delete final[categoryId];

      return {
        categories: final,
      };
    }),
}));

// Category Selector
export const selectCategories = (store: CategoryStore) => store.categories;
