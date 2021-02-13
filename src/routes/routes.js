import Welcome from "../pages/Welcome";
import NotFound from "../pages/NotFound";
import Logout from "../components/Logout";
import Platform from "../pages/Platform";
// import Private from "../helpers/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Route exact component={Platform} path="/" />
      <Route exact component={Welcome} path="/welcome" />
      <Route exact component={Logout} path="/logout" />
      <Router exact component={NotFound} path="*" />
    </Router>
  );
};

export default Routes;
