import { useContext } from "react";
import _AuthContext from "../auth/auth.context";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, swap, ...rest }) => {
  const { authenticated } = useContext(_AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (authenticated) {
          if (swap)
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: location,
                  },
                }}
              />
            );
          else return children;
        } else {
          if (swap) return children;
          else
            return (
              <Redirect
                to={{
                  pathname: "/welcome",
                  state: {
                    from: location,
                  },
                }}
              />
            );
        }
      }}
    />
  );
};

export default PrivateRoute;
