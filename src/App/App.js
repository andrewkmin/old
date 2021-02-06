import { Skeleton } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";

import Routes from "../routes/routes";
import AuthContext from "../auth/auth.context";
import DataContext from "../data/data.context";
import verification from "../auth/verification.js";

const App = () => {
  const checkUserIsValid = useRef(() => {});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  checkUserIsValid.current = async () => {
    const isValid = await verification.verify();
    setUserData(verification.data);
    setAuthenticated(isValid);
    setLoading(false);
    return isValid;
  };

  useEffect(() => checkUserIsValid.current(), []);

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, setAuthenticated, setLoading }}
    >
      <DataContext.Provider value={{ userData, setUserData }}>
        {loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
      </DataContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
