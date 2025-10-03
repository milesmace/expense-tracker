import { SUPABASE_CONSTANTS } from '@/constants';
import { authQuery } from '@/services';
import { supabase } from '@/supabase';
import type { Income } from '@/types';

// Fetch all incomes for the logged-in user
export const fetchIncomes = () =>
  authQuery(async (userId) => {
    const { error, data: incomes } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.INCOMES._)
      .select()
      .eq(SUPABASE_CONSTANTS.TABLES.INCOMES.USER_ID, userId);

    if (error) throw new Error(error.message);
    return incomes as Income[];
  });

// Create a new income
export const createIncome = (income: Omit<Income, 'id'>) =>
  authQuery(async (userId) => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.INCOMES._)
      .insert({ ...income, user_id: userId });

    if (error) throw new Error(error.message);
    return null;
  });

// Update an existing income
export const updateIncome = ({
  incomeId,
  income,
}: {
  incomeId: number;
  income: Partial<Omit<Income, 'id'>>;
}) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.INCOMES._)
      .update({ ...income })
      .eq(SUPABASE_CONSTANTS.TABLES.INCOMES.ID, incomeId);

    if (error) throw new Error(error.message);
    return null;
  });

// Delete an income
export const deleteIncome = (incomeId: number) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.INCOMES._)
      .delete()
      .eq(SUPABASE_CONSTANTS.TABLES.INCOMES.ID, incomeId);

    if (error) throw new Error(error.message);
    return null;
  });
