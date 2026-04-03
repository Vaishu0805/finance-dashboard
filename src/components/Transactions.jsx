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

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginTop: "30px", marginBottom: "40px" }}>
      <h2>📋 Transactions</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      {role === "admin" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
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

      <div style={{ overflowX: "auto", marginTop: "10px" }}>
        <table border="1" style={{ width: "100%", background: darkMode ? "#2c2c2c" : "#fff" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.category}</td>
                  <td>{t.type}</td>

                  {role === "admin" && (
                    <td>
                      <button onClick={() => handleEdit(t)}>Edit</button>
                      <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
<footer
  style={{
    marginTop: "40px",
    textAlign: "center",
    opacity: 0.7,
  }}
>
  <p>© 2026 Vaishnavi | Finance Dashboard</p>
</footer>