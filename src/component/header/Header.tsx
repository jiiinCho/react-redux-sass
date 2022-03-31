import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { logout, reset } from "../../features/auth/authSlice";

const Header = () => {
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
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <button className="btn" onClick={onLogin}>
                <FaSignInAlt />
                Login
              </button>
            </li>
            <li>
              <button className="btn">
                <FaUser />
                Register
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
