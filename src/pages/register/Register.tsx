import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../../features/auth/authSlice";
import { RootState } from "../../app/store";
import Spinner from "../../component/spinner/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess || user) {
      navigate("/");
    } else {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password is not matching");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <>
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Please enter your name"
              />
            </label>
            <label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Please enter your email"
              />
            </label>

            <label>
              <button type="submit" className="btn btn-block">
                Submit
              </button>
            </label>
          </form>
        </section>
      </>
    );
  }
};

export default Register;
