import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createIncome,
  deleteIncome,
  fetchIncomes,
  updateIncome,
} from '@/lib/app';

export const useIncomesApi = () => {
  // Fetch
  const fetchIncomesQuery = useQuery({
    queryFn: fetchIncomes,
    queryKey: ['incomes'],
    enabled: false,
  });
  const queryClient = useQueryClient();

  // Create
  const addIncomeMutation = useMutation({
    mutationFn: createIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  // Update
  const updateIncomeMutation = useMutation({
    mutationFn: updateIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  // Delete
  const deleteIncomeMutation = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  return {
    fetchIncomesQuery,
    addIncomeMutation,
    updateIncomeMutation,
    deleteIncomeMutation,
  };
};
