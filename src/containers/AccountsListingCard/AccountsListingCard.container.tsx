import { useEffect, useState, useMemo, type FC } from 'react';

import { ArrowDown } from 'lucide-react';

import { Card } from '@/components/app';
import { Skeleton } from '@/components/ui';
import { Each } from '@/components/utils';
import { cn } from '@/lib/utils';
import { useAccountsApi } from '@/services';
import type { Account, SortOrderType } from '@/types';

import type { SortKey } from './AccountsListingCard.types';
import { formatCurrency } from '@/utils';

export const AccountsListingCard: FC = () => {
  // Hooks
  const {
    fetchAccountsQuery: {
      data: fetchedAccounts,
      isFetching: isAccountsLoading,
    },
  } = useAccountsApi();

  // Local State
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

  // Load fetched accounts
  useEffect(() => {
    if (fetchedAccounts) {
      setAccounts(fetchedAccounts);
    }
  }, [fetchedAccounts]);

  // Memoized sorted accounts
  const sortedAccounts = useMemo(() => {
    if (!sortBy) return accounts;

    return [...accounts].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === 'balance') {
        return sortOrder === 'asc'
          ? a.balance - b.balance
          : b.balance - a.balance;
      }
      return 0;
    });
  }, [accounts, sortBy, sortOrder]);

  // Helper: toggle sorting
  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      // toggle asc ↔ desc
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  return (
    <Card
      title="Your Accounts"
      info="You can manage your accounts from Settings"
    >
      <div className="text-base">
        {/* HEADERS */}
        <div className="mb-2 flex justify-between gap-2 font-medium">
          {isAccountsLoading ? (
            <>
              <Skeleton className="h-7 w-32 rounded-md" />
              <Skeleton className="h-7 w-20 rounded-md" />
            </>
          ) : (
            <>
              {/* Account Name */}
              <button
                className={cn(
                  'group flex cursor-pointer items-center gap-1 rounded-md p-1 px-2 uppercase',
                  'hover:bg-slate-100 dark:hover:bg-zinc-800',
                )}
                onClick={() => handleSort('name')}
              >
                <span>Account Name</span>
                <ArrowDown
                  className={cn(
                    'invisible size-4 transition-transform group-hover:visible',
                    sortBy === 'name' && 'visible',
                    sortOrder === 'desc' && 'rotate-180',
                  )}
                />
              </button>

              {/* Balance */}
              <button
                className={cn(
                  'group flex cursor-pointer items-center gap-1 rounded-md p-1 px-2 uppercase',
                  'hover:bg-slate-100 dark:hover:bg-zinc-800',
                )}
                onClick={() => handleSort('balance')}
              >
                <span>Balance</span>
                <ArrowDown
                  className={cn(
                    'invisible size-4 transition-transform group-hover:visible',
                    sortBy === 'balance' && 'visible',
                    sortOrder === 'desc' && 'rotate-180',
                  )}
                />
              </button>
            </>
          )}
        </div>

        {/* ROWS */}
        <div className="scrollbar-thin flex max-h-60 flex-col gap-0.5 overflow-y-auto font-normal">
          {isAccountsLoading ? (
            <Each
              of={Array.from({ length: 5 })}
              render={(_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded-md" />
              )}
            />
          ) : (
            <Each
              of={sortedAccounts}
              render={(account) => (
                <div
                  key={account.id}
                  className="flex cursor-pointer justify-between gap-2 rounded-md p-2 even:bg-slate-100 hover:bg-slate-100/50 dark:even:bg-zinc-800 dark:hover:bg-zinc-800/80"
                >
                  <p>{account.name}</p>
                  <p>{formatCurrency(account.balance)}</p>
                </div>
              )}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
