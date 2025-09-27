export type Account = {
  id: number;
  name: string;
  balance: number;
};

export type CategoryType = 'income' | 'expense';

export type Category = {
  id: number;
  name: string;
  type: CategoryType;
};

export type Expense = {
  id: number;
  name: string;
  amount: number;
  description?: string;
  category: number;
  from_account: number;
};

export type Income = {
  id: number;
  name: string;
  amount: number;
  description?: string;
  category: number;
  to_account: number;
};
