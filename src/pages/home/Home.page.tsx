import { type FC } from 'react';

import { useAccountsStore } from '@/store';

export const HomePage: FC = () => {
  const { accounts, isLoading } = useAccountsStore();

  return isLoading ? (
    'Loading...'
  ) : (
    <div>
      <pre className="max-w-full break-words whitespace-pre-wrap">
        <code className="block">{JSON.stringify(accounts, null, 2)}</code>
      </pre>
    </div>
  );
};
