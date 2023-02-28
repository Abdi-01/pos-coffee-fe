import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: '',
    roleId: '',
  },
  reducers: {
    loginAction: (state, action) => {
      state.username = action.payload.username;
      state.roleId = action.payload.roleId;
    },
    logoutAction: (state) => {
      state.username = '';
      console.log("Data username dari reducer :", state.username);
      state.roleId = '';
      console.log("Data roleId dari reducer :", state.roleId);
  }
  },
});

export const {loginAction, logoutAction} = authSlice.actions;

export default authSlice.reducer;
