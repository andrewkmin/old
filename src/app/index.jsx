import { Skeleton, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import axios from "./api/axios";
import Routes from "./routes/routes";
import DataContext from "./data/data.context";

/**
 * This is the main file of the app.
 * Here we set all the states, fetch initial user data,
 * determine authentication state etc.
 */
const App = () => {
  // A function ref for authenticating the user
  const authenticate = useRef();
  // Creating a state
  const [state, setState] = useState({
    userData: {},
    loading: true,
    authenticated: false,
  });
  // Getting the color mode and the state to set it
  const { colorMode, setColorMode } = useColorMode();

  // Fetching current user data and checking if it's valid once
  authenticate.current = async () => {
    const response = await axios.get("/api/accounts/fetch");

    // Checking the status of the response
    switch (response.status) {
      case 200: {
        /**
         * After we're done fetching user's data
         * we are checking if the theme configuration matches
         * the one in their account and setting the theme accordingly
         */
        if (response?.data?.theme === "light" && colorMode !== "light")
          setColorMode("light");
        else if (response?.data?.theme === "dark" && colorMode !== "dark")
          setColorMode("dark");

        // Setting the state in the end
        setState({
          loading: false,
          authenticated: true,
          userData: response?.data,
        });
        break;
      }
      // If there was some kind of an error
      default: {
        setState({
          userData: {},
          loading: false,
          authenticated: false,
        });
        break;
      }
    }
  };

  /**
   * Checking the auth state in use effect because
   * while the user is on the page their token might just
   * get expired or some error may happen and we'll need to authenticate them again
   */
  useEffect(() => {
    // Only invoking the check function if the user is not authenticated
    if (!state?.authenticated) authenticate.current();
    // Cleanup
    return () => {};
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
      <ReactQueryDevtools initialIsOpen={false} />
      {/* Displaying a skeleton if the state changes to loading */}
      {state?.loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
    </DataContext.Provider>
  );
};

export default App;
