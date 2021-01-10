import { Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect, Route } from "react-router-dom";

import isLoggedIn from "../helpers/isLoggedIn";

const PrivateRoute = ({ Component, path, redirectPath, exact, swap }) => {
  const [isLoading, setLoadingState] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    return Promise.resolve(
      isLoggedIn()
        .then((state) => {
          setLoadingState(false);
          return setAuthenticated(state);
        })
        .catch((err) => {
          console.error(err);
          setLoadingState(true);
        })
    );
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
    </>
  );
};

export default PrivateRoute;
