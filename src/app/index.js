import { Skeleton } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import axios from "./api/axios";
import Routes from "./routes/routes";
import DataContext from "./data/data.context";

const Entry = () => {
  const authenticate = useRef();
  const [state, setState] = useState({
    loading: true,
    userData: {},
    authenticated: false,
  });

  // Fetching current user data and checking if it's valid
  authenticate.current = async () => {
    const response = await axios.get("/api/accounts/fetch");

    if (response.status === 200)
      setState({
        userData: response.data,
        loading: false,
        authenticated: true,
      });
    else {
      setState({
        userData: {},
        loading: false,
        authenticated: false,
      });
    }
  };

  useEffect(() => {
    // Only invoking the check function if the user is not authenticated
    if (!state?.authenticated) authenticate.current();
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
      {state?.loading ? <Skeleton h={"100vh"} w={"100vw"} /> : <Routes />}
    </DataContext.Provider>
  );
};

export default Entry;
