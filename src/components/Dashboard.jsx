import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function Dashboard({ transactions, darkMode }) {

  if (transactions.length === 0) {
    return (
      <div style={{
        padding: "40px",
        textAlign: "center",
        background: darkMode ? "#1f2937" : "#ffffff",
        borderRadius: "16px"
      }}>
        <h3>No data available 📊</h3>
      </div>
    );
  }

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const cardBg = darkMode
    ? "linear-gradient(135deg, #1f2937, #111827)"
    : "linear-gradient(135deg, #ffffff, #e5e7eb)";

  const sectionBg = darkMode ? "#1f2937" : "#ffffff";

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📊 Overview</h2>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {[
          { title: "Balance", value: balance, color: "#22c55e" },
          { title: "Income", value: income, color: "#3b82f6" },
          { title: "Expenses", value: expenses, color: "#ef4444" },
        ].map((c, i) => (
          <div key={i}
            style={{
              background: cardBg,
              padding: "20px",
              borderRadius: "16px"
            }}
          >
            <p>{c.title}</p>
            <h2 style={{ color: c.color }}>₹{c.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>

        <div style={{ background: sectionBg, padding: "20px", borderRadius: "16px" }}>
          <h3>Spending Breakdown</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={transactions.filter(t => t.type === "expense")}
              dataKey="amount"
              nameKey="category"
              outerRadius={90}
            >
              <Cell fill="#3b82f6" />
              <Cell fill="#ef4444" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div style={{ background: sectionBg, padding: "20px", borderRadius: "16px" }}>
          <h3>Transaction Trend</h3>
          <LineChart width={400} height={250} data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#22c55e" />
          </LineChart>
        </div>

      </div>
    </div>
  );
}