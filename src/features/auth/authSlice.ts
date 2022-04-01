import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, LoginUser, ResponseUser, LoginResponse } from "../../interface";
import { RootState } from "../../app/store";
import { tokenStorage, authService } from "../features";

type UserState = {
  user: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
  userInfo: undefined | ResponseUser;
  isAdmin: boolean;
};

//Get user from localStorage
const localStorageUser = tokenStorage.getToken();
const initialState: UserState = {
  user: localStorageUser ? localStorageUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: undefined,
  userInfo: undefined,
  isAdmin: false,
};

//Register user
//< return type of the payload creator, first argument type to the payload creator, options fields for defininig thunkAPI field types>
export const register = createAsyncThunk<
  ResponseUser,
  User,
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.signup(user);
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  LoginResponse,
  LoginUser,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.signin(user);
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUser = createAsyncThunk<
  ResponseUser,
  void,
  { state: RootState; rejectValue: string }
>("auth/getUser", async (_, thunkAPI) => {
  try {
    const userId = thunkAPI.getState().auth.user! as string; //because this page only shows when user logged in, type casting is possible
    return await authService.getUser(userId); //return type User
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const update = createAsyncThunk<
  ResponseUser,
  User,
  { state: RootState; rejectValue: string }
>("auth/update", async (user, thunkAPI) => {
  try {
    const userId = thunkAPI.getState().auth.user! as string; //because this page only shows when user logged in, type casting is possible
    return await authService.update(user, userId); //return type User
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

/* 
    need to register all functions to createSlice as reducer 
    to update state
*/

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: UserState) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.userInfo = undefined;
      state.isAdmin = false;
    },
    setAdmin: (state: UserState) => {
      state.isAdmin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: UserState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.id;
        //action.payload is data returned from axio call
      })
      .addCase(register.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.user = null;
        //action.payload is message argument from thunkAPI.rejectWithValue(message)
      })
      .addCase(login.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: UserState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.userId;
      })
      .addCase(login.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state: UserState) => {
        state.user = null;
      })
      .addCase(getUser.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state: UserState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.id;
        state.userInfo = action.payload;
        //action.payload is data returned from axio call
      })
      .addCase(getUser.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.user = null;
        state.userInfo = undefined;
        //action.payload is message argument from thunkAPI.rejectWithValue(message)
      })
      .addCase(update.pending, (state: UserState) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state: UserState, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
        //action.payload is data returned from axio call
      })
      .addCase(update.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.user = null;
        state.userInfo = undefined;
        //action.payload is message argument from thunkAPI.rejectWithValue(message)
      });
  },
});

export const { reset, setAdmin } = authSlice.actions;
export default authSlice.reducer;
