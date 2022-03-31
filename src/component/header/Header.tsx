import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { logout, reset } from "../../features/auth/authSlice";

const Header = () => {
  const [expand, setExpand] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const onLogin = () => {
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
          <Link className="ml-5" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="ml-5" to="/">
            Products
          </Link>
        </li>
        <li>
          <Link className="ml-5" to="/">
            Cart
          </Link>
        </li>
        {user ? (
          <li>
            <button className="btn-primary ml-5" onClick={onLogout}>
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <button className="btn-clickable ml-5" onClick={onLogin}>
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
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from 'react';

*/
