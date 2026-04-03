import { useState } from "react";

export default function Transactions({
  transactions,
  deleteTransaction,
  role,
  darkMode,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const bg = darkMode ? "#1f2937" : "#ffffff";
  const text = darkMode ? "#ffffff" : "#000000";

  let filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (typeFilter) {
    filtered = filtered.filter((t) => t.type === typeFilter);
  }

  const exportCSV = () => {
    const csv = [
      ["Date", "Amount", "Category", "Type"],
      ...filtered.map((t) => [t.date, t.amount, t.category, t.type]),
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📋 Transactions</h2>

      {/* Controls */}
      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button onClick={exportCSV}>Export CSV</button>
      </div>

      {/* Table */}
      <table style={{
        width: "100%",
        background: bg,
        color: text,
        borderCollapse: "collapse"
      }}>
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
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No transactions found
              </td>
            </tr>
          ) : (
            filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td>{t.type}</td>
                <td>
                  <button
                    disabled={role !== "admin"}
                    onClick={() => deleteTransaction(t.id)}
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
  );
}