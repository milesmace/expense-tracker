import { SUPABASE_CONSTANTS } from '@/constants';
import { authQuery } from '@/services';
import { supabase } from '@/supabase';
import type { Category } from '@/types';

// Fetch all categories for the logged-in user
export const fetchCategories = () =>
  authQuery(async (userId) => {
    const { error, data: categories } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
      .select()
      .eq(SUPABASE_CONSTANTS.TABLES.CATEGORIES.USER_ID, userId);

    if (error) throw new Error(error.message);
    return categories as Category[];
  });

// Create a new category
export const createCategory = (category: Omit<Category, 'id'>) =>
  authQuery(async (userId) => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
      .insert({ ...category, user_id: userId });

    if (error) throw new Error(error.message);
    return null;
  });

// Update an existing category
export const updateCategory = ({
  categoryId,
  category,
}: {
  categoryId: number;
  category: Partial<Omit<Category, 'id'>>;
}) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
      .update({ ...category })
      .eq(SUPABASE_CONSTANTS.TABLES.CATEGORIES.ID, categoryId);

    if (error) throw new Error(error.message);
    return null;
  });

// Delete a category
export const deleteCategory = (categoryId: number) =>
  authQuery(async () => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.TABLES.CATEGORIES._)
      .delete()
      .eq(SUPABASE_CONSTANTS.TABLES.CATEGORIES.ID, categoryId);

    if (error) throw new Error(error.message);
    return null;
  });
