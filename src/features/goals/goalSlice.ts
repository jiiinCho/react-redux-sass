import { createSlice } from "@reduxjs/toolkit";

type GoalState = {
  goals: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | undefined;
};

const initialState: GoalState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state: GoalState) => ({ ...state, initialState }),
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
