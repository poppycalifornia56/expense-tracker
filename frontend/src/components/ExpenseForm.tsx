import React, { useState, useEffect } from 'react';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryIcons';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const selectedCategory = categories.find(cat => cat.id.toString() === formData.categoryId);
  const selectedCategoryIcon = selectedCategory ? getCategoryIcon(selectedCategory.name) : '💰';
  const selectedCategoryColor = selectedCategory ? getCategoryColor(selectedCategory.name) : '#00c853';

  if (categories.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: isMobile ? '24px 20px' : '32px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e8ecf4',
        textAlign: 'center'
      }}>
        <div style={{
          width: isMobile ? '40px' : '48px',
          height: isMobile ? '40px' : '48px',
          backgroundColor: '#ff6b6b',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: isMobile ? '18px' : '20px'
        }}>⚠️</div>
        <h3 style={{ 
          color: '#1a202c', 
          margin: '0 0 8px 0',
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '700'
        }}>
          Categories Required
        </h3>
        <p style={{ 
          color: '#4a5568', 
          margin: '0',
          fontSize: isMobile ? '13px' : '14px'
        }}>
          Please create at least one category before adding expenses.
        </p>
      </div>
    );
  }

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: isMobile ? '12px 14px' : '12px 16px',
    border: errors[fieldName] 
      ? '1px solid #fc8181' 
      : focusedField === fieldName 
        ? '1px solid #1565c0' 
        : '1px solid #e8ecf4',
    borderRadius: '8px',
    fontSize: isMobile ? '16px' : '14px', 
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  });

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: isMobile ? '13px' : '14px',
    color: '#1a202c'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '16px' : '16px'
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .expense-form-grid {
              grid-template-columns: 1fr !important;
            }
            
            .expense-form-buttons {
              flex-direction: column !important;
              gap: 12px !important;
            }
            
            .expense-form-button {
              width: 100% !important;
              justify-content: center !important;
            }
          }
          
          @media (max-width: 480px) {
            .expense-form-header {
              flex-direction: column !important;
              text-align: center !important;
              gap: 8px !important;
            }
            
            .expense-form-icon {
              margin: 0 auto !important;
            }
          }
        `}
      </style>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: isMobile ? '20px 16px' : '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e8ecf4'
      }}>
        <div 
          className="expense-form-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '2px solid #f7fafc'
          }}
        >
          <div 
            className="expense-form-icon"
            style={{
              width: isMobile ? '28px' : '32px',
              height: isMobile ? '28px' : '32px',
              backgroundColor: selectedCategoryColor,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '14px' : '16px',
              flexShrink: 0
            }}
          >
            {selectedCategoryIcon}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              margin: '0',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              color: '#1a202c'
            }}>
              {expense ? 'Edit Expense' : 'Add Expense'}
            </h2>
            <p style={{
              margin: '0',
              color: '#4a5568',
              fontSize: isMobile ? '11px' : '12px'
            }}>
              {expense ? 'Update expense details' : 'Track your spending'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="expense-form-grid" style={formGridStyle}>
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
                  fontSize: isMobile ? '11px' : '12px', 
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
                inputMode="decimal"
              />
              {errors.amount && (
                <span style={{ 
                  color: '#fc8181', 
                  fontSize: isMobile ? '11px' : '12px', 
                  marginTop: '4px',
                  display: 'block',
                  fontWeight: '500'
                }}>
                  {errors.amount}
                </span>
              )}
            </div>
          </div>

          <div className="expense-form-grid" style={formGridStyle}>
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
                {categories.map(category => {
                  const categoryIcon = getCategoryIcon(category.name);
                  return (
                    <option key={category.id} value={category.id}>
                      {categoryIcon} {category.name}
                    </option>
                  );
                })}
              </select>
              {errors.categoryId && (
                <span style={{ 
                  color: '#fc8181', 
                  fontSize: isMobile ? '11px' : '12px', 
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
                  fontSize: isMobile ? '11px' : '12px', 
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
              rows={isMobile ? 2 : 3}
              style={{
                ...inputStyle('description'),
                resize: 'vertical',
                minHeight: isMobile ? '60px' : '72px'
              }}
              placeholder="Optional description"
            />
          </div>

          {selectedCategory && (
            <div style={{
              padding: isMobile ? '10px 12px' : '12px',
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              border: '1px solid #e8ecf4'
            }}>
              <div style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#4a5568',
                marginBottom: '8px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Selected Category
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: isMobile ? '18px' : '20px',
                  height: isMobile ? '18px' : '20px',
                  backgroundColor: selectedCategoryColor,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '10px' : '12px'
                }}>
                  {selectedCategoryIcon}
                </div>
                <span style={{
                  padding: '2px 8px',
                  backgroundColor: selectedCategoryColor + '15',
                  color: selectedCategoryColor,
                  borderRadius: '12px',
                  fontSize: isMobile ? '10px' : '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {selectedCategory.name}
                </span>
              </div>
            </div>
          )}

          <div 
            className="expense-form-buttons"
            style={{ 
              display: 'flex', 
              gap: '12px',
              marginTop: '8px',
              justifyContent: 'flex-end'
            }}
          >
            {expense && (
              <button
                type="button"
                onClick={onCancel}
                className="expense-form-button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: isMobile ? '14px 20px' : '12px 20px',
                  backgroundColor: '#f7fafc',
                  color: '#4a5568',
                  border: '1px solid #e8ecf4',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '15px' : '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  minHeight: isMobile ? '48px' : 'auto'
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
              className="expense-form-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: isMobile ? '14px 20px' : '12px 20px',
                background: expense ? 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)' : 'linear-gradient(135deg, #00c853 0%, #4caf50 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: isMobile ? '15px' : '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: expense ? '0 4px 12px rgba(21, 101, 192, 0.25)' : '0 4px 12px rgba(0, 200, 83, 0.25)',
                minHeight: isMobile ? '48px' : 'auto'
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
    </>
  );
};

export default ExpenseForm;