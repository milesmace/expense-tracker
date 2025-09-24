import { useEffect, type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { APP_ROUTES, SUPABASE_CONSTANTS } from '@/constants';
import { DefaultLayout } from '@/layouts';
import {
  selectAuth,
  useAccountsStore,
  useAuthStore,
  useCategoryStore,
} from '@/store';
import { supabase } from '@/supabase';
import type { Account, Category } from '@/types';

export const ProtectedRoute: FC = () => {
  const auth = useAuthStore(selectAuth);
  const { addAccount } = useAccountsStore();
  const { addCategory } = useCategoryStore();

  // Fetch the data from supabase
  useEffect(() => {
    // Accounts
    (async () => {
      useAccountsStore.setState({ isLoading: true });
      const { data, error } = await supabase
        .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
        .select();

      // Set the zustand store
      if (!error) {
        (data as Account[]).forEach((account) => {
          addAccount(account);
        });
      }
      useAccountsStore.setState({ isLoading: false });
    })();

    // Categories
    (async () => {
      useCategoryStore.setState({ isLoading: true });
      const { data, error } = await supabase
        .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
        .select();

      // Set the zustand store
      if (!error) {
        (data as Category[]).forEach((category) => addCategory(category));
      }
      useCategoryStore.setState({ isLoading: false });
    })();
  }, [addAccount, addCategory]);

  if (!auth.isLoggedIn) {
    return <Navigate to={APP_ROUTES.LOGIN} />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};
