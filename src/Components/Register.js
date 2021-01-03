import { Link } from "react-router-dom";
import "../Styles/Register.scss";

const Register = () => {
  return (
    <div className="Register">
      <form
        id="form"
        className="form-register"
        action="/auth/register"
        method="POST"
        encType="multipart/form-data"
      >
        <h1 align="center">
          <img
            className="mb-4"
            src="/favicon.ico"
            alt="Website Logo"
            width="72"
            height="72"
          />
        </h1>
        <h1 className="h3" align="center">
          Welcome to ArmSocial
        </h1>
        <div className="d-flex mt-3">
          <input
            className="form-control w-50"
            aria-label="firstName"
            required
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          &nbsp; &nbsp;
          <input
            className="form-control w-50"
            aria-label="lastName"
            required
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
        </div>

        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className="far fa-envelope"></i>
          </span>
          <input
            className="form-control"
            aria-label="email"
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>

        <div id="emailStatus" className="emailDuplicate"></div>

        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className="fas fa-lock"></i>
          </span>
          <input
            className="form-control"
            aria-label="password"
            required
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            minLength="8"
          />
        </div>

        <div className="input-group mt-3">
          <textarea
            className="form-control"
            aria-label="bio"
            name="bio"
            id="bio"
            rows="2"
            placeholder="Enter your biography ( Optional )"
          ></textarea>
        </div>

        <div className="input-group mt-3">
          <span className="input-group-text">
            <i className="fas fa-image"></i>
          </span>
          <input
            className="form-control"
            accept="image/x-png,image/gif,image/jpeg"
            name="avatar"
            id="avatar"
            type="file"
          />
        </div>

        <div id="imgError" className="imgError"></div>

        <label className="mt-3 mb-3" htmlFor="privateCheck">
          Private Account
          <input
            className="ms-2"
            name="privateCheck"
            type="checkbox"
            value="false"
            id="privateCheck"
          />
        </label>

        <br />

        <button
          id="submitButton"
          className="btn btn-lg btn-primary w-100"
          type="submit"
        >
          Register
        </button>
        <p className="mt-2">
          Have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
