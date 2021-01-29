import { Route, Switch } from "react-router-dom";
import Welcome from "../components/pages/Welcome";
import PrivateRoute from "../helpers/PrivateRoute";
import Platform from "../components/pages/Platform";
import NotFound from "../components/pages/NotFound";

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
