import Welcome from "../components/Welcome";
import Platform from "../components/Platform";
import NotFound from "../components/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
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
