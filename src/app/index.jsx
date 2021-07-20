import axios from "./api/axios";
import "./assets/scss/globals.scss";
import Routes from "./routes/routes";
import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import DataContext from "./data/data.context";
import { ReactQueryDevtools } from "react-query/devtools";

/**
 * This is the main file of the app.
 * Here we set all the states, fetch initial user data,
 * determine authentication state etc.
 */
const App = () => {
  // Creating a state
  const [state, setState] = useState({
    loading: true,
    userData: null,
    authenticated: false,
  });

  /**
   * Checking the auth state in use effect because
   * while the user is on the page their token might just
   * get expired or some error may happen and we'll need to authenticate them again
   */
  useEffect(() => {
    // Fetching current user data and checking if it's valid once
    const authenticate = async () => {
      // Authenticating
      const { data, status } = await axios.get("/auth");

      // Checking the status of the response
      return setState({
        loading: false,
        userData: status === 200 ? data : null,
        authenticated: status === 200 ? true : false,
      });
    };

    // Invoking the check function only when the user is not authenticated
    if (!state?.authenticated) authenticate();
  }, [state?.authenticated]);

  return (
    <DataContext.Provider
      value={{
        setState,
        loading: state?.loading,
        userData: state?.userData,
        authenticated: state?.authenticated,
      }}
    >
      {/* Dev tools for React Query */}
      <ReactQueryDevtools initialIsOpen={false} />

      {/* Displaying a skeleton if the state changes to loading */}
      {state?.loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
    </DataContext.Provider>
  );
};

export default App;
