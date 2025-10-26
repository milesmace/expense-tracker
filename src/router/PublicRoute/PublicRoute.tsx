import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { APP_ROUTES } from '@/constants';
import { DefaultLayout } from '@/layouts';
import { selectAuth, useAuthStore } from '@/store';

export const PublicRoute: FC = () => {
  const auth = useAuthStore(selectAuth);

  if (auth.isLoggedIn) {
    return <Navigate to={APP_ROUTES.HOME} />;
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};
