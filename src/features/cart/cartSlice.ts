import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
  ProductT,
  { state: RootState; rejectValue: string }
>("cart/updateCart", async (product, thunkAPI) => {
  try {
    const cart = thunkAPI.getState().cart.cart;
    const currProducts = thunkAPI.getState().cart.products;

    const updatedProducts: ProductT[] = currProducts.map((item) =>
      item.productId === product.productId ? product : item
    );
    if (cart) {
      const requestCart: CartT = { ...cart, products: updatedProducts };
      return await cartService.update(requestCart);
    } else {
      throw new Error("cart is empty!");
    }
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
    removeUICart: (state: CartState, action) => {
      console.log("removeUicART action.payload", action.payload);
      state.products = state.products.filter(
        (product: ProductT) => product.productId !== action.payload
      );
    },
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
      })
      .addCase(updateCart.pending, (state: CartState) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state: CartState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.products = action.payload.products;
        // const updated = action.payload.products;
        // state.products = state.products.map((product: ProductT) =>
        //   product.productId == updated.productId ? updated : product
        // );
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
        const receivedProduct = action.payload.products[0];
        state.products = [...state.products, receivedProduct];
      })
      .addCase(addCart.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.cart = undefined;
        state.products = [];
      })
      .addCase(removeCart.pending, (state: CartState) => {
        state.isLoading = true;
      })
      .addCase(removeCart.fulfilled, (state: CartState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.products = [];
      })
      .addCase(removeCart.rejected, (state: CartState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.cart = undefined;
        state.products = [];
      });
  },
});

export const { reset, removeUICart } = cartSlice.actions;
export default cartSlice.reducer;

function getErrorMessage(error: any) {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
}
