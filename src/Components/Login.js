import "../styles/Login.scss";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="Login">
      <form id="form" className="form-signin" action="login" method="POST">
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
            required
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            minLength="8"
          />
        </div>

        <input
          className="btn btn-lg btn-primary w-100 mt-2"
          type="submit"
          value="Sign In"
        />
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-link">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
