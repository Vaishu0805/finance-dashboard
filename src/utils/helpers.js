// 🔍 FILTER TRANSACTIONS
export const filterTransactions = (transactions, search, typeFilter) => {
  let filtered = [...transactions];

  // Search by category
  if (search) {
    filtered = filtered.filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by type
  if (typeFilter) {
    filtered = filtered.filter((t) => t.type === typeFilter);
  }

  return filtered;
};

// 🔥 SORT TRANSACTIONS
export const sortTransactions = (transactions, sortType) => {
  let sorted = [...transactions];

  switch (sortType) {
    case "amountHigh":
      sorted.sort((a, b) => b.amount - a.amount);
      break;

    case "amountLow":
      sorted.sort((a, b) => a.amount - b.amount);
      break;

    case "dateNew":
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;

    case "dateOld":
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;

    default:
      break;
  }

  return sorted;
};

// 📤 EXPORT CSV
export const exportToCSV = (transactions) => {
  if (transactions.length === 0) return;

  const csv = [
    ["Date", "Amount", "Category", "Type"],
    ...transactions.map((t) => [
      t.date,
      t.amount,
      t.category,
      t.type,
    ]),
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

// 📊 CALCULATE SUMMARY
export const calculateSummary = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

// 📈 HIGHEST SPENDING CATEGORY
export const getHighestCategory = (transactions) => {
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

  return highest ? highest[0] : "N/A";
};

// 📉 MONTHLY COMPARISON
export const getMonthlyComparison = (transactions) => {
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth - 1;

  let current = 0;
  let last = 0;

  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();

    if (t.type === "expense") {
      if (month === currentMonth) current += t.amount;
      if (month === lastMonth) last += t.amount;
    }
  });

  if (last === 0) return "No previous data";

  const diff = ((current - last) / last) * 100;

  return diff > 0
    ? `Expenses increased by ${diff.toFixed(1)}%`
    : `Expenses decreased by ${Math.abs(diff).toFixed(1)}%`;
};