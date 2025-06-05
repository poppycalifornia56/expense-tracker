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