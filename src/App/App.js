import "../styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import PrivateRoute from "../routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact Component={Home} path="/" redirectPath="/login" />
        <PrivateRoute
          exact
          swap
          Component={Register}
          path="/register"
          redirectPath="/"
        />
        <PrivateRoute
          exact
          swap
          Component={Login}
          path="/login"
          redirectPath="/"
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
