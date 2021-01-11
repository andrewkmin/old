import { Skeleton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect, Route } from "react-router-dom";

import _AuthApi from "../utils/AuthApi";
import isLoggedIn from "../helpers/isLoggedIn";

const PrivateRoute = ({ Component, path, redirectPath, exact, swap }) => {
  const AuthApi = useContext(_AuthApi);
  const [isLoading, setLoadingState] = useState(true);

  useEffect(() => {
    isLoggedIn()
      .then((state) => {
        setLoadingState(false);
        return AuthApi.setAuthenticated(state);
      })
      .catch((err) => {
        setLoadingState(true);
        return console.error(err);
      });
  });

  return (
    <>
      <Helmet>
        <meta name="description" content="Usocial" />
        <title>Usocial</title>
      </Helmet>
      <Route
        exact={exact}
        path={path}
        render={(...props) => {
          if (isLoading) {
            return (
              <Skeleton
                style={{
                  height: "100vh",
                }}
              />
            );
          }
          if (AuthApi.authenticated === true) {
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
    </>
  );
};

export default PrivateRoute;
