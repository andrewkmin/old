import Welcome from "../pages/Welcome";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import Private from "../helpers/PrivateRoute";
import CreatePost from "../components/CreatePost";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Index = () => {
  return (
    <>
      <Navbar />

      <Route path="/" exact>
        <CreatePost />
        <PostList />
      </Route>
      <Route path="/users/:accountId" exact>
        <Profile />
      </Route>
    </>
  );
};

const Routes = () => {
  return (
    <Router>
      {/* Main page */}
      <Switch>
        <Route path="/">
          <Private redirect="/welcome" component={Index} />;
        </Route>

        {/* Welcome */}
        <Route path="/welcome">
          <Private swap redirect="/" component={Welcome} />;
        </Route>

        {/* Logout */}
        <Route path="/logout">
          <Redirect to="/welcome" />;
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
