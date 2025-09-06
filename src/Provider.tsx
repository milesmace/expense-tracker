import type { FC, ReactNode } from 'react';

import { Toaster } from 'sonner';

type ProviderProps = {
  children?: ReactNode;
};

export const Provider: FC<ProviderProps> = ({ children }) => (
  <>
    <Toaster richColors />
    {children}
  </>
);
