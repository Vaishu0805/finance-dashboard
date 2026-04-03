import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function Dashboard({ transactions }) {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const cards = [
    { title: "Balance", value: balance, color: "#22c55e" },
    { title: "Income", value: income, color: "#3b82f6" },
    { title: "Expenses", value: expenses, color: "#ef4444" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>📊 Overview</h2>

      {/* 🔥 CARDS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {cards.map((card, i) => (
          <div key={i}
            style={{
              background: "linear-gradient(135deg, #1f2937, #111827)",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              transition: "0.3s"
            }}
            onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.05)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
          >
            <p style={{ opacity: 0.7 }}>{card.title}</p>
            <h2 style={{ color: card.color }}>₹{card.value}</h2>
          </div>
        ))}
      </div>

      {/* 🔥 CHARTS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>

        {/* Pie */}
        <div style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "16px"
        }}>
          <h3>Spending</h3>
          <PieChart width={300} height={250}>
            <Pie data={transactions.filter(t=>t.type==="expense")}
              dataKey="amount"
              nameKey="category"
              outerRadius={90}
            >
              <Cell fill="#3b82f6"/>
              <Cell fill="#ef4444"/>
            </Pie>
            <Tooltip/>
            <Legend/>
          </PieChart>
        </div>

        {/* Line */}
        <div style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "16px"
        }}>
          <h3>Trend</h3>
          <LineChart width={400} height={250} data={transactions}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="amount" stroke="#22c55e"/>
          </LineChart>
        </div>

      </div>
    </div>
  );
}