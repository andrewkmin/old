import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "../routes/routes";
import AuthContext from "../auth/auth.context";
import verification from "../auth/verify.token";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isValid = await verification.verify();
      setAuthenticated(isValid);
      setLoading(false);
      return isValid;
    })();
  });

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, setAuthenticated, setLoading }}
    >
      <Router>
        <Routes />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
