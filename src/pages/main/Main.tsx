import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./Main.scss";

const Main = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <main className="main">
      <h1>
        Hello world - {process.env.NODE_ENV} {process.env.name}
      </h1>
      <ul>
        <h3>Main list, SCSS would not be overwrite?</h3>
        <li>Be patient</li>
        <li>and optimistic</li>
      </ul>
    </main>
  );
};

export default Main;
