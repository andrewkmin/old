import Posts from "../Posts";
import Navbar from "../Navbar";
import CreatePost from "../CreatePost";
import UserProfile from "../Profile";
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
      wss.onopen = (event) => {
        wss.send("");
      };
    }
  }, []);

  return (
    <Router>
      <Helmet>
        <meta name="description" content="Usocial homepage" />
        <title>Homepage — Usocial</title>
      </Helmet>
      <Navbar />

      <Route exact path="/">
        <CreatePost />
        <Posts />
      </Route>

      <Route exact path="/users/:accountId">
        <UserProfile />
      </Route>

      <Route exact path="/notifications">
        <Notifications />
      </Route>

      <Route
        exact
        path="/logout"
        render={(...props) => {
          return <Redirect {...props} to="/welcome" />;
        }}
      />
    </Router>
  );
};

export default Platform;
