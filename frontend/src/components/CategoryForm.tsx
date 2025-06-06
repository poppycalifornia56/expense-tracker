import React, { useState, useEffect } from 'react';
import { getCategoryColor } from '../utils/categoryIcons';
import type { Category } from '../types';

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AVAILABLE_ICONS = [
  { icon: '🍔', label: 'Food & Dining' },
  { icon: '🚗', label: 'Transport' },
  { icon: '🎮', label: 'Entertainment' },
  { icon: '🛍️', label: 'Shopping' },
  { icon: '🏥', label: 'Health & Medical' },
  { icon: '📄', label: 'Bills & Utilities' },
  { icon: '📚', label: 'Education' },
  { icon: '🏠', label: 'Home & Garden' },
  { icon: '💼', label: 'Work & Business' },
  { icon: '🎁', label: 'Gifts & Donations' },
  { icon: '💄', label: 'Personal Care' },
  { icon: '🐕', label: 'Pets' },
  { icon: '💻', label: 'Technology' },
  { icon: '☕', label: 'Coffee & Drinks' },
  { icon: '🏦', label: 'Banking & Finance' },
  { icon: '🏷️', label: 'General' },
  { icon: '🎵', label: 'Music' },
  { icon: '🏋️', label: 'Fitness' },
  { icon: '🎨', label: 'Art & Creativity' },
  { icon: '📱', label: 'Phone & Communication' },
  { icon: '⚡', label: 'Energy & Utilities' },
  { icon: '🧳', label: 'Travel' },
  { icon: '👕', label: 'Clothing' },
  { icon: '🎭', label: 'Events & Activities' }
];

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🏷️'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        icon: category.icon || '🏷️'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: '🏷️'
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
      description: formData.description.trim() || undefined,
      icon: formData.icon
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

  const handleIconSelect = (icon: string) => {
    setFormData(prev => ({
      ...prev,
      icon
    }));
    setShowIconPicker(false);
  };

  const currentColor = getCategoryColor(formData.name);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e8ecf4',
      position: 'relative'
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
        }}>{formData.icon}</div>
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

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#4a5568',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Category Icon *
          </label>
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowIconPicker(!showIconPicker)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e8ecf4',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                fontSize: '15px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                transition: 'all 0.2s ease',
                outline: 'none',
                textAlign: 'left'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentColor;
                e.target.style.boxShadow = `0 0 0 3px ${currentColor}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8ecf4';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: currentColor,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}>{formData.icon}</div>
              <span style={{ color: '#1a202c', flex: 1 }}>
                {AVAILABLE_ICONS.find(item => item.icon === formData.icon)?.label || 'Select an icon'}
              </span>
              <div style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a0aec0',
                transform: showIconPicker ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}>▼</div>
            </button>

            {showIconPicker && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                zIndex: 1000,
                backgroundColor: 'white',
                border: '2px solid #e8ecf4',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                marginTop: '4px',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '2px',
                  padding: '8px'
                }}>
                  {AVAILABLE_ICONS.map((item) => (
                    <button
                      key={item.icon}
                      type="button"
                      onClick={() => handleIconSelect(item.icon)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '8px',
                        backgroundColor: formData.icon === item.icon ? `${currentColor}15` : 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        transition: 'all 0.2s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.icon !== item.icon) {
                          e.currentTarget.style.backgroundColor = '#f7fafc';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.icon !== item.icon) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{item.icon}</span>
                      <span style={{ 
                        color: formData.icon === item.icon ? currentColor : '#4a5568',
                        fontSize: '13px',
                        fontWeight: formData.icon === item.icon ? '600' : '400'
                      }}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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
            gap: '12px',
            padding: '12px',
            backgroundColor: '#f7fafc',
            borderRadius: '8px',
            border: '1px solid #e8ecf4'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: currentColor,
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>{formData.icon}</div>
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

      {showIconPicker && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowIconPicker(false)}
        />
      )}
    </div>
  );
};

export default CategoryForm;