// import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./component/Navbar/Navbar";
import Main from "./page/main/Main";
import { actions } from "./store/index";

type State = {
  counter: number;
};

const App = () => {
  const counter = useSelector((state: State) => state.counter);
  const dispatch = useDispatch();

  const increment = () => {
    console.log("button clicked");
    dispatch(actions.increment());
  };

  const decrement = () => {
    dispatch(actions.decrement());
  };

  const addBy = () => {
    // dispatch({ type: "ADD", payload: 10 });
    dispatch(actions.add(10));
  };
  return (
    <>
      <Navbar />
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={addBy}>Add by 10</button>
      <Main />
    </>
  );
};

export default App;
