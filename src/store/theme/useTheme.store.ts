import { create } from 'zustand';

import { config } from '@/config';
import { STORAGE, THEME } from '@/constants';
import type { Theme } from '@/types';
import { loadFromStorage } from '@/utils';

type ThemeStore = {
  // State
  theme: Theme;

  // Reducers
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setSystemTheme: () => void;
};

const defaultTheme: Theme = loadFromStorage<Theme>(STORAGE.THEME, config.theme);

/** Theme Store */
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: defaultTheme,

  setLightTheme: () => set({ theme: THEME.LIGHT }),
  setDarkTheme: () => set({ theme: THEME.DARK }),
  setSystemTheme: () => set({ theme: THEME.SYSTEM }),
}));

/** Theme Selector */
export const selectTheme = (store: ThemeStore) => store.theme;
