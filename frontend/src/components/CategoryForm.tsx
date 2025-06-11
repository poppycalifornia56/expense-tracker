import React, { useState, useEffect } from "react";
import { getCategoryColor } from "../utils/categoryIcons";
import type { Category } from "../types";

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: Category) => void;
  onCancel: () => void;
}

const AVAILABLE_ICONS = [
  { icon: "🏷️", label: "General" },
  { icon: "🍔", label: "Food & Dining" },
  { icon: "🚗", label: "Transport" },
  { icon: "🎮", label: "Entertainment" },
  { icon: "🛍️", label: "Shopping" },
  { icon: "🏥", label: "Health & Medical" },
  { icon: "📄", label: "Bills & Utilities" },
  { icon: "📚", label: "Education" },
  { icon: "🏠", label: "Home & Garden" },
  { icon: "💼", label: "Work & Business" },
  { icon: "🎁", label: "Gifts & Donations" },
  { icon: "💄", label: "Personal Care" },
  { icon: "🐕", label: "Pets" },
  { icon: "💻", label: "Technology" },
  { icon: "☕", label: "Coffee & Drinks" },
  { icon: "🏦", label: "Banking & Finance" },
  { icon: "🎵", label: "Music" },
  { icon: "🏋️", label: "Fitness" },
  { icon: "🎨", label: "Art & Creativity" },
  { icon: "📱", label: "Phone & Communication" },
  { icon: "⚡", label: "Energy & Utilities" },
  { icon: "🧳", label: "Travel" },
  { icon: "👕", label: "Clothing" },
  { icon: "🎭", label: "Events & Activities" },
];

const styles = {
  container: (isMobile: boolean) => ({
    backgroundColor: "white",
    borderRadius: isMobile ? "12px" : "16px",
    padding: isMobile ? "16px" : "24px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e8ecf4",
    position: "relative" as const,
    width: "100%",
    maxWidth: isMobile ? "none" : "500px",
    margin: isMobile ? "0" : "0 auto",
  }),
  header: (isMobile: boolean) => ({
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "8px" : "12px",
    marginBottom: isMobile ? "16px" : "20px",
    paddingBottom: isMobile ? "12px" : "16px",
    borderBottom: "2px solid #f7fafc",
    flexWrap: isMobile ? ("wrap" as const) : ("nowrap" as const),
  }),
  iconBox: (isMobile: boolean) => ({
    width: isMobile ? "28px" : "32px",
    height: isMobile ? "28px" : "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isMobile ? "14px" : "16px",
  }),
  title: (isMobile: boolean) => ({
    margin: "0",
    fontSize: isMobile ? "18px" : "20px",
    fontWeight: "700",
    color: "#1a202c",
    flex: isMobile ? "1 1 100%" : "none",
  }),
  badge: (isMobile: boolean) => ({
    padding: isMobile ? "3px 8px" : "4px 12px",
    borderRadius: "20px",
    fontSize: isMobile ? "11px" : "12px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginTop: isMobile ? "4px" : "0",
  }),
  input: (isMobile: boolean, hasError: boolean, currentColor: string) => ({
    width: "100%",
    padding: isMobile ? "10px 14px" : "12px 16px",
    border: hasError ? "2px solid #ff6b6b" : "2px solid #e8ecf4",
    borderRadius: isMobile ? "10px" : "12px",
    borderColor: currentColor,
    fontSize: isMobile ? "14px" : "15px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    transition: "all 0.2s ease",
    backgroundColor: "#ffffff",
    outline: "none",
    color: "#1a202c",
    WebkitAppearance: "none",
    boxSizing: "border-box" as const,
  }),
  textarea: (isMobile: boolean) => ({
    width: "100%",
    padding: isMobile ? "10px 14px" : "12px 16px",
    border: "2px solid #e8ecf4",
    borderRadius: isMobile ? "10px" : "12px",
    fontSize: isMobile ? "14px" : "15px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    transition: "all 0.2s ease",
    backgroundColor: "#ffffff",
    resize: "vertical" as const,
    minHeight: isMobile ? "70px" : "80px",
    outline: "none",
    color: "#1a202c",
    boxSizing: "border-box" as const,
  }),
  iconPicker: (isMobile: boolean) => ({
    position: "absolute" as const,
    top: "100%",
    left: "0",
    right: "0",
    zIndex: 1000,
    backgroundColor: "white",
    border: "2px solid #e8ecf4",
    borderRadius: isMobile ? "10px" : "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    marginTop: "4px",
    maxHeight: isMobile ? "160px" : "200px",
    overflowY: "auto" as const,
  }),
  iconGrid: (isMobile: boolean) => ({
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "2px",
    padding: isMobile ? "6px" : "8px",
  }),
  buttonGroup: (isMobile: boolean) => ({
    display: "flex",
    gap: isMobile ? "8px" : "12px",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: isMobile ? "12px" : "16px",
    borderTop: "1px solid #f7fafc",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
  }),
  button: (isMobile: boolean, isPrimary: boolean = false) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: isMobile ? "10px 16px" : "12px 20px",
    border: isPrimary ? "none" : "1px solid #e8ecf4",
    borderRadius: isMobile ? "10px" : "12px",
    cursor: "pointer",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    width: isMobile ? "100%" : "auto",
    minWidth: isMobile ? "none" : "120px",
  }),
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🏷️",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
        icon: category.icon || "🏷️",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        icon: "🏷️",
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
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
      icon: formData.icon,
    };

    onSubmit(submitData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleIconSelect = (icon: string) => {
    setFormData((prev) => ({
      ...prev,
      icon,
    }));
    setShowIconPicker(false);
  };

  const currentColor = getCategoryColor(formData.name);

  return (
    <div style={styles.container(isMobile)}>
      <div style={styles.header(isMobile)}>
        <div
          style={{
            ...styles.iconBox(isMobile),
            backgroundColor: currentColor,
          }}
        >
          {formData.icon}
        </div>
        <h2 style={styles.title(isMobile)}>
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <span
          style={{
            ...styles.badge(isMobile),
            backgroundColor: category ? "#e3f2fd" : "#e8f5e8",
            color: category ? "#1565c0" : "#00c853",
          }}
        >
          {category ? "Edit" : "New"}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: isMobile ? "16px" : "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#4a5568",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: "600",
            }}
          >
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...styles.input(isMobile, !!errors.name, currentColor),
              WebkitAppearance: "none",
            }}
            placeholder="Enter category name"
            onFocus={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = currentColor;
                e.target.style.boxShadow = `0 0 0 3px ${currentColor}20`;
              }
            }}
            onBlur={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = "#e8ecf4";
                e.target.style.boxShadow = "none";
              }
            }}
          />
          {errors.name && (
            <div
              style={{
                backgroundColor: "#fff5f5",
                border: "1px solid #fed7d7",
                borderRadius: isMobile ? "6px" : "8px",
                padding: isMobile ? "6px 10px" : "8px 12px",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: "#fc8181",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: "white",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                !
              </div>
              <span
                style={{
                  color: "#c53030",
                  fontSize: isMobile ? "12px" : "13px",
                  fontWeight: "500",
                }}
              >
                {errors.name}
              </span>
            </div>
          )}
        </div>

        <div style={{ marginBottom: isMobile ? "16px" : "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#4a5568",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: "600",
            }}
          >
            Category Icon *
          </label>
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowIconPicker(!showIconPicker)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "8px" : "12px",
                width: "100%",
                padding: isMobile ? "10px 14px" : "12px 16px",
                border: "2px solid #e8ecf4",
                borderRadius: isMobile ? "10px" : "12px",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                fontSize: isMobile ? "14px" : "15px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                transition: "all 0.2s ease",
                outline: "none",
                textAlign: "left",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = currentColor;
                e.target.style.boxShadow = `0 0 0 3px ${currentColor}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e8ecf4";
                e.target.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: isMobile ? "20px" : "24px",
                  height: isMobile ? "20px" : "24px",
                  backgroundColor: currentColor,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "12px" : "14px",
                  flexShrink: 0,
                }}
              >
                {formData.icon}
              </div>
              <span
                style={{
                  color: "#1a202c",
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {AVAILABLE_ICONS.find((item) => item.icon === formData.icon)
                  ?.label || "Select an icon"}
              </span>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a0aec0",
                  transform: showIconPicker ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  flexShrink: 0,
                }}
              >
                ▼
              </div>
            </button>

            {showIconPicker && (
              <div style={styles.iconPicker(isMobile)}>
                <div style={styles.iconGrid(isMobile)}>
                  {AVAILABLE_ICONS.map((item) => (
                    <button
                      key={item.icon}
                      type="button"
                      onClick={() => handleIconSelect(item.icon)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? "6px" : "8px",
                        padding: isMobile ? "6px 10px" : "8px 12px",
                        border: "none",
                        borderRadius: isMobile ? "6px" : "8px",
                        backgroundColor:
                          formData.icon === item.icon
                            ? `${currentColor}15`
                            : "transparent",
                        cursor: "pointer",
                        fontSize: isMobile ? "13px" : "14px",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        transition: "all 0.2s ease",
                        textAlign: "left",
                        width: "100%",
                      }}
                      onMouseEnter={(e) => {
                        if (formData.icon !== item.icon) {
                          e.currentTarget.style.backgroundColor = "#f7fafc";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.icon !== item.icon) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <span
                        style={{
                          color:
                            formData.icon === item.icon
                              ? currentColor
                              : "#4a5568",
                          fontSize: isMobile ? "12px" : "13px",
                          fontWeight:
                            formData.icon === item.icon ? "600" : "400",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: isMobile ? "20px" : "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#4a5568",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: "600",
            }}
          >
            Description{" "}
            <span style={{ color: "#a0aec0", fontWeight: "400" }}>
              (Optional)
            </span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            style={styles.textarea(isMobile)}
            placeholder="Add a description to help identify this category..."
            onFocus={(e) => {
              e.target.style.borderColor = currentColor;
              e.target.style.boxShadow = `0 0 0 3px ${currentColor}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e8ecf4";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={styles.buttonGroup(isMobile)}>
          {category && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                ...styles.button(isMobile, false),
                backgroundColor: "#f7fafc",
                color: "#4a5568",
                order: isMobile ? 2 : 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#edf2f7";
                e.currentTarget.style.borderColor = "#cbd5e0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f7fafc";
                e.currentTarget.style.borderColor = "#e8ecf4";
              }}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            style={{
              ...styles.button(isMobile, true),
              backgroundColor: currentColor,
              color: "white",
              boxShadow: `0 2px 4px ${currentColor}40`,
              order: isMobile ? 1 : 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = `0 4px 8px ${currentColor}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 2px 4px ${currentColor}40`;
            }}
          >
            {category ? "Update Category" : "Add Category"}
          </button>
        </div>
      </form>

      {formData.name && (
        <div
          style={{
            marginTop: isMobile ? "16px" : "20px",
            paddingTop: isMobile ? "12px" : "16px",
            borderTop: "1px solid #f7fafc",
          }}
        >
          <div
            style={{
              fontSize: isMobile ? "11px" : "12px",
              color: "#4a5568",
              marginBottom: "8px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Preview
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px",
              padding: isMobile ? "10px" : "12px",
              backgroundColor: "#f7fafc",
              borderRadius: isMobile ? "6px" : "8px",
              border: "1px solid #e8ecf4",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: isMobile ? "20px" : "24px",
                height: isMobile ? "20px" : "24px",
                backgroundColor: currentColor,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                flexShrink: 0,
              }}
            >
              {formData.icon}
            </div>
            <span
              style={{
                padding: isMobile ? "3px 8px" : "4px 12px",
                backgroundColor: `${currentColor}15`,
                color: currentColor,
                borderRadius: "20px",
                fontSize: isMobile ? "11px" : "12px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {formData.name}
            </span>
            <span
              style={{
                fontSize: isMobile ? "11px" : "12px",
                color: "#a0aec0",
                fontStyle: "italic",
                flex: isMobile ? "1 1 100%" : "none",
                marginTop: isMobile ? "4px" : "0",
              }}
            >
              This is how your category will appear
            </span>
          </div>
        </div>
      )}

      {showIconPicker && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setShowIconPicker(false)}
        />
      )}
    </div>
  );
};

export default CategoryForm;
