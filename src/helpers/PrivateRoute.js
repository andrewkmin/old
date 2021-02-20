import { useContext } from "react";
import AuthContext from "../auth/auth.context";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, swap, ...rest }) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        if (authenticated) {
          if (swap) return <Redirect to={"/"} />;
          else return children;
        } else {
          if (swap) return children;
          else return <Redirect to={"/welcome"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
