import type { PostgrestError } from '@supabase/supabase-js';

import { SUPABASE_CONSTANTS } from '@/constants';
import { useAuthStore } from '@/store';
import { supabase } from '@/supabase';
import type { Income, Res } from '@/types';

export const createIncome = async (
  income: Omit<Income, 'id'>,
): Promise<Res<PostgrestError | object>> => {
  const { auth } = useAuthStore.getState();

  if (!auth.isLoggedIn) {
    throw new Error('User not logged in!!');
  }

  const {
    user: { id: userId },
  } = auth.session;

  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.INCOMES._)
    .insert({ ...income, user_id: userId });

  return {
    success: !error,
    data: error?.message ?? 'Category created successfully',
  };
};

export const updateIncome = async (
  expenseId: number,
  expense: Partial<Omit<Income, 'id'>>,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.INCOMES._)
    .update({ ...expense })
    .eq(SUPABASE_CONSTANTS.TABLES.INCOMES.ID, expenseId);

  return {
    success: !error,
    data: error ?? 'Expense updated successfully',
  };
};

export const deleteIncome = async (
  incomeId: number,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.INCOMES._)
    .delete()
    .eq(SUPABASE_CONSTANTS.TABLES.INCOMES.ID, incomeId);

  return {
    success: !error,
    data: error ?? 'Income deleted succesffully',
  };
};
