import { createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '@/pages';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: 'Hello',
      },
    ],
  },
  // Public Routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);
