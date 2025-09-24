import type { Session } from '@supabase/supabase-js';

export type AuthStoreStateType =
  | {
      isLoggedIn: true;
      session: Session;
    }
  | { isLoggedIn: false; session: null };

export type AuthStoreType = {
  auth: AuthStoreStateType;
  login: (payload: Session) => void;
  logout: () => void;
};
