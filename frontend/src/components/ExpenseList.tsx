import React from 'react';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (expenses.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px', 
        color: '#666',
        border: '2px dashed #ddd',
        borderRadius: '8px'
      }}>
        No expenses found. Add your first expense!
      </div>
    );
  }

  return (
    <div>
      {expenses.map((expense) => (
        <div
          key={expense.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            backgroundColor: '#fff'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{expense.title}</h3>
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                {expense.description}
              </p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#888' }}>
                <span>Category: {expense.category.name}</span>
                <span>Date: {formatDate(expense.date)}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginLeft: '16px' }}>
              <div style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#e74c3c',
                marginBottom: '8px'
              }}>
                {formatAmount(expense.amount)}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onEdit(expense)}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this expense?')) {
                      onDelete(expense.id);
                    }
                  }}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;