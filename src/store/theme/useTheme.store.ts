import { create } from 'zustand';

import { config } from '@/config';
import { STORAGE, THEME } from '@/constants';
import type { Theme } from '@/types';
import { loadFromStorage } from '@/utils';

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

const defaultTheme: Theme = loadFromStorage<Theme>(STORAGE.THEME, config.theme);

/** Theme Store */
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: defaultTheme,

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
    })),
  setLightTheme: () => set({ theme: THEME.LIGHT }),
  setDarkTheme: () => set({ theme: THEME.DARK }),
}));

/** Theme Selector */
export const selectTheme = (store: ThemeStore) => store.theme;
