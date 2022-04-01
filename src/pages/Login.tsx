import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, register, reset, setAdmin } from "../features/auth/authSlice";
import { RootState } from "../app/store";
import Spinner from "../component/Spinner";
import { User } from "../interface";
import { ADMIN_ID } from "../features/features";

type FormT = User & {
  confirmPassword: string;
};

const defaultFormData: FormT = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  street: "",
  stnumber: "",
  zipcode: "",
  firstname: "",
  lastname: "",
  phone: "",
};

const Login = () => {
  const [signup, setSignup] = useState(false);
  const [formData, setFormData] = useState<FormT>(defaultFormData);

  const {
    username,
    email,
    password,
    confirmPassword,
    city,
    street,
    stnumber,
    zipcode,
    firstname,
    lastname,
    phone,
  }: FormT = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess || user) {
      console.log("is user id 1216874387060039", user);
      if (Number(user) === ADMIN_ID) {
        console.log("user", user);
        dispatch(setAdmin());
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onCheckbox = () => {
    signup ? setSignup(false) : setSignup(true);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signup && password !== confirmPassword) {
      toast.error("Please make sure your passwords match");
      return;
    }

    const userData = {
      username,
      email,
      password,
      confirmPassword,
      city,
      street,
      stnumber,
      zipcode,
      firstname,
      lastname,
      phone,
    };
    signup ? dispatch(register(userData)) : dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <main className="container-center-column">
        <form className="login container-column" onSubmit={onSubmit}>
          <label className="container-column my-2">
            <p className="my-2">Username : </p>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Username"
              required
            />
          </label>
          <label className="container-column my-2">
            <p className="my-2">Password : </p>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
            />
          </label>

          {signup && (
            <>
              <label className="container-column my-2">
                <p className="my-2">Confirm password : </p>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder="Confirm password"
                  required
                />
              </label>

              <label className="login-input-container container my-2">
                <div>
                  <p className="my-2">Firstname : </p>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    onChange={onChange}
                    placeholder="Firstname"
                    required
                  />
                </div>
                <div>
                  <p className="my-2">Lastname : </p>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    value={lastname}
                    onChange={onChange}
                    placeholder="Lastname"
                    required
                  />
                </div>
              </label>

              <label className="container-column my-2">
                <p className="my-2">Email : </p>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                  required
                />
              </label>

              <label className="container login-input-container  my-2">
                <div>
                  <p className="my-2">Street : </p>
                  <input
                    type="street"
                    className="form-control"
                    id="street"
                    name="street"
                    value={street}
                    onChange={onChange}
                    placeholder="Street"
                    required
                  />
                </div>
                <div>
                  <p className="my-2">St. number</p>
                  <input
                    type="text"
                    className="form-control mini"
                    id="stnumber"
                    name="stnumber"
                    value={stnumber}
                    onChange={onChange}
                    placeholder="Nr."
                    required
                  />
                </div>
              </label>

              <label className="container login-input-container my-2">
                <div>
                  <p className="my-2">City : </p>
                  <input
                    type="city"
                    className="form-control"
                    id="city"
                    name="city"
                    value={city}
                    onChange={onChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <p className="my-2">Zip : </p>
                  <input
                    type="zip"
                    className="form-control"
                    id="zipcode"
                    name="zipcode"
                    value={zipcode}
                    onChange={onChange}
                    placeholder="Zipcode"
                    required
                  />
                </div>
              </label>

              <label className="container-column my-2">
                <p className="my-2">Mobile : </p>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  placeholder="Mobile"
                  required
                />
              </label>
            </>
          )}
          <label className="container-center my-2">
            <input
              className="mr-2"
              type="checkbox"
              id="signup"
              name="signup"
              onChange={onCheckbox}
              checked={signup}
            />
            <p className="my-2">Create new account</p>
          </label>
          <button className="btn-primary">
            {signup ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </main>
    );
  }
};

export default Login;
