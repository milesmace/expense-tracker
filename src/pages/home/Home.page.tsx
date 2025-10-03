import { type FC } from 'react';

import { useAccountsApi } from '@/services';

export const HomePage: FC = () => {
  const {
    fetchAccountsQuery: { isFetching, data: accounts },
  } = useAccountsApi();

  return isFetching ? (
    'Loading...'
  ) : (
    <div>
      <pre className="max-w-full break-words whitespace-pre-wrap">
        <code className="block">{JSON.stringify(accounts, null, 2)}</code>
      </pre>
    </div>
  );
};
