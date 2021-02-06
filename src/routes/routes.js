import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Welcome from "../pages/Welcome";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import Private from "../helpers/PrivateRoute";
import Settings from "../components/Settings";
import CreatePost from "../components/CreatePost";
import Notifications from "../components/Notifications";

import _WebSocket from "../utils/websocket";
import verification from "../auth/verification";

const Index = () => {
  return (
    <>
      {useEffect(() => {
        _WebSocket.open();
        _WebSocket.ping();
      }, [])}
      <Navbar />

      <Route path="/" exact>
        <CreatePost />
        <PostList />
      </Route>
      <Route path="/users/:accountId" exact>
        <Profile />
      </Route>
      <Route path="/notifications" exact>
        <Notifications />
      </Route>
      <Route path="/settings" exact>
        <Settings />
      </Route>
    </>
  );
};

const Routes = () => {
  return (
    <Router>
      {/* Main page */}

      <Route path="/">
        <Private redirect="/welcome" component={Index} />
      </Route>

      {/* Welcome */}
      <Route path="/welcome">
        <Private swap redirect="/" component={Welcome} />
      </Route>
    </Router>
  );
};

export default Routes;
