import Welcome from "../pages/Welcome";
import NotFound from "../pages/NotFound";
import Logout from "../components/Logout";
import Platform from "../pages/Platform";
import Private from "../helpers/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Private exact path="/">
          <Platform />
        </Private>

        <Private exact swap path="/welcome">
          <Welcome />
        </Private>

        <Route exact path="/logout" component={Logout} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
