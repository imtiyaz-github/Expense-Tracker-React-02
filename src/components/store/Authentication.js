import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token2"),
  userEmail: localStorage.getItem("email2"),
  isAuthenticated: localStorage.getItem("isLoggedIn") === "true",
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      localStorage.setItem("token2", action.payload.token);
      localStorage.setItem("email2", action.payload.email);
      state.isAuthenticated = true;
      localStorage.setItem("isLoggedIn", true);
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token2");
      localStorage.removeItem("email2");
      localStorage.setItem("isLoggedIn", false);
      state.token = null;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
