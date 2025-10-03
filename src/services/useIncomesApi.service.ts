import { useMutation, useQuery } from '@tanstack/react-query';

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

  // Create
  const addIncomeMutation = useMutation({ mutationFn: createIncome });

  // Update
  const updateIncomeMutation = useMutation({ mutationFn: updateIncome });

  // Delete
  const deleteIncomeMutation = useMutation({ mutationFn: deleteIncome });

  return {
    fetchIncomesQuery,
    addIncomeMutation,
    updateIncomeMutation,
    deleteIncomeMutation,
  };
};
