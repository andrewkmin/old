import Posts from "../Posts";
import Navbar from "../Navbar";
import Profile from "../Profile";
import Settings from "../Settings";
import CreatePost from "../CreatePost";
import Notifications from "../Notifications";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import WebSocket from "../../utils/WebSocket";

const Platform = () => {
  useEffect(() => {
    WebSocket.open();
    WebSocket.ping();
    setInterval(() => {
      WebSocket.ping();
    }, 60 * 1000);
  }, []);

  return (
    <Router>
      {/* Meta tags */}
      <Helmet>
        <title>Homepage — Usocial</title>
      </Helmet>

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Route exact path="/">
        <CreatePost />
        <Posts />
      </Route>

      <Route exact path="/users/:accountId" component={Profile} />
      <Route exact path="/notifications" component={Notifications} />
      <Route exact path="/settings" component={Settings} />

      <Route exact path="/logout">
        <Redirect to="/welcome" />
      </Route>
    </Router>
  );
};

export default Platform;
