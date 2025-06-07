export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  selectedIcon?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    expenses: number;
  };
}

export interface Expense {
  id: number;
  title: string;
  amount: number;
  description?: string;
  categoryId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
}

export interface CreateExpenseRequest {
  title: string;
  amount: number;
  description?: string;
  categoryId: number;
  date?: string;
}

export interface UpdateExpenseRequest {
  title?: string;
  amount?: number;
  description?: string;
  categoryId?: number;
  date?: string;
}