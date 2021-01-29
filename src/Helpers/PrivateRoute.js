import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skeleton } from "@chakra-ui/react";
import { Redirect, Route } from "react-router-dom";

import verification from "../auth/verify.token";

import _AuthContext from "../auth/auth.context";
import _DataContext from "../utils/data.context";

const PrivateRoute = ({ Component, path, redirectPath, exact, swap }) => {
  const AuthContext = useContext(_AuthContext);
  const DataContext = useContext(_DataContext);

  useEffect(() => {
    DataContext.setUserData(verification.getUserData());
  }, [DataContext]);

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
          if (AuthContext.loading) {
            return (
              <Skeleton
                style={{
                  height: "100vh",
                }}
              />
            );
          }
          if (AuthContext.authenticated) {
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
