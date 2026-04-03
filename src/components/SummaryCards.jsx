import { useSelector } from "react-redux";

export default function SummaryCards() {
  const transactions = useSelector((state) => state.transactions.list);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>Balance: ₹{balance}</div>
      <div>Income: ₹{income}</div>
      <div>Expenses: ₹{expenses}</div>
    </div>
  );
}