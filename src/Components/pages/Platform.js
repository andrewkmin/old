import Posts from "../Posts";
import Navbar from "../Navbar";
import CreatePost from "../CreatePost";
import UserProfile from "../UserProfile";
import Notifications from "../Notifications";

import { Helmet } from "react-helmet-async";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

const Platform = () => {
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

      <Route exact path="/logout">
        <Redirect to="/" />
      </Route>
    </Router>
  );
};

export default Platform;