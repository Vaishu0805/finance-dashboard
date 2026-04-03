import { useState } from "react";
import {
  filterTransactions,
  sortTransactions,
  exportToCSV,
} from "../utils/helpers";

export default function Transactions({
  transactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
  role,
  darkMode,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortType, setSortType] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // 🔥 FILTER + SORT
  const filtered = filterTransactions(transactions, search, typeFilter);
  const sorted = sortTransactions(filtered, sortType);

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) return;

    if (editingId) {
      editTransaction({ ...form, id: editingId, amount: Number(form.amount) });
      setEditingId(null);
    } else {
      addTransaction({ ...form, amount: Number(form.amount) });
    }

    setForm({ date: "", amount: "", category: "", type: "expense" });
  };

  const handleEdit = (t) => {
    setForm(t);
    setEditingId(t.id);
  };

  const bg = darkMode ? "#1f2937" : "#ffffff";
  const text = darkMode ? "#ffffff" : "#000000";

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📋 Transactions</h2>

      {/* 🔍 FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "15px",
        }}
      >
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        />

        <select
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          onChange={(e) => setSortType(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Sort</option>
          <option value="amountHigh">Amount High → Low</option>
          <option value="amountLow">Amount Low → High</option>
          <option value="dateNew">Newest</option>
          <option value="dateOld">Oldest</option>
        </select>

        <button
          onClick={() => exportToCSV(sorted)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      {/* ⚠ VIEWER MESSAGE */}
      {role === "viewer" && (
        <p style={{ color: "#f59e0b" }}>
          Viewer Mode: You can only view transactions
        </p>
      )}

      {/* ➕ ADD / EDIT FORM */}
      {role === "admin" && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "15px",
          }}
        >
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      )}

      {/* 📊 TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            background: bg,
            color: text,
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#374151" }}>
            <tr>
              <th style={{ padding: "10px" }}>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No transactions found
                </td>
              </tr>
            ) : (
              sorted.map((t) => (
                <tr key={t.id} style={{ textAlign: "center" }}>
                  <td>{t.date}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.category}</td>
                  <td>{t.type}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(t)}
                      disabled={role !== "admin"}
                      style={{
                        marginRight: "5px",
                        opacity: role !== "admin" ? 0.5 : 1,
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTransaction(t.id)}
                      disabled={role !== "admin"}
                      style={{
                        opacity: role !== "admin" ? 0.5 : 1,
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}