import { useState } from "react";

export default function Transactions({
  transactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
  role,
  darkMode,
}) {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

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

  // 🔍 Filter
  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 Sort
  let sorted = [...filtered];
  if (sortType === "amountHigh") {
    sorted.sort((a, b) => b.amount - a.amount);
  } else if (sortType === "amountLow") {
    sorted.sort((a, b) => a.amount - b.amount);
  } else if (sortType === "dateNew") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === "dateOld") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  return (
    <div style={{ marginTop: "30px", marginBottom: "40px" }}>
      <h2>📋 Transactions</h2>

      {/* 🔍 Search + Sort */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            borderRadius: "6px",
          }}
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="">Sort By</option>
          <option value="amountHigh">Amount High → Low</option>
          <option value="amountLow">Amount Low → High</option>
          <option value="dateNew">Newest</option>
          <option value="dateOld">Oldest</option>
        </select>
      </div>

      {/* 🔥 VIEWER MESSAGE */}
      {role === "viewer" && (
        <p style={{ color: "#f59e0b" }}>
          Viewer Mode: You can only view transactions
        </p>
      )}

      {/* 🔥 FORM */}
      {role === "admin" && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "15px",
          }}
        >
          <input type="date" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} />

          <input type="number" placeholder="Amount" value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })} />

          <input placeholder="Category" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />

          <select value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      )}

      {/* 🔥 TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            background: darkMode ? "#1f2937" : "#fff",
            borderRadius: "10px",
          }}
        >
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    No transactions found. Try adding one!
                  </div>
                </td>
              </tr>
            ) : (
              sorted.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.category}</td>
                  <td>{t.type}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(t)}
                      disabled={role !== "admin"}
                      style={{ opacity: role !== "admin" ? 0.5 : 1 }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTransaction(t.id)}
                      disabled={role !== "admin"}
                      style={{ opacity: role !== "admin" ? 0.5 : 1 }}
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