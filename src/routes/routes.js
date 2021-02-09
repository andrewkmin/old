import Welcome from "../pages/Welcome";
import NotFound from "../pages/NotFound";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import PostList from "../components/PostList";
import Private from "../helpers/PrivateRoute";
import Settings from "../components/Settings";
import CreatePost from "../components/CreatePost";
import Notifications from "../components/Notifications";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import verification from "../auth/verification";

const Routes = () => {
  return (
    <Router>
      {/* Index Routes */}

      <Switch>
        <Private path="/" exact>
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
        </Private>

        <Private swap exact path="/welcome">
          <Welcome />
        </Private>

        <Route exact path="/logout" component={Logout} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
