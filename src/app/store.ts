import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";

// authReducer = authSlice.reducer in authSlice.ts

export const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore<RootState>({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
  },
});
