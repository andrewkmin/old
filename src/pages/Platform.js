import { useEffect } from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/main/Navbar/index";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import Settings from "../components/Settings";
import CreatePost from "../components/main/Create/index";
import Notifications from "../components/Notifications";

import _WebSocket from "../utils/websocket";

const Platform = () => {
  useEffect(() => {
    _WebSocket.open();
    _WebSocket.ping();
  }, []);

  return (
    <>
      <Navbar />

      <Route path="/" exact>
        <CreatePost />
        <PostList />
      </Route>

      <Route path="/settings" exact>
        <Settings />
      </Route>

      <Route path="/notifications" exact>
        <Notifications />
      </Route>

      <Route path="/users/:accountId" exact>
        <Profile />
      </Route>
    </>
  );
};

export default Platform;
