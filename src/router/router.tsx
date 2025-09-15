import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout } from '@/layouts';
import { LoginPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
