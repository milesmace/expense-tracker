import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ToggleTheme } from '@/containers';

export const DefaultLayout: FC = () => (
  <div className="font-poppins flex min-h-screen flex-col">
    <main className="max-w-app mx-auto w-full grow">
      <Outlet />
    </main>

    <footer className="border-t">
      <div className="max-w-app mx-auto w-full p-4">
        <div className="justify-self-end">
          <ToggleTheme />
        </div>
      </div>
    </footer>
  </div>
);
