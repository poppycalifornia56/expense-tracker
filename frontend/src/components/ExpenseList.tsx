import React from 'react';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryColor = (categoryName: string) => {
    const colors = [
      '#1565c0', '#00c853', '#ff6b6b', '#f59e0b', 
      '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'
    ];
    const hash = categoryName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  if (expenses.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '48px 24px',
        backgroundColor: '#f7fafc',
        borderRadius: '12px',
        border: '2px dashed #e8ecf4',
        position: 'relative'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#e8ecf4',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          fontSize: '20px'
        }}>💸</div>
        <h3 style={{ 
          color: '#1a202c', 
          margin: '0 0 8px 0',
          fontSize: '16px',
          fontWeight: '700'
        }}>
          No expenses yet
        </h3>
        <p style={{ 
          color: '#4a5568', 
          margin: '0',
          fontSize: '14px'
        }}>
          Add your first expense to get started tracking your spending
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {expenses.map((expense) => (
        <div
          key={expense.id}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e8ecf4',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: getCategoryColor(expense.category.name),
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>💰</div>
                <h3 style={{ 
                  margin: '0', 
                  color: '#1a202c',
                  fontSize: '16px',
                  fontWeight: '700',
                  lineHeight: '1.2'
                }}>
                  {expense.title}
                </h3>
                <span style={{
                  padding: '2px 8px',
                  backgroundColor: getCategoryColor(expense.category.name) + '15',
                  color: getCategoryColor(expense.category.name),
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {expense.category.name}
                </span>
              </div>
              
              {expense.description && (
                <p style={{ 
                  margin: '0 0 8px 0', 
                  color: '#4a5568', 
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {expense.description}
                </p>
              )}
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px', 
                color: '#4a5568',
                fontWeight: '500'
              }}>
                <span style={{ 
                  padding: '2px 8px',
                  backgroundColor: '#f7fafc',
                  borderRadius: '12px',
                  border: '1px solid #e8ecf4',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  📅 {formatDate(expense.date)}
                </span>
                <span style={{ 
                  padding: '2px 8px',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '12px',
                  border: '1px solid #fecaca',
                  fontWeight: '600'
                }}>
                  {formatAmount(expense.amount)}
                </span>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(expense);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(21, 101, 192, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Are you sure you want to delete this expense?')) {
                    onDelete(expense.id);
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 4px rgba(255, 107, 107, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;