import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  data: {},
  showPremium: localStorage.getItem("isPremium") === true,
  showDark: localStorage.getItem("darkTheme") === "true",
};


const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    recivedData(state, action) {
      state.data = action.payload;
    },

    Premium(state) {
      state.showPremium = true;
      localStorage.setItem("isPremium", true);
    },

    notPremium(state) {
      state.showPremium = false;
      localStorage.setItem("isPremium", false);
    },
    togggle(state) {
      state.showDark = !state.showDark;
      localStorage.setItem("darkTheme", state.showDark.toString());
      window.location.reload();
    },
  },
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
