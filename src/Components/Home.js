import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserProfile from "./UserProfile";
import MainPage from "./MainPage";

function Home() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/users" component={UserProfile} />
      </Switch>
    </Router>
  );
}

export default Home;
