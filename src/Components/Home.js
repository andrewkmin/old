import CreatePost from "./CreatePost";
import Navbar from "./Navbar";
import PostsList from "./PostsList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserProfile from "./UserProfile";

function Home() {
  return (
    <Router>
      <Navbar />
      <CreatePost />
      <PostsList />

      <Switch>
        <Route exact path="/users/*" component={UserProfile} />
      </Switch>
    </Router>
  );
}

export default Home;
