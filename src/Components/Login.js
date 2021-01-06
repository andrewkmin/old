import "../styles/Login.scss";

import isLoggedIn from "../helpers/isLoggedIn";
import _axios from "../helpers/_axios";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const Credentials = {
    email: "",
    password: "",
  };

  const logIn = async () => {
    const { data } = await _axios.post("/auth/login", Credentials);
    localStorage.setItem("token", data.token);
    const loggedInStatus = await isLoggedIn();

    if (
      loggedInStatus === true &&
      Credentials.email.length !== 0 &&
      Credentials.password.length !== 0
    ) {
      history.push("/");
    }
  };

  return (
    <div className="Login">
      <div className="form-signin">
        <h1 align="center">
          <img
            className="mb-4"
            src="/favicon.ico"
            alt="Website Logo"
            width="72"
            height="72"
          />
        </h1>
        <h1 align="center" className="h3 mb-3 font-weight-normal">
          Please sign in
        </h1>

        <div className="input-group">
          <input
            autoFocus
            className="form-control"
            onKeyUp={(event) => {
              Credentials.email = event.target.value;
            }}
            onChange={(event) => {
              Credentials.email = event.target.value;
            }}
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="input-group">
          <input
            className="form-control"
            onKeyUp={(event) => {
              Credentials.password = event.target.value;
            }}
            onChange={(event) => {
              Credentials.password = event.target.value;
            }}
            required
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            minLength="8"
          />
        </div>

        <button
          className="btn btn-lg btn-primary w-100 mt-2"
          type="button"
          onClick={logIn}
        >
          Sign In
        </button>
        <p className="mt-3">
          Don't have an account? &nbsp;
          <Link to="/register" className="text-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
