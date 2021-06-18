import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "../pages/Home";
import Logout from "../pages/Logout";
import { Box } from "@chakra-ui/react";
import Welcome from "../pages/Welcome";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Private from "../helpers/PrivateRoute";
import PlatformLayout from "../layouts/Platform.layout";

const Routes = () => {
  return (
    <Box minH={"100vh"}>
      <Router>
        <Route
          render={() => {
            return (
              <Private swap={false}>
                <PlatformLayout>
                  <Switch>
                    <Route exact component={Home} path={"/"} />
                    <Route exact component={Settings} path={"/settings"} />
                    <Route
                      exact
                      component={Profile}
                      path={"/users/:accountId"}
                    />
                    {/* <Route
                      exact
                      component={Notifications}
                      path={"/notifications"}
                    /> */}

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
    </Box>
  );
};

export default Routes;
