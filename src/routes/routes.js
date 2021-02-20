import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import Videos from "../components/Videos";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import Private from "../helpers/PrivateRoute";
import Notifications from "../components/Notifications";
import PlatformLayout from "../layouts/Platform.layout";

const Routes = () => {
  return (
    <Router>
      <Route
        render={() => {
          return (
            <Private>
              <PlatformLayout>
                <Switch>
                  <Route exact component={Home} path={"/"} />
                  <Route exact component={Settings} path={"/settings"} />
                  <Route exact component={Profile} path={"/users/:accountId"} />
                  <Route
                    exact
                    component={Notifications}
                    path={"/notifications"}
                  />
                  <Route exact component={Videos} path={"/videos"} />
                  <Route exact path={"*"}>
                    <Redirect to={"/"} from={"*"} />
                  </Route>
                </Switch>
              </PlatformLayout>
            </Private>
          );
        }}
      />
      <Route path={"/welcome"}>
        <Private swap>
          <Welcome />
        </Private>
      </Route>
      <Route path={"/logout"}>
        <Logout />
      </Route>
    </Router>
  );
};

export default Routes;
