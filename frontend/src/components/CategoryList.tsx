import React from 'react';
import type { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px', 
        color: '#666',
        border: '2px dashed #ddd',
        borderRadius: '8px'
      }}>
        No categories found. Add your first category!
      </div>
    );
  }

  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
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
              <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{category.name}</h3>
              {category.description && (
                <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                  {category.description}
                </p>
              )}
              <div style={{ fontSize: '12px', color: '#888' }}>
                {category._count?.expenses !== undefined && (
                  <span>{category._count.expenses} expenses</span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '16px' }}>
              <button
                onClick={() => onEdit(category)}
                style={{
                  padding: '6px 12px',
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
                  const expenseCount = category._count?.expenses || 0;
                  const message = expenseCount > 0 
                    ? `This category has ${expenseCount} expenses. Deleting it will also delete all associated expenses. Are you sure?`
                    : 'Are you sure you want to delete this category?';
                    
                  if (window.confirm(message)) {
                    onDelete(category.id);
                  }
                }}
                style={{
                  padding: '6px 12px',
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
      ))}
    </div>
  );
};

export default CategoryList;