import { Skeleton } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import _authContext from "../auth/auth.context";

const PrivateRoute = ({ Component, path, redirectPath, exact, swap }) => {
  const AuthContext = useContext(_authContext);
  const [isLoading, setLoadingState] = useState(true);

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
          if (AuthContext.authenticated === true) {
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
