import { SUPABASE_CONSTANTS } from '@/constants';
import { authQuery } from '@/services';
import { supabase } from '@/supabase';
import type { Transaction } from '@/types';

// Fetch all transactions for the logged-in user
export const fetchTransactions = () =>
  authQuery(async (userId) => {
    const { error, data: transactions } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS._)
      .select()
      .eq(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS.USER_ID, userId);

    if (error) throw new Error(error.message);
    return transactions as Transaction[];
  });

// Create a new transaction
export const createTransaction = (transaction: Omit<Transaction, 'id'>) =>
  authQuery(async (userId) => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS._)
      .insert({ ...transaction, user_id: userId });

    if (error) throw new Error(error.message);
    return null;
  });

// Update an existing transaction
export const updateTransaction = ({
  transactionId,
  transaction,
}: {
  transactionId: number;
  transaction: Partial<Omit<Transaction, 'id'>>;
}) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS._)
      .update({ ...transaction })
      .eq(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS.ID, transactionId);

    if (error) throw new Error(error.message);
    return null;
  });

// Delete a transaction
export const deleteTransaction = (transactionId: number) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS._)
      .delete()
      .eq(SUPABASE_CONSTANTS.TABLES.TRANSACTIONS.ID, transactionId);

    if (error) throw new Error(error.message);
    return null;
  });
