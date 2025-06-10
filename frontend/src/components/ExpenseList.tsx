import React, { useState, useMemo } from 'react';
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

interface FilterState {
  category: string;
  dateRange: 'all' | 'today' | 'week' | 'month' | 'custom';
  startDate: string;
  endDate: string;
  searchTerm: string;
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
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
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
            top: '12px',
            right: '12px',
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

        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '12px' 
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: categoryColor,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              {categoryIcon}
            </div>
            <div>
              <h2 style={{ 
                margin: '0 0 4px 0', 
                color: '#1a202c',
                fontSize: '20px',
                fontWeight: '700',
                lineHeight: '1.2'
              }}>
                {expense.title}
              </h2>
              <span style={{
                padding: '4px 10px',
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
          </div>
        </div>

        <div style={{
          backgroundColor: '#fee2e2',
          border: '2px solid #fecaca',
          borderRadius: '10px',
          padding: '16px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#dc2626',
            lineHeight: '1'
          }}>
            {formatAmount(expense.amount)}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: '600',
              color: '#4a5568',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '6px'
            }}>
              Date
            </label>
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              border: '1px solid #e8ecf4',
              fontSize: '14px',
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
                fontSize: '11px',
                fontWeight: '600',
                color: '#4a5568',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '6px'
              }}>
                Description
              </label>
              <div style={{
                padding: '10px 14px',
                backgroundColor: '#f7fafc',
                borderRadius: '8px',
                border: '1px solid #e8ecf4',
                fontSize: '14px',
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
          gap: '10px',
          justifyContent: 'flex-end',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(21, 101, 192, 0.25)',
              minWidth: '120px'
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
            Edit Expense
          </button>
          <button
            onClick={handleDelete}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.25)',
              minWidth: '120px'
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
            Delete Expense
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    dateRange: 'all',
    startDate: '',
    endDate: '',
    searchTerm: ''
  });

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(expenses.map(expense => expense.category.name))
    );
    return uniqueCategories.sort();
  }, [expenses]);

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses.filter(expense => {
      if (filters.category !== 'all' && expense.category.name !== filters.category) {
        return false;
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (
          !expense.title.toLowerCase().includes(searchLower) &&
          !expense.description?.toLowerCase().includes(searchLower) &&
          !expense.category.name.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      const expenseDate = new Date(expense.date);
      const today = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          return expenseDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          return expenseDate >= weekAgo;
        case 'month':
          const monthAgo = new Date();
          monthAgo.setMonth(today.getMonth() - 1);
          return expenseDate >= monthAgo;
        case 'custom':
          if (filters.startDate && filters.endDate) {
            const start = new Date(filters.startDate);
            const end = new Date(filters.endDate);
            return expenseDate >= start && expenseDate <= end;
          }
          return true;
        default:
          return true;
      }
    });

    return filtered.sort((a, b) => {
      const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateComparison === 0) {
        return b.id - a.id; 
      }
      return dateComparison;
    });
  }, [expenses, filters]);

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

  const clearFilters = () => {
    setFilters({
      category: 'all',
      dateRange: 'all',
      startDate: '',
      endDate: '',
      searchTerm: ''
    });
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.dateRange !== 'all' || 
    filters.searchTerm !== '';

  return (
    <>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e8ecf4'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: '700',
            color: '#1a202c'
          }}>
            🔍 Filter Expenses
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                background: 'none',
                border: '1px solid #e8ecf4',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                color: '#4a5568',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f7fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Clear all
            </button>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: filters.dateRange === 'custom' ? '0' : '16px'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#4a5568',
              marginBottom: '6px'
            }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search expenses..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e8ecf4',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1976d2';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e8ecf4';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#4a5568',
              marginBottom: '6px'
            }}>
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e8ecf4',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                outline: 'none'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#4a5568',
              marginBottom: '6px'
            }}>
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                dateRange: e.target.value as FilterState['dateRange']
              }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e8ecf4',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                outline: 'none'
              }}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        {filters.dateRange === 'custom' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '6px'
              }}>
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e8ecf4',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '6px'
              }}>
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e8ecf4',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        <div style={{
          padding: '8px 12px',
          backgroundColor: '#f7fafc',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#4a5568'
        }}>
          Showing {filteredAndSortedExpenses.length} of {expenses.length} expenses
          {hasActiveFilters && (
            <span style={{ fontWeight: '600', color: '#1976d2' }}>
              {' '}(filtered)
            </span>
          )}
        </div>
      </div>

      {filteredAndSortedExpenses.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          backgroundColor: '#f7fafc',
          borderRadius: '12px',
          border: '2px dashed #e8ecf4'
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
          }}>
            {hasActiveFilters ? '🔍' : '💸'}
          </div>
          <h3 style={{ 
            color: '#1a202c', 
            margin: '0 0 8px 0',
            fontSize: '16px',
            fontWeight: '700'
          }}>
            {hasActiveFilters ? 'No expenses match your filters' : 'No expenses yet'}
          </h3>
          <p style={{ 
            color: '#4a5568', 
            margin: '0',
            fontSize: '14px'
          }}>
            {hasActiveFilters 
              ? 'Try adjusting your filter criteria or clear all filters'
              : 'Add your first expense to get started tracking your spending'
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredAndSortedExpenses.map((expense) => {
            const categoryIcon = getCategoryIcon(expense.category.name);
            const categoryColor = getCategoryColor(expense.category.name);
            
            return (
              <div
                key={expense.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '16px',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: categoryColor,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        flexShrink: 0
                      }}>{categoryIcon}</div>
                      <h3 style={{ 
                        margin: '0', 
                        color: '#1a202c',
                        fontSize: '15px',
                        fontWeight: '700',
                        lineHeight: '1.2',
                        flex: 1,
                        minWidth: '120px'
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
                        letterSpacing: '0.5px',
                        flexShrink: 0
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
                      fontWeight: '500',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{ 
                        padding: '2px 8px',
                        backgroundColor: '#f7fafc',
                        borderRadius: '12px',
                        border: '1px solid #e8ecf4',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexShrink: 0
                      }}>
                        📅 {formatDate(expense.date)}
                      </span>
                      <span style={{ 
                        padding: '2px 8px',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        borderRadius: '12px',
                        border: '1px solid #fecaca',
                        fontWeight: '600',
                        flexShrink: 0
                      }}>
                        {formatAmount(expense.amount)}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '12px',
                    color: '#4a5568',
                    fontWeight: '500',
                    opacity: 0.7,
                    flexShrink: 0,
                    alignSelf: 'center'
                  }}>
                    Click to view
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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