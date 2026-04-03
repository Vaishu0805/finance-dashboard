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
  // ✅ Calculate totals
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  // ✅ Category-wise expense data
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

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📊 Dashboard</h2>

      {/* 🔥 Responsive Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* Balance */}
        <div
          style={{
            flex: "1 1 200px",
            background: darkMode ? "#2c2c2c" : "#fff",
            color: darkMode ? "#fff" : "#000",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h4>Total Balance</h4>
          <h2 style={{ color: "#2ecc71" }}>₹{balance}</h2>
        </div>

        {/* Income */}
        <div
          style={{
            flex: "1 1 200px",
            background: darkMode ? "#2c2c2c" : "#fff",
            color: darkMode ? "#fff" : "#000",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h4>Income</h4>
          <h2 style={{ color: "#3498db" }}>₹{income}</h2>
        </div>

        {/* Expenses */}
        <div
          style={{
            flex: "1 1 200px",
            background: darkMode ? "#2c2c2c" : "#fff",
            color: darkMode ? "#fff" : "#000",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h4>Expenses</h4>
          <h2 style={{ color: "#e74c3c" }}>₹{expenses}</h2>
        </div>
      </div>

      {/* 🥧 Pie Chart */}
      <div style={{ marginBottom: "40px" }}>
        <h3>📌 Spending Breakdown</h3>

        {pieData.length > 0 ? (
          <PieChart width={350} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No expense data available</p>
        )}
      </div>

      {/* 📈 Line Chart */}
      <div>
        <h3>📈 Transaction Trend</h3>

        {transactions.length > 0 ? (
          <LineChart width={500} height={300} data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <p>No transaction data</p>
        )}
      </div>
    </div>
  );
}