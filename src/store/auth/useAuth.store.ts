import { create } from 'zustand';

import type { Session } from '@supabase/supabase-js';

import { STORAGE } from '@/constants';
import { loadFromStorage } from '@/utils';

import { type AuthStoreType } from './useAuth.store.types';

const initialState = loadFromStorage<Session>(STORAGE.AUTH());

export const useAuthStore = create<AuthStoreType>((set) => ({
  // State
  auth: initialState
    ? { isLoggedIn: true, session: initialState }
    : { isLoggedIn: false, session: null },

  // Reducers
  login: (payload) => set({ auth: { isLoggedIn: true, session: payload } }),
  logout: () => set({ auth: { isLoggedIn: false, session: null } }),
}));

// Auth Selector
export const selectAuth = (state: AuthStoreType) => state.auth;
