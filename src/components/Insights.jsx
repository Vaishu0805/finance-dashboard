export default function Insights({ transactions }) {
  const categoryTotals = {};

  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📈 Insights</h2>

      {highest ? (
        <p>Highest spending category: {highest[0]}</p>
      ) : (
        <p>No expense data</p>
      )}
    </div>
  );
}