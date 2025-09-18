import { SUPABASE_CONSTANTS } from '@/constants';
import { useAuthStore } from '@/store';
import { supabase } from '@/supabase';
import type { Expense, Res } from '@/types';

import type { PostgrestError } from '@supabase/supabase-js';

export const createExpense = async (
  category: Omit<Expense, 'id'>,
): Promise<Res<PostgrestError | object>> => {
  const { auth } = useAuthStore.getState();

  if (!auth?.user) {
    throw new Error('User not logged in!!');
  }

  const {
    user: { id: userId },
  } = auth;

  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.EXPENSES._)
    .insert({ ...category, user_id: userId });

  return {
    success: !error,
    data: error ?? 'Category created successfully',
  };
};

export const updateExpense = async (
  expenseId: number,
  expense: Partial<Omit<Expense, 'id'>>,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.EXPENSES._)
    .update({ ...expense })
    .eq(SUPABASE_CONSTANTS.TABLES.EXPENSES.ID, expenseId);

  return {
    success: !error,
    data: error ?? 'Expense updated successfully',
  };
};

export const deleteExpense = async (
  expenseId: number,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.EXPENSES._)
    .delete()
    .eq(SUPABASE_CONSTANTS.TABLES.EXPENSES.ID, expenseId);

  return {
    success: !error,
    data: error ?? 'Expense deleted succesffully',
  };
};
