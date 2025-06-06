import React, { useState, useEffect } from 'react';
import type { Category, Expense } from './types';
import { categoryAPI, expenseAPI } from './services/api';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'expenses' | 'categories'>('expenses');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesRes, categoriesRes] = await Promise.all([
        expenseAPI.getAll(),
        categoryAPI.getAll()
      ]);
      setExpenses(expensesRes.data);
      setCategories(categoriesRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseSubmit = async (expenseData: any) => {
    try {
      if (editingExpense) {
        await expenseAPI.update(editingExpense.id, expenseData);
      } else {
        await expenseAPI.create(expenseData);
      }
      await fetchData();
      setEditingExpense(null);
    } catch (err) {
      setError('Failed to save expense');
    }
  };

  const handleExpenseDelete = async (id: number) => {
    try {
      await expenseAPI.delete(id);
      await fetchData();
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  const handleCategorySubmit = async (categoryData: any) => {
    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory.id, categoryData);
      } else {
        await categoryAPI.create(categoryData);
      }
      await fetchData();
      setEditingCategory(null);
    } catch (err) {
      setError('Failed to save category');
    }
  };

  const handleCategoryDelete = async (id: number) => {
    try {
      await categoryAPI.delete(id);
      await fetchData();
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Expense Tracker</h1>
      
      {error && (
        <div style={{ 
          background: '#fee', 
          color: '#c33', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('expenses')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'expenses' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'expenses' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Expenses
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'categories' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'categories' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Categories
        </button>
      </div>

      {activeTab === 'expenses' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h2>Expenses</h2>
            <ExpenseList
              expenses={expenses}
              onEdit={setEditingExpense}
              onDelete={handleExpenseDelete}
            />
          </div>
          <div>
            <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
            <ExpenseForm
              expense={editingExpense}
              categories={categories}
              onSubmit={handleExpenseSubmit}
              onCancel={() => setEditingExpense(null)}
            />
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h2>Categories</h2>
            <CategoryList
              categories={categories}
              onEdit={setEditingCategory}
              onDelete={handleCategoryDelete}
            />
          </div>
          <div>
            <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
            <CategoryForm
              category={editingCategory}
              onSubmit={handleCategorySubmit}
              onCancel={() => setEditingCategory(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;