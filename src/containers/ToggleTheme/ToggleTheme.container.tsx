import { useCallback, useEffect, type FC } from 'react';

import { Laptop, Moon, Sun } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { STORAGE, THEME } from '@/constants';
import { useThemeStore } from '@/store';
import { saveToStorage } from '@/utils';

export const ToggleTheme: FC = () => {
  const { theme, setDarkTheme, setLightTheme, setSystemTheme } =
    useThemeStore();

  // Effects
  useEffect(() => {
    const finalTheme =
      theme === THEME.SYSTEM
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? THEME.DARK
          : THEME.LIGHT
        : theme;

    if (finalTheme === THEME.DARK) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    saveToStorage(STORAGE.THEME, theme);
  }, [theme]);

  // Callbacks
  const renderThemeButton = useCallback(() => {
    switch (theme) {
      case THEME.LIGHT:
        return (
          <>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </>
        );
      case THEME.DARK:
        return (
          <>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </>
        );
      case THEME.SYSTEM:
        return (
          <>
            <Laptop className="mr-2 h-4 w-4" />
            System
          </>
        );
      default:
        return null;
    }
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{renderThemeButton()}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onSelect={setLightTheme}>
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={setDarkTheme}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={setSystemTheme}>
          <Laptop className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
