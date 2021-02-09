import "./scss/globals.scss";
import React from "react";
import ReactDOM from "react-dom";
import Theme from "./theme/theme";
import Routes from "./routes/routes";
import { useState, useEffect } from "react";
import AuthContext from "./auth/auth.context";
import DataContext from "./data/data.context";
import verification from "./auth/verification.js";
import { ChakraProvider, ColorModeScript, Skeleton } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const Entry = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserIsValid = async () => {
      const isValid = await verification.verify();
      setUserData(verification.data);
      setAuthenticated(isValid);
      setLoading(false);
      return isValid;
    };
    checkUserIsValid();
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthContext.Provider
        value={{ authenticated, loading, setAuthenticated, setLoading }}
      >
        <DataContext.Provider value={{ userData, setUserData }}>
          {loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
        </DataContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* This provides support for dark mode */}
      <ColorModeScript initialColorMode={Theme.config.initialColorMode} />
      <Entry />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
