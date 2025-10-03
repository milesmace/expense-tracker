import { SUPABASE_CONSTANTS } from '@/constants';
import { authQuery } from '@/services';
import { supabase } from '@/supabase';
import type { Account } from '@/types';

export const fetchAccounts = () =>
  authQuery(async (userId) => {
    const { error, data: accounts } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
      .select()
      .eq(SUPABASE_CONSTANTS.TABLES.ACCOUNTS.USER_ID, userId);

    if (error) throw new Error(error.message);
    return accounts as Account[];
  });

export const createAccount = (account: Omit<Account, 'id'>) =>
  authQuery(async (userId) => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
      .insert({ ...account, user_id: userId });

    if (error) throw new Error(error.message);
    return null;
  });

export const updateAccount = ({
  account,
  accountId,
}: {
  accountId: number;
  account: Partial<Omit<Account, 'id'>>;
}) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
      .update({ ...account })
      .eq(SUPABASE_CONSTANTS.TABLES.ACCOUNTS.ID, accountId);

    if (error) throw new Error(error.message);
    return null;
  });

export const deleteAccount = (accountId: number) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
      .delete()
      .eq(SUPABASE_CONSTANTS.TABLES.ACCOUNTS.ID, accountId);

    if (error) throw new Error(error.message);
    return null;
  });
