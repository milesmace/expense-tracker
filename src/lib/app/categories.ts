import type { PostgrestError } from '@supabase/supabase-js';

import { SUPABASE_CONSTANTS } from '@/constants';
import { useAuthStore } from '@/store';
import { supabase } from '@/supabase';
import type { Category, Res } from '@/types';

export const createCategory = async (
  category: Omit<Category, 'id'>,
): Promise<Res<PostgrestError | object>> => {
  const { auth } = useAuthStore.getState();

  if (!auth.isLoggedIn) {
    throw new Error('User not logged in!!');
  }

  const {
    user: { id: userId },
  } = auth.session;

  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
    .insert({ ...category, user_id: userId });

  return {
    success: !error,
    data: error ?? 'Category created successfully',
  };
};

export const updateCategory = async (
  categoryId: number,
  Category: Partial<Omit<Category, 'id'>>,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
    .update({ ...Category })
    .eq(SUPABASE_CONSTANTS.TABLES.CATEGORIES.ID, categoryId);

  return {
    success: !error,
    data: error ?? 'Category updated successfully',
  };
};

export const deleteCategory = async (
  categoryId: number,
): Promise<Res<PostgrestError | object>> => {
  const { error } = await supabase
    .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
    .delete()
    .eq(SUPABASE_CONSTANTS.TABLES.CATEGORIES.ID, categoryId);

  return {
    success: !error,
    data: error ?? 'Category deleted succesffully',
  };
};
