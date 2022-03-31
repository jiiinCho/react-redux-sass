import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../interface";
import authService from "./authService";

type AutheticatedUser = {
  id: string;
  username: string;
};

type UserState = {
  user: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
};

//Get user from localStorage
const localStorageUser = localStorage.getItem("user");

const initialState: UserState = {
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: undefined,
};

//Register user
//< return type of the payload creator, first argument type to the payload creator, options fields for defininig thunkAPI field types>
export const register = createAsyncThunk<
  AutheticatedUser,
  User,
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user); //return type User
  } catch (error: any) {
    const message: string =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  AutheticatedUser,
  User,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user); //return type User
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
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
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
        state.user = action.payload.username;
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
        state.user = action.payload.username;
        //action.payload is data returned from axio call
      })
      .addCase(login.rejected, (state: UserState, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ? action.payload : action.error.message;
        state.user = null;
        //action.payload is message argument from thunkAPI.rejectWithValue(message)
      })
      .addCase(logout.fulfilled, (state: UserState) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
