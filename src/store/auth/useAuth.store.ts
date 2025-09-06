import { create } from 'zustand';

import { STORAGE } from '@/constants';
import { type AuthSession } from '@/types';
import { loadFromStorage } from '@/utils';

import { type AuthStoreType } from './useAuth.store.types';

const initialState = loadFromStorage<AuthSession>(STORAGE.AUTH);

export const useAuthStore = create<AuthStoreType>((set) => ({
  auth: initialState ? { isLoggedIn: true, ...initialState } : null,

  login: (payload) => set({ auth: { isLoggedIn: true, ...payload } }),
  logout: () => set({ auth: null }),
}));

export const selectAuth = (state: AuthStoreType) => state.auth;
