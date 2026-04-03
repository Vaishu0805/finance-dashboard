import { useAppContext } from "./context/AppContext";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";

function App() {
  const { transactions, role, setRole, darkMode, setDarkMode } =
    useAppContext();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode ? "#0f172a" : "#f5f7fa",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#111827", padding: "20px" }}>
        <h2 style={{ color: "#22c55e" }}>FinTrack</h2>
      </div>

      {/* Main */}
      <div style={{ flex: 1 }}>
        {/* Header */}
        <div style={{ padding: "15px", background: "#1f2937" }}>
          <h2>Dashboard</h2>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
          <Dashboard />
          <Transactions />
          <Insights />
        </div>
      </div>
    </div>
  );
}

export default App;