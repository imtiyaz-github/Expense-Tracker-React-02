import { createSlice } from "@reduxjs/toolkit";

const initialExpState = createSlice({
  items: [],
  
});

const ExpensesSlice = createSlice({
  name: "Expense",
  initialState: initialExpState,
  reducer: {
    addItemHandler(state, action) {
      state.items = [...action.payload];
    },
  },
});


export const expAction = ExpensesSlice.actions;
export default ExpensesSlice.reducer;