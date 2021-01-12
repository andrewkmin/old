import Welcome from "../components/pages/Welcome";
import Platform from "../components/pages/Platform";
import NotFound from "../components/NotFound";
import PrivateRoute from "../utils/PrivateRoute";
import { Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute
        exact
        Component={Platform}
        path="/"
        redirectPath="/welcome"
      />
      <PrivateRoute
        exact
        swap
        Component={Welcome}
        path="/welcome"
        redirectPath="/"
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
