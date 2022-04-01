import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductInsertT, ProductItemT } from "../../interface";
import { productListService } from "../features";

type ProductListState = {
  productList: ProductItemT[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
};

const initialState: ProductListState = {
  productList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProductList = createAsyncThunk<
  ProductItemT[],
  void,
  { rejectValue: string }
>("productList/getProductList", async (_, thunkAPI) => {
  try {
    return await productListService.getProducts();
  } catch (error: any) {
    const message: string = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const addProduct = createAsyncThunk<
  ProductItemT,
  ProductInsertT,
  { rejectValue: string }
>("productList/addProduct", async (product, thunkAPI) => {
  try {
    return await productListService.add(product);
  } catch (error: any) {
    const message: string = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateProduct = createAsyncThunk<
  ProductItemT,
  ProductItemT,
  { rejectValue: string }
>("productList/updateProduct", async (product, thunkAPI) => {
  try {
    return await productListService.update(product);
  } catch (error: any) {
    const message: string = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeProduct = createAsyncThunk<
  ProductItemT,
  string,
  { rejectValue: string }
>("productList/removeProduct", async (productId, thunkAPI) => {
  try {
    return await productListService.remove(productId);
  } catch (error: any) {
    const message: string = getErrorMessage(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    reset: (state: ProductListState) => ({ ...state, initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state: ProductListState) => {
        state.isLoading = true;
      })
      .addCase(getProductList.fulfilled, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productList = action.payload;
      })
      .addCase(getProductList.rejected, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.productList = [];
      })
      .addCase(addProduct.pending, (state: ProductListState) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productList = [...state.productList, action.payload];
      })
      .addCase(addProduct.rejected, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.productList = [];
      })
      .addCase(updateProduct.pending, (state: ProductListState) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload;
        state.productList = state.productList.map((product) =>
          product.id == updated.id ? updated : product
        );
      })
      .addCase(updateProduct.rejected, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.productList = [];
      })
      .addCase(removeProduct.pending, (state: ProductListState) => {
        state.isLoading = true;
      })
      .addCase(removeProduct.fulfilled, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updated = action.payload;
        state.productList = state.productList.filter(
          (product) => product.id !== updated.id
        );
      })
      .addCase(removeProduct.rejected, (state: ProductListState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.productList = [];
      });
  },
});

export const { reset } = productListSlice.actions;
export default productListSlice.reducer;

function getErrorMessage(error: any) {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
}
