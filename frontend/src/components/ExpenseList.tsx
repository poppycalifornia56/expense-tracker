import React, { useState } from 'react';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryIcons';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

interface ExpenseDialogProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseDialog: React.FC<ExpenseDialogProps> = ({ 
  expense, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete 
}) => {
  if (!isOpen || !expense) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const categoryIcon = getCategoryIcon(expense.category.name);
  const categoryColor = getCategoryColor(expense.category.name);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(expense.id);
      onClose();
    }
  };

  const handleEdit = () => {
    onEdit(expense);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#4a5568',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f7fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            marginBottom: '12px' 
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: categoryColor,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              {categoryIcon}
            </div>
            <div>
              <h2 style={{ 
                margin: '0 0 4px 0', 
                color: '#1a202c',
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '1.2'
              }}>
                {expense.title}
              </h2>
              <span style={{
                padding: '4px 12px',
                backgroundColor: categoryColor + '15',
                color: categoryColor,
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {expense.category.name}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#fee2e2',
          border: '2px solid #fecaca',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#dc2626',
            lineHeight: '1'
          }}>
            {formatAmount(expense.amount)}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#4a5568',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px'
            }}>
              Date
            </label>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              border: '1px solid #e8ecf4',
              fontSize: '16px',
              color: '#1a202c',
              fontWeight: '500'
            }}>
              📅 {formatDate(expense.date)}
            </div>
          </div>

          {expense.description && (
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#4a5568',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '8px'
              }}>
                Description
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                border: '1px solid #e8ecf4',
                fontSize: '16px',
                color: '#1a202c',
                lineHeight: '1.5'
              }}>
                {expense.description}
              </div>
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(21, 101, 192, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(21, 101, 192, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 101, 192, 0.25)';
            }}
          >
            ✏️ Edit Expense
          </button>
          <button
            onClick={handleDelete}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 107, 107, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.25)';
            }}
          >
            🗑️ Delete Expense
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleCardClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedExpense(null);
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
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {expenses.map((expense) => {
          const categoryIcon = getCategoryIcon(expense.category.name);
          const categoryColor = getCategoryColor(expense.category.name);
          
          return (
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
              onClick={() => handleCardClick(expense)}
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
                      backgroundColor: categoryColor,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}>{categoryIcon}</div>
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
                      backgroundColor: categoryColor + '15',
                      color: categoryColor,
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
                  fontSize: '12px',
                  color: '#4a5568',
                  fontWeight: '500',
                  opacity: 0.7
                }}>
                  Click to view details
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ExpenseDialog
        expense={selectedExpense}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default ExpenseList;