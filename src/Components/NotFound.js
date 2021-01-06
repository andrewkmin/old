import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center p-5">
      <h1
        style={{
          fontSize: "5rem",
          fontFamily: "Ubuntu, sans-serif",
        }}
      >
        <span className="text-warning">4</span>
        <span className="text-warning">0</span>
        <span className="text-warning">4</span>
      </h1>
      <h5>
        <span>🚧</span>
        It looks like you've reached the page no one couldn't find
        <span>🚧</span>
      </h5>
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
