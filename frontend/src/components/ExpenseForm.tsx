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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e8ecf4',
        textAlign: 'center'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#ff6b6b',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: '20px'
        }}>⚠️</div>
        <h3 style={{ 
          color: '#1a202c', 
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '700'
        }}>
          Categories Required
        </h3>
        <p style={{ 
          color: '#4a5568', 
          margin: '0',
          fontSize: '14px'
        }}>
          Please create at least one category before adding expenses.
        </p>
      </div>
    );
  }

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '12px 16px',
    border: errors[fieldName] 
      ? '1px solid #fc8181' 
      : focusedField === fieldName 
        ? '1px solid #1565c0' 
        : '1px solid #e8ecf4',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  });

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#1a202c'
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e8ecf4'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '2px solid #f7fafc'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: expense ? '#1565c0' : '#00c853',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px'
        }}>
          {expense ? '✏️' : '💰'}
        </div>
        <div>
          <h2 style={{
            margin: '0',
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a202c'
          }}>
            {expense ? 'Edit Expense' : 'Add Expense'}
          </h2>
          <p style={{
            margin: '0',
            color: '#4a5568',
            fontSize: '12px'
          }}>
            {expense ? 'Update expense details' : 'Track your spending'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle('title')}
              placeholder="Enter expense title"
            />
            {errors.title && (
              <span style={{ 
                color: '#fc8181', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'block',
                fontWeight: '500'
              }}>
                {errors.title}
              </span>
            )}
          </div>

          <div>
            <label style={labelStyle}>
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onFocus={() => setFocusedField('amount')}
              onBlur={() => setFocusedField(null)}
              step="0.01"
              min="0"
              style={inputStyle('amount')}
              placeholder="0.00"
            />
            {errors.amount && (
              <span style={{ 
                color: '#fc8181', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'block',
                fontWeight: '500'
              }}>
                {errors.amount}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>
              Category *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              onFocus={() => setFocusedField('categoryId')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...inputStyle('categoryId'),
                cursor: 'pointer'
              }}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span style={{ 
                color: '#fc8181', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'block',
                fontWeight: '500'
              }}>
                {errors.categoryId}
              </span>
            )}
          </div>

          <div>
            <label style={labelStyle}>
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onFocus={() => setFocusedField('date')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle('date')}
            />
            {errors.date && (
              <span style={{ 
                color: '#fc8181', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'block',
                fontWeight: '500'
              }}>
                {errors.date}
              </span>
            )}
          </div>
        </div>

        <div>
          <label style={labelStyle}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
            rows={3}
            style={{
              ...inputStyle('description'),
              resize: 'vertical',
              minHeight: '72px'
            }}
            placeholder="Optional description"
          />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px',
          marginTop: '8px',
          justifyContent: 'flex-end'
        }}>
          {expense && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#f7fafc',
                color: '#4a5568',
                border: '1px solid #e8ecf4',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#edf2f7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f7fafc';
              }}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: expense ? 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)' : 'linear-gradient(135deg, #00c853 0%, #4caf50 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: expense ? '0 4px 12px rgba(21, 101, 192, 0.25)' : '0 4px 12px rgba(0, 200, 83, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {expense ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;