export default function Insights({ transactions }) {
  if (transactions.length === 0) {
    return <p>No insights available</p>;
  }

  // 🔹 Highest spending category
  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // 🔹 Monthly comparison
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth - 1;

  let currentTotal = 0;
  let lastTotal = 0;

  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();

    if (t.type === "expense") {
      if (month === currentMonth) currentTotal += t.amount;
      if (month === lastMonth) lastTotal += t.amount;
    }
  });

  let comparison = "No previous data";

  if (lastTotal > 0) {
    const diff = ((currentTotal - lastTotal) / lastTotal) * 100;

    if (diff > 0) {
      comparison = `Expenses increased by ${diff.toFixed(1)}%`;
    } else {
      comparison = `Expenses decreased by ${Math.abs(diff).toFixed(1)}%`;
    }
  }

  // 🔹 Extra insight
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const extraInsight =
    income > expense
      ? "You are saving money 💰"
      : "Your expenses are higher than income ⚠️";

  return (
    <div style={{ marginTop: "30px", marginBottom: "40px" }}>
      <h2>📈 Insights</h2>

      <div style={{ marginTop: "10px" }}>
        <p>
          🔥 Highest Spending Category:{" "}
          <strong>{highest ? highest[0] : "N/A"}</strong>
        </p>

        <p>📊 Monthly Comparison: {comparison}</p>

        <p>💡 Insight: {extraInsight}</p>
      </div>
    </div>
  );
}