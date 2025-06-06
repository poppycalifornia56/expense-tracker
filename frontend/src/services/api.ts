import axios from 'axios';
import type {
  Category,
  Expense,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateExpenseRequest,
  UpdateExpenseRequest
} from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoryAPI = {
  getAll: () => api.get<Category[]>('/categories'),
  getById: (id: number) => api.get<Category>(`/categories/${id}`),
  create: (data: CreateCategoryRequest) => api.post<Category>('/categories', data),
  update: (id: number, data: UpdateCategoryRequest) => api.put<Category>(`/categories/${id}`, data),
  delete: (id: number) => api.delete(`/categories/${id}`),
};

export const expenseAPI = {
  getAll: () => api.get<Expense[]>('/expenses'),
  getById: (id: number) => api.get<Expense>(`/expenses/${id}`),
  create: (data: CreateExpenseRequest) => api.post<Expense>('/expenses', data),
  update: (id: number, data: UpdateExpenseRequest) => api.put<Expense>(`/expenses/${id}`, data),
  delete: (id: number) => api.delete(`/expenses/${id}`),
};