import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  updateExpense,
} from '@/lib/app';

export const useExpensesApi = () => {
  // Fetch
  const fetchExpensesQuery = useQuery({
    queryFn: fetchExpenses,
    queryKey: ['expenses'],
    enabled: false,
  });
  const queryClient = useQueryClient();

  // Create
  const addExpenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  // Update
  const updateExpenseMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  // Delete
  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  return {
    fetchExpensesQuery,
    addExpenseMutation,
    updateExpenseMutation,
    deleteExpenseMutation,
  };
};
