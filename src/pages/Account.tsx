import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, update, logout, reset } from "../features/auth/authSlice";
import { RootState } from "../app/store";
import Spinner from "../component/Spinner";
import { User } from "../interface";

type FormT = User & {
  confirmPassword: string;
};

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message, userInfo } =
    useSelector((state: RootState) => state.auth);

  const defaultFormData: FormT = {
    username: userInfo ? userInfo.username : "",
    email: userInfo ? userInfo.email : "",
    password: userInfo ? userInfo.password : "",
    confirmPassword: "",
    city: userInfo ? userInfo.address.city : "",
    street: userInfo ? userInfo.address.street : "",
    stnumber: userInfo ? userInfo.address.number : "",
    zipcode: userInfo ? userInfo.address.zipcode : "",
    firstname: userInfo ? userInfo.name.firstname : "",
    lastname: userInfo ? userInfo.name.lastname : "",
    phone: userInfo ? userInfo.phone : "",
  };

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
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getUser());
    }
    isError && toast.error(message);
  }, [isError, user, navigate, message, dispatch]);

  //[help] wrong dependency
  useEffect(() => {
    setFormData(defaultFormData);
  }, [userInfo]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
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
    dispatch(update(userData));
    if (isSuccess) {
      toast.success("Account information updated!");
    }
  };

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <main className="login-container container-center">
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
          <div className="container-justify-end ">
            <button
              type="button"
              className="btn-secondary ml-10"
              onClick={onLogout}
            >
              Sign Out
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </main>
    );
  }
};

export default Account;
