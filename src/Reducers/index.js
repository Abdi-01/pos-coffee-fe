import { configureStore } from "@reduxjs/toolkit";
// import reducer
import authReducer from "./auth";

export const globalStore = configureStore({
  reducer: {
    authReducer
  },
});

export default globalStore;