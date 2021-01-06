import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserProfile from "./UserProfile";
import MainPage from "./MainPage";
import NotFound from "./NotFound";

function Home() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/users/:accountId" component={UserProfile} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Home;
