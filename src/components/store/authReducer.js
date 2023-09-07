import { createSlice } from "@reduxjs/toolkit";

const initialAuthSate = {
  isAuthenticated: !!localStorage.getItem("email"),
  emailId: null, //add a userId property
};


const authSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthSate,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.emailId = action.payload.email; 
    },
    logout(state) {
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      state.isAuthenticated = false;
      state.emailId = null; //reset the userId
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
