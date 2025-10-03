import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '@/lib/app';

export const useCategoriesApi = () => {
  const queryClient = useQueryClient();

  // Fetch
  const fetchCategoriesQuery = useQuery({
    queryFn: fetchCategories,
    queryKey: ['categories'],
  });

  // Create
  const addCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Update
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  // Delete
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    addCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
    fetchCategoriesQuery,
  };
};
