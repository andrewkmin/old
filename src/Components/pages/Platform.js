import Posts from "../Posts";
import Navbar from "../Navbar";
import Profile from "../Profile";
import Settings from "../Settings";
import CreatePost from "../CreatePost";
import Notifications from "../Notifications";

import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const Platform = () => {
  useEffect(() => {
    if (navigator.onLine) {
      const wss = new WebSocket(
        `ws://${process.env.REACT_APP_API_ENDPOINT}/api/network`
      );
      wss.onopen = (_event) => {
        wss.send("");
        setInterval(() => {
          wss.send("");
        }, 60 * 1000);
      };
    }
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
