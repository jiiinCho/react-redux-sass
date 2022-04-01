import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import productListReducer from "../features/products/productsSlice";

// authReducer = authSlice.reducer in authSlice.ts

export const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  productList: productListReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore<RootState>({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    productList: productListReducer,
  },
});
