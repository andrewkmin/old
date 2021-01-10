import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Navbar";
import PostsList from "./Posts";
import CreatePost from "./CreatePost";
import UserProfile from "./UserProfile";
import Notifications from "./Notifications";
import { Helmet } from "react-helmet-async";

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
        <PostsList />
      </Route>

      <Route exact path="/users/:accountId">
        <UserProfile />
      </Route>

      <Route exact path="/notifications">
        <Notifications />
      </Route>
    </Router>
  );
};

export default Platform;
