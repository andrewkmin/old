import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "../routes/routes";
import AuthContext from "../auth/auth.context";
import verification from "../auth/verify.token";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const isValid = await verification.verify();
      console.log(isValid);
      setAuthenticated(isValid);
    })();
  });

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
