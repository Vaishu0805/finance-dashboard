import { createContext, useContext, useState, useEffect } from "react";
import {
  getTransactions,
  addTransactionApi,
  deleteTransactionApi,
  updateTransactionApi,
} from "../api/mockApi";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(true);

  // 🔥 Load data from API
  useEffect(() => {
    getTransactions().then((data) => setTransactions(data));
  }, []);

  // ➕ Add Transaction
  const addTransaction = async (newTx) => {
    const tx = { ...newTx, id: Date.now() };
    await addTransactionApi(tx);
    setTransactions((prev) => [...prev, tx]);
  };

  // ❌ Delete Transaction
  const deleteTransaction = async (id) => {
    await deleteTransactionApi(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // ✏️ Edit Transaction
  const editTransaction = async (updatedTx) => {
    await updateTransactionApi(updatedTx);
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
        role,
        setRole,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 🔥 Custom Hook
export const useAppContext = () => useContext(AppContext);