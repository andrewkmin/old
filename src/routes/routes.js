import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from "../pages/Welcome";
import Platform from "../pages/Platform";
import NotFound from "../pages/NotFound";
import Logout from "../components/Logout";
import Private from "../helpers/PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Private path="/">
          <Platform />
        </Private>

        <Private exact swap path="/welcome">
          <Welcome />
        </Private>

        <Route exact component={Logout} path="/logout" />
        <Route exact component={NotFound} path="*" />
      </Switch>
    </Router>
  );
};

export default Routes;
