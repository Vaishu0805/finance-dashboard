import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Dashboard({ transactions, darkMode }) {
  if (transactions.length === 0) {
    return <p>No data available. Add transactions!</p>;
  }

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const categoryData = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const cardStyle = {
    flex: "1 1 200px",
    background: darkMode ? "#2c2c2c" : "#fff",
    color: darkMode ? "#fff" : "#000",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
  };

  return (
    <div style={{ marginTop: "30px", marginBottom: "40px" }}>
      <h2>📊 Dashboard</h2>

      {/* Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {[ 
          { title: "Total Balance", value: balance, color: "#2ecc71" },
          { title: "Income", value: income, color: "#3498db" },
          { title: "Expenses", value: expenses, color: "#e74c3c" },
        ].map((card, index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h4>{card.title}</h4>
            <h2 style={{ color: card.color }}>₹{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div style={{ marginTop: "30px" }}>
        <h3>📌 Spending Breakdown</h3>

        {pieData.length > 0 ? (
          <PieChart width={350} height={300}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No expense data available</p>
        )}
      </div>

      {/* Line Chart */}
      <div style={{ marginTop: "30px" }}>
        <h3>📈 Transaction Trend</h3>

        <LineChart width={500} height={300} data={transactions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}