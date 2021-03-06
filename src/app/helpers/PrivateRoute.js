import {
  // ReactChildren,
  useContext,
} from "react";
import { Redirect, Route } from "react-router-dom";

import DataContext from "../data/data.context";

// Props for private route
// type PrivateRouteProps = {
//   children: ReactChildren;
//   swap: Boolean;
// };

const PrivateRoute = ({ children, swap, ...rest }) => {
  // Getting the authenticated parameter from the context
  const { authenticated } = useContext(DataContext);

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
