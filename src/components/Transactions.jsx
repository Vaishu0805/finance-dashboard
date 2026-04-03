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

  // 🔥 Sorting
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
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="amountHigh">Amount (High → Low)</option>
          <option value="amountLow">Amount (Low → High)</option>
          <option value="dateNew">Date (Newest)</option>
          <option value="dateOld">Date (Oldest)</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
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
            {sorted.length === 0 ? (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            ) : (
              sorted.map((t) => (
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