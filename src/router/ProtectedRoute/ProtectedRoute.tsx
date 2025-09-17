import { useEffect, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const auth = useAuthStore(selectAuth);
  const { addAccount } = useAccountsStore();
  const { addCategory } = useCategoryStore();

  useEffect(() => {
    // If not authenticated, then redirect to LOGIN
    if (!auth) {
      navigate(APP_ROUTES.LOGIN, { replace: true });
    }
  }, [auth, navigate]);

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

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};
