import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

// authReducer = authSlice.reducer in authSlice.ts

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore<RootState>({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
