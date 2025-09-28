import { createBrowserRouter } from 'react-router-dom';

import {
  ExpensePage,
  HomePage,
  IncomePage,
  LoginPage,
  TransactionPage,
} from '@/pages';

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
      {
        path: '/expense',
        element: <ExpensePage />,
      },
      {
        path: '/income',
        element: <IncomePage />,
      },
      {
        path: '/transaction',
        element: <TransactionPage />,
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
