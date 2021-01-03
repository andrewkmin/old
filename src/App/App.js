import "../Styles/App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../Components/Home";
import Navbar from "../Components/Navbar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
