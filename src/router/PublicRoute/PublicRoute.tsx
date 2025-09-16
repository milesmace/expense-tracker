import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { APP_ROUTES } from '@/constants';
import { DefaultLayout } from '@/layouts';
import { selectAuth, useAuthStore } from '@/store/auth';

export const PublicRoute: FC<{ children?: ReactNode }> = ({ children }) => {
  const auth = useAuthStore(selectAuth);

  // If authenticated, then redirect to HOME
  if (auth) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
};
