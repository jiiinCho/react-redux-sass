import { createStore, AnyAction } from "redux";

interface CounterState {
  counter: number;
}

const initialState: CounterState = {
  counter: 0,
};

const reducerFn = (state = initialState, action: AnyAction) => {
  //synchronous function & immutable
  switch (action.type) {
    case "INC":
      return { counter: state.counter + 1 };
    case "DEC":
      return { counter: state.counter - 1 };
    case "ADD":
      return { counter: state.counter + action.payload };
    default:
      return state;
  }
  return state;
};

const store = createStore(reducerFn);
export default store;
