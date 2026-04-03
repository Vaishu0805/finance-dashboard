let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

export const getTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(transactions), 500);
  });
};

export const addTransactionApi = (newTx) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      transactions.push(newTx);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      resolve(newTx);
    }, 300);
  });
};

export const deleteTransactionApi = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      transactions = transactions.filter((t) => t.id !== id);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      resolve();
    }, 300);
  });
};

export const updateTransactionApi = (updatedTx) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      transactions = transactions.map((t) =>
        t.id === updatedTx.id ? updatedTx : t
      );
      localStorage.setItem("transactions", JSON.stringify(transactions));
      resolve(updatedTx);
    }, 300);
  });
};