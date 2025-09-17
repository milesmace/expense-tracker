import { useEffect, type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { APP_ROUTES } from '@/constants';
import { DefaultLayout } from '@/layouts';
import { selectAuth, useAuthStore } from '@/store';

export const PublicRoute: FC = () => {
  const navigate = useNavigate();
  const auth = useAuthStore(selectAuth);

  useEffect(() => {
    // If authenticated, then redirect to HOME
    if (auth) {
      navigate(APP_ROUTES.HOME, { replace: true });
    }
  }, [auth, navigate]);

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};
