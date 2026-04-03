import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(true);

  // Load data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));

    if (saved && saved.length > 0) {
      setTransactions(saved);
    } else {
      setTransactions([
        {
          id: 1,
          date: "2026-04-01",
          amount: 500,
          category: "Food",
          type: "expense",
        },
        {
          id: 2,
          date: "2026-04-02",
          amount: 10000,
          category: "Salary",
          type: "income",
        },
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
        display: "flex",
        minHeight: "100vh",
        background: darkMode ? "#121212" : "#f5f7fa",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      {/* 🔥 SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#1f2937",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>💰 FinTrack</h2>
        <p>Dashboard</p>
        <p>Transactions</p>
        <p>Insights</p>

        <hr />

        <p>Settings</p>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* 🔹 HEADER */}
        <div
          style={{
            padding: "15px 20px",
            background: darkMode ? "#1e1e1e" : "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Finance Dashboard</h2>

          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{ marginLeft: "10px" }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* 🔹 CONTENT AREA */}
        <div style={{ padding: "20px", flex: 1 }}>
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

        {/* 🔥 FOOTER (FIXED PROPERLY) */}
        <footer
          style={{
            padding: "15px",
            textAlign: "center",
            background: darkMode ? "#1e1e1e" : "#fff",
            borderTop: "1px solid #444",
          }}
        >
          <p>© 2026 Vaishnavi | Finance Dashboard</p>
        </footer>
      </div>
    </div>
  );
}

export default App;