import { useEffect, type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { APP_ROUTES } from '@/constants';
import { DefaultLayout } from '@/layouts';
import { useAccountsApi, useCategoriesApi } from '@/services';
import {
  selectAuth,
  useAccountsStore,
  useAuthStore,
  useCategoryStore,
} from '@/store';

export const ProtectedRoute: FC = () => {
  const auth = useAuthStore(selectAuth);
  const { addAccount } = useAccountsStore();
  const { addCategory } = useCategoryStore();
  const {
    fetchAccountsQuery: { data: accounts },
  } = useAccountsApi();
  const {
    fetchCategoriesQuery: { data: categories },
  } = useCategoriesApi();

  useEffect(() => {
    // Add Accounts
    if (accounts) {
      accounts.forEach((account) => addAccount(account));
    }

    // Add Categories
    if (categories) {
      categories.forEach((category) => addCategory(category));
    }
  }, [accounts, categories, addAccount, addCategory]);

  if (!auth.isLoggedIn) {
    return <Navigate to={APP_ROUTES.LOGIN} />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};
