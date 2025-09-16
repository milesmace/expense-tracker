import { useEffect, type FC, type ReactNode } from 'react';

import { SUPABASE_CONSTANTS } from '@/constants';
import { DefaultLayout } from '@/layouts';
import {
  selectAuth,
  useAccountsStore,
  useAuthStore,
  useCategoryStore,
} from '@/store';
import { supabase } from '@/supabase';
import type { Account, Category } from '@/types';

export const ProtectedRoute: FC<{ children?: ReactNode }> = ({ children }) => {
  const auth = useAuthStore(selectAuth);
  const { accounts, addAccount } = useAccountsStore();
  const { addCategory } = useCategoryStore();

  // Fetch the data from supabase
  useEffect(() => {
    // Accounts
    (async () => {
      const { data, error } = await supabase
        .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS)
        .select();

      // Set the zustand store
      if (!error) {
        (data as Account[]).forEach((account) => {
          addAccount(account);
        });
      }
    })();

    // Categories
    (async () => {
      const { data, error } = await supabase
        .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES)
        .select();

      // Set the zustand store
      if (!error) {
        (data as Category[]).forEach((category) => addCategory(category));
      }
    })();
  }, [addAccount, addCategory]);

  return (
    <DefaultLayout>
      {children}
      <pre className="max-w-full break-words whitespace-pre-wrap">
        <code className="block">{JSON.stringify(accounts, null, 2)}</code>
      </pre>
      <pre className="max-w-full break-words whitespace-pre-wrap">
        <code className="block">{JSON.stringify(auth, null, 2)}</code>
      </pre>
    </DefaultLayout>
  );
};
