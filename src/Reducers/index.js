import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth';
// import reducer

export const globalStore = configureStore({
  reducer: {
    auth: authReducer
  },
});
