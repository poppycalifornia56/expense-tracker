import React, { useState, useEffect } from 'react';
import type { Category } from '../types';

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getCategoryColor = (categoryName: string) => {
    if (!categoryName) return '#00c853';
    const colors = [
      '#00c853', '#1565c0', '#ff6b6b', '#f59e0b', 
      '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'
    ];
    const hash = categoryName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || ''
      });
    } else {
      setFormData({
        name: '',
        description: ''
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
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
      name: formData.name.trim(),
      description: formData.description.trim() || undefined
    };
    
    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const currentColor = getCategoryColor(formData.name);

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
          backgroundColor: currentColor,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px'
        }}>🏷️</div>
        <h2 style={{ 
          margin: '0',
          fontSize: '20px',
          fontWeight: '700',
          color: '#1a202c'
        }}>
          {category ? 'Edit Category' : 'Add Category'}
        </h2>
        <span style={{
          padding: '4px 12px',
          backgroundColor: category ? '#e3f2fd' : '#e8f5e8',
          color: category ? '#1565c0' : '#00c853',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {category ? 'Edit' : 'New'}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#4a5568',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: errors.name ? '2px solid #ff6b6b' : '2px solid #e8ecf4',
              borderRadius: '12px',
              fontSize: '15px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'all 0.2s ease',
              backgroundColor: '#ffffff',
              outline: 'none',
              color: '#1a202c'
            }}
            placeholder="Enter category name (e.g., Food, Transport, Entertainment)"
            onFocus={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = currentColor;
                e.target.style.boxShadow = `0 0 0 3px ${currentColor}20`;
              }
            }}
            onBlur={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = '#e8ecf4';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          {errors.name && (
            <div style={{
              backgroundColor: '#fff5f5',
              border: '1px solid #fed7d7',
              borderRadius: '8px',
              padding: '8px 12px',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#fc8181',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white',
                fontWeight: 'bold'
              }}>!</div>
              <span style={{ 
                color: '#c53030', 
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {errors.name}
              </span>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#4a5568',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Description <span style={{ color: '#a0aec0', fontWeight: '400' }}>(Optional)</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e8ecf4',
              borderRadius: '12px',
              fontSize: '15px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transition: 'all 0.2s ease',
              backgroundColor: '#ffffff',
              resize: 'vertical',
              minHeight: '80px',
              outline: 'none',
              color: '#1a202c'
            }}
            placeholder="Add a description to help identify this category..."
            onFocus={(e) => {
              e.target.style.borderColor = currentColor;
              e.target.style.boxShadow = `0 0 0 3px ${currentColor}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e8ecf4';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingTop: '16px',
          borderTop: '1px solid #f7fafc'
        }}>
          {category && (
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
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#edf2f7';
                e.currentTarget.style.borderColor = '#cbd5e0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f7fafc';
                e.currentTarget.style.borderColor = '#e8ecf4';
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
              backgroundColor: currentColor,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: `0 2px 4px ${currentColor}40`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 4px 8px ${currentColor}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 2px 4px ${currentColor}40`;
            }}
          >
            {category ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>

      {formData.name && (
        <div style={{ 
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #f7fafc'
        }}>
          <div style={{ 
            fontSize: '12px', 
            color: '#4a5568', 
            marginBottom: '8px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Preview
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px',
            backgroundColor: '#f7fafc',
            borderRadius: '8px',
            border: '1px solid #e8ecf4'
          }}>
            <span style={{
              padding: '4px 12px',
              backgroundColor: `${currentColor}15`,
              color: currentColor,
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {formData.name}
            </span>
            <span style={{ 
              fontSize: '12px', 
              color: '#a0aec0',
              fontStyle: 'italic'
            }}>
              This is how your category will appear
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;