import type { FC, ReactNode } from 'react';

import { ToggleTheme } from '@/containers';

export const DefaultLayout: FC<{ children?: ReactNode }> = ({ children }) => (
  <div className="font-poppins flex min-h-screen flex-col">
    <main className="max-w-app mx-auto w-full grow">{children}</main>

    <footer className="border-t">
      <div className="max-w-app mx-auto w-full p-4">
        <div className="justify-self-end">
          <ToggleTheme />
        </div>
      </div>
    </footer>
  </div>
);
