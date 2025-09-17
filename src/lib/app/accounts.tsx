import { SUPABASE_CONSTANTS } from '@/constants';
import { useAuthStore } from '@/store';
import { supabase } from '@/supabase';
import type { Account, Res } from '@/types';

import type { PostgrestError } from '@supabase/supabase-js';

export const createAccount = async (
  account: Omit<Account, 'id'>,
): Promise<Res<PostgrestError | object>> => {
  const { auth } = useAuthStore.getState();

  if (!auth?.user) {
    throw new Error('User not logged in!!');
  }

  const {
    user: { id: userId },
  } = auth;

  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
    .insert({ ...account, user_id: userId });

  return {
    success: !error,
    data: error ?? 'Account created successfully',
  };
};

export const updateAccount = async (
  accountId: number,
  account: Partial<Omit<Account, 'id'>>,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
    .update({ ...account })
    .eq(SUPABASE_CONSTANTS.TABLES.ACCOUNTS.ID, accountId);

  return {
    success: !error,
    data: error ?? 'Account updated successfully',
  };
};

export const deleteAccount = async (
  accountId: number,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.ACCOUNTS._)
    .delete()
    .eq(SUPABASE_CONSTANTS.TABLES.ACCOUNTS.ID, accountId);

  return {
    success: !error,
    data: error ?? 'Account deleted succesffully',
  };
};
