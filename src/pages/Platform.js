import { useEffect } from "react";
import { Route } from "react-router-dom";

import _WebSocket from "../utils/websocket";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import Settings from "../components/Settings";
import Navbar from "../components/Navbar/index";
import CreatePost from "../components/Create/index";
import Notifications from "../components/Notifications";

const Platform = () => {
  useEffect(() => {
    _WebSocket.ping();
  }, []);

  return (
    <>
      <Navbar />

      <Route path="/" exact>
        <CreatePost />
        <PostList />
      </Route>

      <Route component={Settings} path="/settings" exact />
      <Route component={Profile} path="/users/:accountId" exact />
      <Route component={Notifications} path="/notifications" exact />
    </>
  );
};

export default Platform;
