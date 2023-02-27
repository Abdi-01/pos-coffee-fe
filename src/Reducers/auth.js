import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
      username: "",
      roleId: "",
  },
  reducers: {
    loginAction:(state, action)=>{
      state.username = action.payload.username;
      state.roleId=action.payload.roleId;
    }

  },
});

export const {loginAction} = authSlice.actions;
export default authSlice.reducer;
