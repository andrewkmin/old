import Routes from "../routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../auth/auth.context";
import { useState } from "react";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  
  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
