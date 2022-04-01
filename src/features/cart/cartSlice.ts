import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartT, ProductT } from "../../interface";
import { cartService } from "../features";

export type CartState = {
  cart: CartT | undefined;
  products: ProductT[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
};

const initialState: CartState = {
  cart: undefined,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUserCart = createAsyncThunk<
  CartT,
  string,
  { rejectValue: string }
>("cart/getUserCart", async (userId, thunkAPI) => {
  try {
    return await cartService.getCartByUserId(userId);
  } catch (error: any) {
    const message: string = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCart = createAsyncThunk<
  CartT,
  CartT,
  { rejectValue: string }
>("cart/updateCart", async (cart, thunkAPI) => {
  try {
    return await cartService.update(cart);
  } catch (error: any) {
    const message: string = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const addCart = createAsyncThunk<CartT, CartT, { rejectValue: string }>(
  "cart/addCart",
  async (cart, thunkAPI) => {
    try {
      return await cartService.add(cart);
    } catch (error: any) {
      const message: string = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeCart = createAsyncThunk<
  CartT,
  string,
  { rejectValue: string }
>("cart/removeCart", async (productId, thunkAPI) => {
  try {
    return await cartService.remove(productId);
  } catch (error: any) {
    const message: string = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state: CartState) => ({ ...state, initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state: CartState) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state: CartState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.products = state.cart.products;
        //action.payload is data returned from axio call
      })
      .addCase(getUserCart.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.cart = undefined;
        state.products = [];
        //action.payload is message argument from thunkAPI.rejectWithValue(message)
      })
      .addCase(updateCart.pending, (state: CartState) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state: CartState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.products = state.cart.products;
        //action.payload is data returned from axio call
      })
      .addCase(updateCart.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.cart = undefined;
        state.products = [];
      })
      .addCase(addCart.pending, (state: CartState) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state: CartState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.products = state.cart.products;
      })
      .addCase(addCart.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.cart = undefined;
        state.products = [];
        //action.payload is message argument from thunkAPI.rejectWithValue(message)
      })
      .addCase(removeCart.pending, (state: CartState) => {
        state.isLoading = true;
      })
      .addCase(removeCart.fulfilled, (state: CartState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.products = state.cart.products;
      })
      .addCase(removeCart.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.cart = undefined;
        state.products = [];
        //action.payload is message argument from thunkAPI.rejectWithValue(message)
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;

function getErrorMessage(error: any) {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
}
