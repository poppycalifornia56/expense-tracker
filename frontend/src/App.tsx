import React, { useState, useEffect } from "react";
import type { Category, Expense } from "./types";
import { categoryAPI, expenseAPI } from "./services/api";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

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
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "48px 60px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            textAlign: "center",
            border: "1px solid #e8ecf4",
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
              fontSize: "16px",
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

  console.log(
    "Expenses for total calculation:",
    expenses.map((e) => ({
      id: e.id,
      title: e.title,
      amount: e.amount,
      type: typeof e.amount,
    }))
  );
  console.log("Calculated total:", totalExpenses);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid #e8ecf4",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "#1565c0",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto",
                fontSize: "24px",
              }}
            >
              💰
            </div>
            <h1
              style={{
                margin: "0 0 8px 0",
                fontSize: "28px",
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
                fontSize: "16px",
              }}
            >
              Your finances at a glance
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)",
                color: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(255, 107, 107, 0.25)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  opacity: "0.9",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Total Expenses
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>
                {formatAmount(totalExpenses)}
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                color: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(21, 101, 192, 0.25)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  opacity: "0.9",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Transactions
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>
                {expenses.length}
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #00c853 0%, #4caf50 100%)",
                color: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 200, 83, 0.25)",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  opacity: "0.9",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Categories
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>
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
              }}
            >
              !
            </div>
            <span
              style={{ color: "#c53030", fontWeight: "500", fontSize: "14px" }}
            >
              {error}
            </span>
          </div>
        )}

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "8px",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid #e8ecf4",
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            onClick={() => setActiveTab("expenses")}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "16px 24px",
              backgroundColor:
                activeTab === "expenses" ? "#1565c0" : "transparent",
              color: activeTab === "expenses" ? "white" : "#4a5568",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              transition: "all 0.2s ease",
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
              padding: "16px 24px",
              backgroundColor:
                activeTab === "categories" ? "#00c853" : "transparent",
              color: activeTab === "categories" ? "white" : "#4a5568",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              transition: "all 0.2s ease",
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 400px",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  border: "1px solid #e8ecf4",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                    paddingBottom: "16px",
                    borderBottom: "2px solid #f7fafc",
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
                    }}
                  >
                    💸
                  </div>
                  <h2
                    style={{
                      margin: "0",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#1a202c",
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
            </div>
            <div style={{ position: "sticky", top: "20px" }}>
              <ExpenseForm
                expense={editingExpense}
                categories={categories}
                onSubmit={handleExpenseSubmit}
                onCancel={() => setEditingExpense(null)}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 400px",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  border: "1px solid #e8ecf4",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                    paddingBottom: "16px",
                    borderBottom: "2px solid #f7fafc",
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
                    }}
                  >
                    🏷️
                  </div>
                  <h2
                    style={{
                      margin: "0",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#1a202c",
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
            </div>
            <div style={{ position: "sticky", top: "20px" }}>
              <CategoryForm
                category={editingCategory}
                onSubmit={handleCategorySubmit}
                onCancel={() => setEditingCategory(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
