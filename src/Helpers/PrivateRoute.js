import { useContext } from "react";
import { Redirect } from "react-router-dom";
import _AuthContext from "../auth/auth.context";

const PrivateRoute = ({ component: Component, redirect, swap }) => {
  const AuthContext = useContext(_AuthContext);

  if (AuthContext.authenticated) {
    if (swap) {
      return <Redirect to={redirect} />;
    } else {
      return <Component />;
    }
  } else {
    if (swap) {
      return <Component />;
    } else {
      return <Redirect to={redirect} />;
    }
  }
};

export default PrivateRoute;
