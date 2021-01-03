import "../Styles/App.scss";

import Home from "../Components/Home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../Components/Register";
import Login from "../Components/Login";

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
