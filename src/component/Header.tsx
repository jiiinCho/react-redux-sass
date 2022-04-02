import { useState, useEffect } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { getUserCart } from "../features/cart/cartSlice";
import { getUser } from "../features/auth/authSlice";

const Header = () => {
  const [expand, setExpand] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAdmin } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getUser());
    user && dispatch(getUserCart(user));
  }, [user, dispatch]);

  const onLogin = () => {
    setExpand(false);
    navigate("/login");
  };

  const onExpand = () => {
    expand ? setExpand(false) : setExpand(true);
  };

  const goToAccount = () => {
    setExpand(false);
    navigate("/user");
  };
  return (
    <header
      className={`container-center-space-between header ${expand && "active"}`}
    >
      <div className="header-logo">
        <Link onClick={() => setExpand(false)} to="/">
          PLAYGROUND
        </Link>
      </div>
      <button className="header-expandable btn-clickable" onClick={onExpand}>
        {expand ? <GrClose /> : <FaBars />}
      </button>
      <ul className={`container ${expand && "active"}`}>
        <li>
          <Link onClick={() => setExpand(false)} className="ml-10" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setExpand(false)}
            className="ml-10"
            to="/products"
          >
            Products
          </Link>
        </li>
        {!isAdmin && (
          <li>
            <Link onClick={() => setExpand(false)} className="ml-10" to="/cart">
              Cart [{products ? products.length : 0}]
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link
              onClick={() => setExpand(false)}
              className="ml-10"
              to="/admin"
            >
              Admin
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <button className="btn-clickable ml-10" onClick={goToAccount}>
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
