import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

import {
  getTransactions,
  addTransactionApi,
  deleteTransactionApi,
  updateTransactionApi,
} from "./api/mockApi";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(true);

  // 🔥 LOAD DATA FROM MOCK API
  useEffect(() => {
    getTransactions().then((data) => setTransactions(data));
  }, []);

  // ➕ ADD
  const addTransaction = async (newTx) => {
    const tx = { ...newTx, id: Date.now() };
    await addTransactionApi(tx);
    setTransactions((prev) => [...prev, tx]);
  };

  // ❌ DELETE
  const deleteTransaction = async (id) => {
    await deleteTransactionApi(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ✏️ EDIT
  const editTransaction = async (updatedTx) => {
    await updateTransactionApi(updatedTx);
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode ? "#0f172a" : "#f5f7fa",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* 🔥 SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#111827",
          color: "#ffffff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ color: "#22c55e" }}>FinTrack</h2>

        <div>🏠 Overview</div>
        <div>💳 Transactions</div>
        <div>📊 Analytics</div>
        <div>⚙️ Settings</div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* 🔹 HEADER */}
        <div
          style={{
            padding: "15px 20px",
            background: darkMode ? "#1f2937" : "#ffffff",
            color: darkMode ? "#ffffff" : "#111827",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #374151",
          }}
        >
          <h2 style={{ fontWeight: "600" }}>Dashboard</h2>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            
            {/* ROLE BADGE */}
            <span
              style={{
                padding: "5px 10px",
                borderRadius: "8px",
                background: role === "admin" ? "#22c55e" : "#f59e0b",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              {role === "admin" ? "👨‍💼 Admin" : "👀 Viewer"}
            </span>

            {/* ROLE SELECT */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            {/* DARK MODE BUTTON */}
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* 🔹 CONTENT */}
        <div style={{ padding: "20px", flex: 1 }}>
          
          {/* ✅ IMPORTANT: PASS darkMode */}
          <Dashboard
            transactions={transactions}
            darkMode={darkMode}
          />

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

        {/* 🔥 FOOTER */}
        <footer
          style={{
            padding: "15px",
            textAlign: "center",
            background: darkMode ? "#1f2937" : "#ffffff",
            borderTop: "1px solid #374151",
          }}
        >
          <p>© 2026 Vaishnavi | Finance Dashboard</p>
        </footer>
      </div>
    </div>
  );
}

export default App;