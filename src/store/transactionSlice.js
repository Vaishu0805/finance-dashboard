import { createSlice } from "@reduxjs/toolkit";
import { initialTransactions } from "../data/mockData";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: initialTransactions,
    role: "viewer",
    filter: "",
  },
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTransaction, setRole, setFilter } = transactionSlice.actions;
export default transactionSlice.reducer;