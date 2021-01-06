import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import fetchUserData from "../api/fetchUserData";

const Navbar = () => {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAccount = async () => {
      const data = await fetchUserData(token, "token");
      setData(data);
      return data;
    };
    fetchAccount();
  }, [token]);

  return (
    <div className="navbar navbar-light d-flex bg-white sticky-top shadow-sm mb-5">
      {/* Logo */}
      <Link to="/" className="navbar-brand ms-3">
        <img
          src="/favicon.ico"
          width="30"
          height="30"
          className="d-inline-block align-top rounded-3 me-2"
          alt="Logo"
        />
        <span className="logo-text">Armenia Social</span>
      </Link>

      {/* Search Box */}
      <input
        style={{
          width: "45%",
        }}
        className="form-control ms-2 me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />

      <div className="btn-group me-3">
        <button
          type="button"
          id="profileContainer"
          className="btn dropdown-toggle border"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={data.pictureUrl}
            className="rounded-circle shadow-sm"
            height="34"
            width="34"
            alt={data.fullName}
          />
          <span className="nav-account-name ms-1">{data.fullName}</span>
        </button>

        <div className="dropdown-menu dropdown-menu-end">
          {/* Account */}
          {/* TODO: Add a redirect to user's page */}
          <Link to={`/users/${data._id}`} className="dropdown-item">
            <i className="fas fa-user"></i>
            My account
          </Link>

          {/* Notifications */}
          <Link to="/notifications" className="dropdown-item">
            <i className="fas fa-bell">
              <span className="badge rounded-pill bg-danger"></span>
            </i>
            Notifications
          </Link>

          {/* Settings */}
          <Link to="/settings" className="dropdown-item">
            <i className="fas fa-cog"></i>
            User Settings
          </Link>

          {/* Logout */}
          <hr className="solid" />
          <Link
            className="dropdown-item text-dark"
            type="button"
            to="#!"
            id="submitLogout"
          >
            <i className="fas fa-sign-out-alt">
              <form
                id="logout"
                method="POST"
                className="bg-transparent"
                action="/logout"
              ></form>
            </i>
            Logout
          </Link>
        </div>
      </div>

      <div
        role="listbox"
        className="container list-group"
        id="foundItems"
      ></div>
    </div>
  );
};

export default Navbar;
