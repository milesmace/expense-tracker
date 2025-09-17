import type { FC, ReactNode } from 'react';

import { Toaster } from 'sonner';

import { selectTheme, useThemeStore } from './store';

type ProviderProps = {
  children?: ReactNode;
};

export const Provider: FC<ProviderProps> = ({ children }) => {
  const theme = useThemeStore(selectTheme);

  return (
    <>
      <Toaster position="top-right" offset={20} richColors theme={theme} />
      {children}
    </>
  );
};
