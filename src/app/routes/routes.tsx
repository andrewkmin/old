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

/**
 * Here we write the code for all the routes.
 * We also have a custom private route component which
 * checks the auth state and renders components accordingly
 */
const Routes = () => {
  return (
    /**
     * Making the minimum height 100vh
     * because Chakra UI doesn't do it by default
     */
    <Box minH={"100vh"} maxH={"100%"}>
      <Router>
        {/* This is the `/`(root) route with all of it's subroutes */}
        <Route
          render={() => {
            return (
              /**
               * Wrapping everything inside of a private route.
               * If the users are logged in then they can access the page,
               * else they'll be redirected to the authentication page to verify themselves
               */
              <Private swap={false}>
                {/* Wrapping these routes inside of a custom platform layout to maintain consistency */}
                <PlatformLayout>
                  <Switch>
                    {/* Home page */}
                    <Route exact component={Home} path={"/"} />
                    {/* Settings page */}
                    <Route exact component={Settings} path={"/settings"} />
                    {/* Profile page */}
                    <Route
                      exact
                      component={Profile}
                      path={"/users/:accountId"}
                    />

                    {/* Not found */}
                    <Route exact path={"*"}>
                      {/* Will redirect to `/`(root) */}
                      <Redirect to={"/"} />
                    </Route>
                  </Switch>
                </PlatformLayout>
              </Private>
            );
          }}
        />

        {/* Authentication page */}
        <Route path={"/welcome"}>
          {/* When the user is logged in and tries to access this page, private route will redirect him to Home page */}
          <Private swap={true}>
            <Welcome />
          </Private>
        </Route>

        {/* Logout page */}
        <Route path={"/logout"}>
          <Logout />
        </Route>
      </Router>
    </Box>
  );
};

export default Routes;
