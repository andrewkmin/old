import "../styles/App.scss";

import Home from "../components/Home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
