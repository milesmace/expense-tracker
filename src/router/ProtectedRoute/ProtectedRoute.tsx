import type { FC, ReactNode } from 'react';

import { DefaultLayout } from '@/layouts';
import { selectAuth, useAuthStore } from '@/store/auth';

export const ProtectedRoute: FC<{ children?: ReactNode }> = ({ children }) => {
  const auth = useAuthStore(selectAuth);

  return (
    <DefaultLayout>
      {children}
      <pre className="max-w-full break-words whitespace-pre-wrap">
        <code className="block">{JSON.stringify(auth, null, 2)}</code>
      </pre>
    </DefaultLayout>
  );
};
