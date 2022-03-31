import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// authReducer = authSlice.reducer in authSlice.ts

export const rootReducer = combineReducers({
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore<RootState>({
  reducer: {
    auth: authReducer,
  },
});
