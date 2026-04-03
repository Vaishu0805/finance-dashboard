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

  useEffect(() => {
    getTransactions().then((data) => setTransactions(data));
  }, []);

  const addTransaction = async (newTx) => {
    const tx = { ...newTx, id: Date.now() };
    await addTransactionApi(tx);
    setTransactions((prev) => [...prev, tx]);
  };

  const deleteTransaction = async (id) => {
    await deleteTransactionApi(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const editTransaction = async (updatedTx) => {
    await updateTransactionApi(updatedTx);
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: darkMode ? "#0f172a" : "#f5f7fa",
      color: darkMode ? "#fff" : "#000",
    }}>
      
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#111827", padding: "20px" }}>
        <h2 style={{ color: "#22c55e" }}>FinTrack</h2>
      </div>

      {/* Main */}
      <div style={{ flex: 1 }}>
        
        {/* Header */}
        <div style={{
          padding: "15px",
          background: darkMode ? "#1f2937" : "#fff",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <h2>Dashboard</h2>

          <div>
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            <button onClick={()=>setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
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

      </div>
    </div>
  );
}

export default App;