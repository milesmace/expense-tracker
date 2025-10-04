import type { FC } from 'react';

import { Button, Dialog, DialogContent, DialogTrigger } from '@/components/ui';
import {
  NewExpenseContainer,
  NewIncomeContainer,
  NewTransactionContainer,
} from '@/containers';

import { AccountsListingCard } from '../AccountsListingCard';

export const Dashboard: FC = () => {
  // Reusable quick actions config
  const quickActions = [
    { label: 'Add Expense', content: <NewExpenseContainer /> },
    { label: 'Add Income', content: <NewIncomeContainer /> },
    { label: 'Add Transaction', content: <NewTransactionContainer /> },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="px-2 text-4xl font-bold">Your Dashboard</h1>

      {/* Accounts Listing */}
      <AccountsListingCard />

      {/* Quick Actions */}
      <div className="flex flex-col gap-4 px-2">
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <div className="relative flex flex-wrap justify-between gap-1">
          {quickActions.map(({ label, content }) => (
            <Dialog key={label}>
              <DialogTrigger asChild>
                <Button className="grow cursor-pointer text-nowrap">
                  {label}
                </Button>
              </DialogTrigger>
              <DialogContent>{content}</DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};
