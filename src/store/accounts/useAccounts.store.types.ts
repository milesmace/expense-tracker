import type { Account } from '@/types';

export type AccountsStore = {
  accounts: Record<number, Account>;

  addAccount: (account: Account) => void;
  removeAccount: (accountId: number) => void;
};
