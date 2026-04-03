import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  // Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));

    if (saved && saved.length > 0) {
      setTransactions(saved);
    } else {
      setTransactions([
        { id: 1, date: "2026-04-01", amount: 500, category: "Food", type: "expense" },
        { id: 2, date: "2026-04-02", amount: 10000, category: "Salary", type: "income" },
      ]);
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        background: darkMode ? "#1e1e1e" : "#f5f7fa",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      <h1>💰 Finance Dashboard</h1>

      {/* Controls */}
      <div style={{ marginBottom: "20px" }}>
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ marginLeft: "20px" }}
        >
          {darkMode ? "Light ☀️" : "Dark 🌙"}
        </button>
      </div>

      <Dashboard transactions={transactions} darkMode={darkMode} />

      <Transactions
        transactions={transactions}
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
        role={role}
        darkMode={darkMode}
      />

      <Insights transactions={transactions} />
    </div>
  );
}

export default App;