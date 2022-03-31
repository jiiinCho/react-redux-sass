import { useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Header = () => {
  const [expand, setExpand] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  const onLogin = () => {
    setExpand(false);
    navigate("/login");
  };

  const onExpand = () => {
    expand ? setExpand(false) : setExpand(true);
  };
  return (
    <header
      className={`container-center-space-between header ${expand && "active"}`}
    >
      <div className="header-logo">
        <Link to="/">PLAYGROUND</Link>
      </div>
      <button className="header-expandable btn-clickable" onClick={onExpand}>
        {expand ? <GrClose /> : <FaBars />}
      </button>
      <ul className={`container ${expand && "active"}`}>
        <li>
          <Link className="ml-10" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="ml-10" to="/products">
            Products
          </Link>
        </li>
        <li>
          <Link className="ml-10" to="/cart">
            Cart
          </Link>
        </li>
        {user ? (
          <li>
            <button
              className="btn-clickable ml-10"
              onClick={() => navigate("/user")}
            >
              {mobile ? "Account" : <FaUser />}
            </button>
          </li>
        ) : (
          <li>
            <button className="btn-clickable ml-10" onClick={onLogin}>
              Sign In
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;

/*

import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

            <li>
              <button className="btn-clickable ml-10" onClick={onLogout}>
                Sign Out
              </button>
            </li>
*/
