import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './Authentication';
import  expenseSlice from './Expense'

const store = configureStore({
  reducer: { authentication: AuthSlice, expense: expenseSlice },
});

export default store;
