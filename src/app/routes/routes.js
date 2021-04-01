import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "../pages/Home";
import Logout from "../pages/Logout";
import Welcome from "../pages/Welcome";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications";

import Private from "../helpers/PrivateRoute";
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

                  <Route exact path={"*"}>
                    <Redirect to={"/"} />
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
