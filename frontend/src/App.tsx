import React, { useState, useEffect } from "react";
import type { Category, Expense } from "./types";
import { categoryAPI, expenseAPI } from "./services/api";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<"expenses" | "categories">(
    "expenses"
  );
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesRes, categoriesRes] = await Promise.all([
        expenseAPI.getAll(),
        categoryAPI.getAll(),
      ]);
      setExpenses(expensesRes.data);
      setCategories(categoriesRes.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseSubmit = async (expenseData: any) => {
    try {
      const submissionData = {
        ...expenseData,
        amount: parseFloat(expenseData.amount.toString()),
      };

      if (editingExpense) {
        await expenseAPI.update(editingExpense.id, submissionData);
      } else {
        await expenseAPI.create(submissionData);
      }
      await fetchData();
      setEditingExpense(null);
    } catch (err) {
      setError("Failed to save expense");
    }
  };

  const handleExpenseDelete = async (id: number) => {
    try {
      await expenseAPI.delete(id);
      await fetchData();
    } catch (err) {
      setError("Failed to delete expense");
    }
  };

  const handleCategorySubmit = async (categoryData: any) => {
    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory.id, categoryData);
      } else {
        await categoryAPI.create(categoryData);
      }
      await fetchData();
      setEditingCategory(null);
    } catch (err) {
      setError("Failed to save category");
    }
  };

  const handleCategoryDelete = async (id: number) => {
    try {
      await categoryAPI.delete(id);
      await fetchData();
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f7f9fc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: isMobile ? "32px 24px" : "48px 60px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            textAlign: "center",
            border: "1px solid #e8ecf4",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              margin: "0 auto 20px auto",
              border: "3px solid #1565c0",
              borderTop: "3px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <div
            style={{
              fontSize: isMobile ? "14px" : "16px",
              color: "#4a5568",
              fontWeight: "500",
            }}
          >
            Loading your finances...
          </div>
        </div>
      </div>
    );
  }

  const totalExpenses = expenses.reduce((sum, expense) => {
    const amount =
      typeof expense.amount === "string"
        ? parseFloat(expense.amount)
        : expense.amount;
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#f7f9fc",
    padding: isMobile ? "16px" : "20px",
  };

  const maxWidthContainerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerCardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: isMobile ? "20px" : "32px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e8ecf4",
  };

  const statsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(auto-fit, minmax(200px, 1fr))",
    gap: isMobile ? "16px" : "20px",
  };

  const tabContainerStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "8px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e8ecf4",
    display: "flex",
    gap: "8px",
    flexDirection: (isMobile ? "column" : "row") as "column" | "row",
  };

  const mainContentStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "2fr 440px",
    gap: "24px",
    alignItems: "start",
  };

  const listContainerStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: isMobile ? "16px" : "24px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e8ecf4",
  };

  const formContainerStyle: React.CSSProperties = {
    position: (isMobile ? "static" : "sticky") as "static" | "sticky",
    top: isMobile ? "auto" : "20px",
    backgroundColor: "white",
    borderRadius: "16px",
    padding: isMobile ? "16px" : "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e8ecf4",
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .responsive-grid {
              grid-template-columns: 1fr !important;
            }
            
            .mobile-stack {
              flex-direction: column !important;
            }
            
            .mobile-text-sm {
              font-size: 14px !important;
            }
            
            .mobile-padding-sm {
              padding: 12px 16px !important;
            }
          }
          
          @media (max-width: 480px) {
            .stats-card {
              padding: 16px !important;
            }
            
            .stats-card .amount {
              font-size: 20px !important;
            }
            
            .header-title {
              font-size: 24px !important;
            }
            
            .section-title {
              font-size: 18px !important;
            }
          }
        `}
      </style>

      <div style={maxWidthContainerStyle}>
        <div style={headerCardStyle}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: isMobile ? "48px" : "56px",
                height: isMobile ? "48px" : "56px",
                backgroundColor: "#1565c0",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                fontSize: isMobile ? "20px" : "24px",
              }}
            >
              💰
            </div>
            <h1
              className="header-title"
              style={{
                margin: "0 0 8px 0",
                fontSize: isMobile ? "24px" : "28px",
                fontWeight: "700",
                color: "#1a202c",
              }}
            >
              Finance Manager
            </h1>
            <p
              style={{
                margin: "0",
                color: "#4a5568",
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              Your finances at a glance
            </p>
          </div>

          <div style={statsGridStyle}>
            <div
              className="stats-card"
              style={{
                background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
                color: "white",
                padding: isMobile ? "20px" : "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(255, 107, 107, 0.25)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  opacity: "0.9",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Total Expenses
              </div>
              <div
                className="amount"
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "700",
                }}
              >
                {formatAmount(totalExpenses)}
              </div>
            </div>

            <div
              className="stats-card"
              style={{
                background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                color: "white",
                padding: isMobile ? "20px" : "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(21, 101, 192, 0.25)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  opacity: "0.9",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Transactions
              </div>
              <div
                className="amount"
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "700",
                }}
              >
                {expenses.length}
              </div>
            </div>

            <div
              className="stats-card"
              style={{
                background: "linear-gradient(135deg, #00c853 0%, #4caf50 100%)",
                color: "white",
                padding: isMobile ? "20px" : "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 200, 83, 0.25)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  opacity: "0.9",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Categories
              </div>
              <div
                className="amount"
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: "700",
                }}
              >
                {categories.length}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fff5f5",
              border: "1px solid #fed7d7",
              borderRadius: "12px",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#fc8181",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
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
                fontWeight: "500",
                fontSize: "14px",
                flex: 1,
                minWidth: "200px",
              }}
            >
              {error}
            </span>
          </div>
        )}

        <div style={tabContainerStyle}>
          <button
            onClick={() => setActiveTab("expenses")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: isMobile ? "12px 16px" : "16px 24px",
              backgroundColor:
                activeTab === "expenses" ? "#1565c0" : "transparent",
              color: activeTab === "expenses" ? "white" : "#4a5568",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              minHeight: isMobile ? "44px" : "auto",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "expenses") {
                e.currentTarget.style.backgroundColor = "#f7fafc";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "expenses") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <span style={{ fontSize: "18px" }}>💸</span>
            Expenses
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: isMobile ? "12px 16px" : "16px 24px",
              backgroundColor:
                activeTab === "categories" ? "#00c853" : "transparent",
              color: activeTab === "categories" ? "white" : "#4a5568",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: isMobile ? "14px" : "15px",
              fontWeight: "600",
              transition: "all 0.2s ease",
              minHeight: isMobile ? "44px" : "auto",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== "categories") {
                e.currentTarget.style.backgroundColor = "#f7fafc";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== "categories") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <span style={{ fontSize: "18px" }}>🏷️</span>
            Categories
          </button>
        </div>

        {activeTab === "expenses" ? (
          <div style={mainContentStyle}>
            <div style={listContainerStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "2px solid #f7fafc",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#1565c0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  💸
                </div>
                <h2
                  className="section-title"
                  style={{
                    margin: "0",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "700",
                    color: "#1a202c",
                    flex: 1,
                  }}
                >
                  Expenses
                </h2>
                <span
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "#e3f2fd",
                    color: "#1565c0",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {expenses.length}
                </span>
              </div>
              <ExpenseList
                expenses={expenses}
                onEdit={setEditingExpense}
                onDelete={handleExpenseDelete}
              />
            </div>
            <div style={formContainerStyle}>
              <ExpenseForm
                expense={editingExpense}
                categories={categories}
                onSubmit={handleExpenseSubmit}
                onCancel={() => setEditingExpense(null)}
              />
            </div>
          </div>
        ) : (
          <div style={mainContentStyle}>
            <div style={listContainerStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                  paddingBottom: "16px",
                  borderBottom: "2px solid #f7fafc",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#00c853",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  🏷️
                </div>
                <h2
                  className="section-title"
                  style={{
                    margin: "0",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "700",
                    color: "#1a202c",
                    flex: 1,
                  }}
                >
                  Categories
                </h2>
                <span
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "#e8f5e8",
                    color: "#00c853",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {categories.length}
                </span>
              </div>
              <CategoryList
                categories={categories}
                onEdit={setEditingCategory}
                onDelete={handleCategoryDelete}
              />
            </div>
            <div style={formContainerStyle}>
              <CategoryForm
                category={editingCategory}
                onSubmit={handleCategorySubmit}
                onCancel={() => setEditingCategory(null)}
              />
            </div>
          </div>
        )}
      </div>
      <Footer isMobile={isMobile} />
    </div>
  );
};

export default App;
