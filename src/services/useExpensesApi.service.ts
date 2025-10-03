import { useMutation, useQuery } from '@tanstack/react-query';

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

  // Create
  const addExpenseMutation = useMutation({ mutationFn: createExpense });

  // Update
  const updateExpenseMutation = useMutation({ mutationFn: updateExpense });

  // Delete
  const deleteExpenseMutation = useMutation({ mutationFn: deleteExpense });

  return {
    fetchExpensesQuery,
    addExpenseMutation,
    updateExpenseMutation,
    deleteExpenseMutation,
  };
};
