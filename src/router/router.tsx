import { createBrowserRouter } from 'react-router-dom';

import { HomePage, LoginPage } from '@/pages';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <HomePage />,
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
