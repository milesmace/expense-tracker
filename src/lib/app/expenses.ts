import { SUPABASE_CONSTANTS } from '@/constants';
import { authQuery } from '@/services';
import { supabase } from '@/supabase';
import type { Expense } from '@/types';

// Fetch all expenses for the logged-in user
export const fetchExpenses = () =>
  authQuery(async (userId) => {
    const { error, data: expenses } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.EXPENSES._)
      .select()
      .eq(SUPABASE_CONSTANTS.TABLES.EXPENSES.USER_ID, userId);

    if (error) throw new Error(error.message);
    return expenses as Expense[];
  });

// Create a new expense
export const createExpense = (expense: Omit<Expense, 'id'>) =>
  authQuery(async (userId) => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.EXPENSES._)
      .insert({ ...expense, user_id: userId });

    if (error) throw new Error(error.message);
    return null;
  });

// Update an existing expense
export const updateExpense = ({
  expenseId,
  expense,
}: {
  expenseId: number;
  expense: Partial<Omit<Expense, 'id'>>;
}) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.EXPENSES._)
      .update({ ...expense })
      .eq(SUPABASE_CONSTANTS.TABLES.EXPENSES.ID, expenseId);

    if (error) throw new Error(error.message);
    return null;
  });

// Delete an expense
export const deleteExpense = (expenseId: number) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.EXPENSES._)
      .delete()
      .eq(SUPABASE_CONSTANTS.TABLES.EXPENSES.ID, expenseId);

    if (error) throw new Error(error.message);
    return null;
  });
