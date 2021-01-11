import Routes from "../routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import AuthApi from "../utils/AuthApi";
import { useState } from "react";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <AuthApi.Provider value={{ authenticated, setAuthenticated }}>
      <Router>
        <Routes />
      </Router>
    </AuthApi.Provider>
  );
};

export default App;
