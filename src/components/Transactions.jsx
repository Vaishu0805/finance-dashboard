import { useState } from "react";

export default function Transactions({
  transactions,
  addTransaction,
  deleteTransaction,
  editTransaction,
  role,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortType, setSortType] = useState("");

  // 🔥 Filter
  let filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (typeFilter) {
    filtered = filtered.filter((t) => t.type === typeFilter);
  }

  // 🔥 Sort
  if (sortType === "amount") {
    filtered.sort((a, b) => b.amount - a.amount);
  }

  // 🔥 EXPORT CSV
  const exportCSV = () => {
    const csv = [
      ["Date", "Amount", "Category", "Type"],
      ...filtered.map((t) => [t.date, t.amount, t.category, t.type]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div>
      <h2>Transactions</h2>

      {/* 🔍 Filters */}
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

      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="">Sort</option>
        <option value="amount">Amount</option>
      </select>

      <button onClick={exportCSV}>Export CSV</button>

      {/* Table */}
      <table border="1">
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
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td>
                <button onClick={() => deleteTransaction(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}