// Components
import Navbar from "../components/Navbar";
import Videos from "../components/Videos";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import Notifications from "../components/Notifications";

// Pages
import Welcome from "../pages/Welcome";
import Homepage from "../pages/Homepage";
import NotFound from "../pages/NotFound";

// Utils
import WebSocket from "../utils/websocket";
import PrivateRoute from "../helpers/PrivateRoute";

// Packages
import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const Routes = () => {
  // TODO: Fix routing
  return (
    <Switch>
      <Route path="/">
        <Navbar />

        {useEffect(() => {
          WebSocket.open();
          WebSocket.ping();
          setInterval(() => WebSocket.ping(), 60 * 1000);
        }, [])}

        <Switch>
          <PrivateRoute
            path="/"
            exact
            redirect="/welcome"
            component={Homepage}
          />
          <PrivateRoute
            exact
            path="/settings"
            redirect="/welcome"
            component={Settings}
          />
          <PrivateRoute
            exact
            path="/notifications"
            redirect="/welcome"
            component={Notifications}
          />
          <PrivateRoute
            exact
            path="/users/:accountId"
            redirect="/welcome"
            component={Profile}
          />
          <PrivateRoute
            exact
            path="/videos"
            redirect="/welcome"
            component={Videos}
          />
        </Switch>
      </Route>

      {/* Welcome Page */}
      <Route exact path="/welcome">
        <Switch>
          <PrivateRoute
            exact
            swap
            path="/welcome"
            redirect="/"
            component={Welcome}
          />
        </Switch>
      </Route>

      {/* Logout */}
      <Route exact path="/logout">
        <Switch>
          <Redirect to="/welcome" />
        </Switch>
      </Route>

      {/* Not found */}
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
