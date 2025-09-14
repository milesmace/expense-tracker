import { useCallback, useEffect, type FC } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Laptop, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui';
import { THEME } from '@/constants';
import { useThemeStore } from '@/store';

export const ToggleTheme: FC = () => {
  // Hooks
  const { theme } = useThemeStore();

  // Effects
  /** Handle dark theme */
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
  }, [theme]);

  // Callbacks
  const renderThemeButton = useCallback(() => {
    switch (theme) {
      case THEME.LIGHT:
        return (
          <>
            <Sun />
            Light
          </>
        );
      case THEME.DARK:
        return (
          <>
            <Moon />
            Dark
          </>
        );
      case THEME.SYSTEM:
        return (
          <>
            <Laptop />
            System
          </>
        );
      default:
        return null;
    }
  }, [theme]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">{renderThemeButton()}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button variant="outline">
              <Sun /> Light
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="outline">
              <Moon /> Dark
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="outline">
              <Laptop /> System
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
