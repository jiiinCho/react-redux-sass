import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/header/Header";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
