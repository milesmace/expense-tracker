import { useEffect, type FC, type ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { selectTheme, useAuthStore, useThemeStore } from './store';
import { supabase } from './supabase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type ProviderProps = {
  children?: ReactNode;
};

export const Provider: FC<ProviderProps> = ({ children }) => {
  const { login } = useAuthStore();
  const theme = useThemeStore(selectTheme);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        login(session);
      }
    })();
  }, [login]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" offset={20} richColors theme={theme} />
        {children}
      </QueryClientProvider>
    </>
  );
};
