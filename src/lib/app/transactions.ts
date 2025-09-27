import type { PostgrestError } from '@supabase/supabase-js';

import { SUPABASE_CONSTANTS } from '@/constants';
import { useAuthStore } from '@/store';
import { supabase } from '@/supabase';
import type { Res, Transaction } from '@/types';

export const createTransaction = async (
  transaction: Omit<Transaction, 'id'>,
): Promise<Res<PostgrestError>> => {
  console.log('creating transaction...');
  const { auth } = useAuthStore.getState();

  if (!auth.isLoggedIn) {
    return {
      success: false,
      data: 'User not logged in!!',
    };
  }

  const {
    user: { id: userId },
  } = auth.session;

  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS._)
    .insert({ ...transaction, user_id: userId });

  return {
    success: !error,
    data: error?.message ?? 'Transaction created successfully',
  };
};

export const updateTransaction = async (
  transactionId: number,
  transaction: Partial<Omit<Transaction, 'id'>>,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS._)
    .update({ ...transaction })
    .eq(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS.ID, transactionId);

  return {
    success: !error,
    data: error ?? 'Transaction updated successfully',
  };
};

export const deleteTransaction = async (
  transactionId: number,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS._)
    .delete()
    .eq(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS.ID, transactionId);

  return {
    success: !error,
    data: error ?? 'Transaction deleted succesffully',
  };
};
