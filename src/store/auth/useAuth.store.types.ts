import type { AuthSession } from '@/types';

export type AuthStoreStateType = AuthSession & {
  isLoggedIn: boolean;
};

export type AuthStoreType = {
  auth: AuthStoreStateType | null;
  login: (payload: AuthSession) => void;
  logout: () => void;
};
