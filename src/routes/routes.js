import Welcome from "../pages/Welcome";
import NotFound from "../pages/NotFound";
import Logout from "../components/Logout";
import Platform from "../pages/Platform";
// import Private from "../helpers/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route component={Platform} path="/" />
        <Route exact component={Welcome} path="/welcome" />
        <Route exact component={Logout} path="/logout" />
        <Route exact component={NotFound} path="*" />
      </Switch>
    </Router>
  );
};

export default Routes;
