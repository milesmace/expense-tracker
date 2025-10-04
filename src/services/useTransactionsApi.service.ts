import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from '@/lib/app';

export const useTransactionsApi = () => {
  // Fetch
  const fetchTransactionsQuery = useQuery({
    queryFn: fetchTransactions,
    queryKey: ['transactions'],
    enabled: false,
  });
  const queryClient = useQueryClient();

  // Create
  const addTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  // Update
  const updateTransactionMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  // Delete
  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  return {
    fetchTransactionsQuery,
    addTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation,
  };
};
