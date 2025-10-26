import { create } from 'zustand';

import type { Account } from '@/types';

import { type AccountsStore } from './useAccounts.store.types';

export const useAccountsStore = create<AccountsStore>((set) => ({
  // State
  accounts: {},
  isLoading: false,

  // Reducers
  addAccount: (account: Account) =>
    set((state) => ({
      accounts: { ...state.accounts, [account.id]: account },
    })),
  removeAccount: (accountId: number) =>
    set((state) => {
      const final = state.accounts;
      delete final[accountId];

      return {
        accounts: final,
      };
    }),
}));

// Account Selector
export const selectAccounts = (store: AccountsStore) => store.accounts;
