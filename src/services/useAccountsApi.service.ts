import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAccount,
  deleteAccount,
  fetchAccounts,
  updateAccount,
} from '@/lib/app';

export const useAccountsApi = () => {
  // Hooks
  const queryClient = useQueryClient();

  const fetchAccountsQuery = useQuery({
    queryFn: fetchAccounts,
    queryKey: ['accounts'],
  });

  const addAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  const updateAccountMutation = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  return {
    addAccountMutation,
    deleteAccountMutation,
    fetchAccountsQuery,
    updateAccountMutation,
  };
};
