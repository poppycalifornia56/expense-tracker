import React from 'react';
import { getCategoryIcon, getCategoryColor } from '../utils/categoryIcons';
import type { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  const styles = {
    emptyState: {
      textAlign: 'center' as const,
      padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 24px)',
      backgroundColor: '#f7fafc',
      borderRadius: 'clamp(8px, 2vw, 12px)',
      border: '2px dashed #e8ecf4',
      position: 'relative' as const,
      margin: '0 auto',
      maxWidth: '400px'
    },
    emptyIcon: {
      width: 'clamp(40px, 10vw, 48px)',
      height: 'clamp(40px, 10vw, 48px)',
      backgroundColor: '#e8ecf4',
      borderRadius: 'clamp(8px, 2vw, 12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px auto',
      fontSize: 'clamp(16px, 4vw, 20px)'
    },
    emptyTitle: {
      color: '#1a202c',
      margin: '0 0 8px 0',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      fontWeight: '700'
    },
    emptyText: {
      color: '#4a5568',
      margin: '0',
      fontSize: 'clamp(12px, 3vw, 14px)',
      lineHeight: '1.4'
    },
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 'clamp(8px, 2vw, 12px)',
      width: '100%'
    },
    categoryCard: {
      backgroundColor: 'white',
      borderRadius: 'clamp(8px, 2vw, 12px)',
      padding: 'clamp(12px, 3vw, 20px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e8ecf4',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      width: '100%',
      boxSizing: 'border-box' as const
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 'clamp(8px, 2vw, 16px)',
      flexWrap: 'wrap' as const
    },
    leftContent: {
      flex: 1,
      minWidth: '0',
      minWidth: '200px',
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(8px, 2vw, 12px)',
      marginBottom: '8px',
      flexWrap: 'wrap' as const
    },
    categoryIcon: {
      width: 'clamp(20px, 5vw, 24px)',
      height: 'clamp(20px, 5vw, 24px)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(10px, 2.5vw, 12px)',
      flexShrink: 0
    },
    categoryName: {
      margin: '0',
      color: '#1a202c',
      fontSize: 'clamp(14px, 3.5vw, 16px)',
      fontWeight: '700',
      lineHeight: '1.2',
      wordBreak: 'break-word' as const
    },
    categoryBadge: {
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: 'clamp(9px, 2vw, 11px)',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap' as const
    },
    description: {
      margin: '0 0 8px 0',
      color: '#4a5568',
      fontSize: 'clamp(12px, 3vw, 14px)',
      lineHeight: '1.4',
      wordBreak: 'break-word' as const
    },
    expenseCount: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 'clamp(10px, 2.5vw, 12px)',
      color: '#4a5568',
      fontWeight: '500'
    },
    expenseCountBadge: {
      padding: '2px 8px',
      backgroundColor: '#f7fafc',
      borderRadius: '12px',
      border: '1px solid #e8ecf4',
      whiteSpace: 'nowrap' as const
    },
    buttonContainer: {
      display: 'flex',
      gap: 'clamp(4px, 1vw, 8px)',
      alignItems: 'center',
      flexShrink: 0,
      '@media (max-width: 480px)': {
        flexDirection: 'column' as const,
        alignItems: 'stretch'
      }
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: 'clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px)',
      border: 'none',
      borderRadius: 'clamp(6px, 1.5vw, 8px)',
      cursor: 'pointer',
      fontSize: 'clamp(10px, 2.5vw, 12px)',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap' as const,
      minWidth: 'clamp(60px, 15vw, 80px)'
    },
    editButton: {
      background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
      color: 'white',
      boxShadow: '0 2px 4px rgba(21, 101, 192, 0.25)'
    },
    deleteButton: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
      color: 'white',
      boxShadow: '0 2px 4px rgba(255, 107, 107, 0.25)'
    }
  };

  const useMediaQuery = (query: string) => {
    const [matches, setMatches] = React.useState(false);

    React.useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
  };

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 480px)');

  if (categories.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>🏷️</div>
        <h3 style={styles.emptyTitle}>
          No categories yet
        </h3>
        <p style={styles.emptyText}>
          Add your first category to organize your expenses
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {categories.map((category) => {
        const categoryIcon = category.icon || getCategoryIcon(category.name);
        const categoryColor = getCategoryColor(category.name);
        
        return (
          <div
            key={category.id}
            style={styles.categoryCard}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.04)';
              }
            }}
          >
            <div style={{
              ...styles.cardContent,
              flexDirection: isSmallMobile ? 'column' : 'row',
              alignItems: isSmallMobile ? 'stretch' : 'flex-start'
            }}>
              <div style={styles.leftContent}>
                <div style={styles.categoryHeader}>
                  <div style={{
                    ...styles.categoryIcon,
                    backgroundColor: categoryColor
                  }}>
                    {categoryIcon}
                  </div>
                  <h3 style={styles.categoryName}>
                    {category.name}
                  </h3>
                  <span style={{
                    ...styles.categoryBadge,
                    backgroundColor: categoryColor + '15',
                    color: categoryColor
                  }}>
                    Category
                  </span>
                </div>
                
                {category.description && (
                  <p style={styles.description}>
                    {category.description}
                  </p>
                )}
                
                <div style={styles.expenseCount}>
                  <span style={styles.expenseCountBadge}>
                    {category._count?.expenses !== undefined ? category._count.expenses : 0} expenses
                  </span>
                </div>
              </div>
              
              <div style={{
                ...styles.buttonContainer,
                flexDirection: isSmallMobile ? 'row' : 'row',
                width: isSmallMobile ? '100%' : 'auto',
                marginTop: isSmallMobile ? '12px' : '0'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(category);
                  }}
                  style={{
                    ...styles.button,
                    ...styles.editButton,
                    flex: isSmallMobile ? 1 : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const expenseCount = category._count?.expenses || 0;
                    const message = expenseCount > 0 
                      ? `This category has ${expenseCount} expenses. Deleting it will also delete all associated expenses. Are you sure?`
                      : 'Are you sure you want to delete this category?';
                      
                    if (window.confirm(message)) {
                      onDelete(category.id);
                    }
                  }}
                  style={{
                    ...styles.button,
                    ...styles.deleteButton,
                    flex: isSmallMobile ? 1 : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;