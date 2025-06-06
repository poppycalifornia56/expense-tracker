import React, { useState, useEffect } from 'react';
import type { Expense, Category } from '../types';

interface ExpenseFormProps {
  expense?: Expense | null;
  categories: Category[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount.toString(),
        description: expense.description || '',
        categoryId: expense.categoryId.toString(),
        date: expense.date.split('T')[0]
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        description: '',
        categoryId: categories.length > 0 ? categories[0].id.toString() : '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [expense, categories]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const submitData = {
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      description: formData.description.trim() || undefined,
      categoryId: parseInt(formData.categoryId),
      date: formData.date
    };
    
    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (categories.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px'
      }}>
        <p>Please create at least one category before adding expenses.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.title ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
          placeholder="Enter expense title"
        />
        {errors.title && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.title}</span>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          Amount *
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0"
          style={{
            width: '100%',
            padding: '8px',
            border: errors.amount ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
          placeholder="0.00"
        />
        {errors.amount && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.amount}</span>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          Category *
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.categoryId ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.categoryId}</span>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          Date *
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.date ? '2px solid #dc3545' : '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        {errors.date && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.date}</span>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            resize: 'vertical'
          }}
          placeholder="Optional description"
        />
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {expense ? 'Update Expense' : 'Add Expense'}
        </button>
        
        {expense && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;