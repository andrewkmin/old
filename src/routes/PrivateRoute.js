import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import isLoggedIn from "../helpers/isLoggedIn";

const PrivateRoute = ({ Component, path, redirectPath, exact, swap }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    return Promise.resolve(
      isLoggedIn()
        .then((state) => {
          return setAuthenticated(state);
        })
        .catch((err) => console.error(err))
    );
  });

  return (
    <Route
      exact={exact}
      path={path}
      render={(...props) => {
        if (authenticated === true) {
          return swap ? (
            <Redirect to={redirectPath} />
          ) : (
            <Component {...props} />
          );
        } else {
          return swap ? (
            <Component {...props} />
          ) : (
            <Redirect to={redirectPath} />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
